<template>
  <div
    v-if="!isFullyCleared"
    ref="loaderEl"
    class="fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none overflow-hidden"
    style="background: #050505;"
  >
    <!-- Subtle grid -->
    <div class="absolute inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px); background-size: 80px 80px;"></div>

    <!-- Red radial glow -->
    <div class="absolute rounded-full pointer-events-none" style="width: 600px; height: 600px; background: radial-gradient(circle, rgba(214,40,40,0.06) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>

      <!-- Avatar + rings -->
      <div ref="logoEl" class="relative flex flex-col items-center mb-10" style="opacity: 0;">
        <!-- Outer ring -->
        <div class="absolute rounded-full border" style="width: 140px; height: 140px; border-color: rgba(214,40,40,0.12); animation: spin-slow 14s linear infinite;"></div>
        <!-- Inner ring -->
        <div class="absolute rounded-full border" style="width: 110px; height: 110px; border-color: rgba(214,40,40,0.22); animation: spin-slow 9s linear infinite reverse;"></div>

        <!-- Avatar container -->
        <div class="relative overflow-hidden rounded-2xl" style="width: 80px; height: 80px; background: rgba(214,40,40,0.06); border: 1px solid rgba(214,40,40,0.25); box-shadow: 0 0 24px rgba(214,40,40,0.15);">
          <video
            src="/2d274a04d416477a9f80ee1249ac80b0.webm"
            autoplay
            loop
            muted
            playsinline
            class="w-full h-full object-cover object-top"
          ></video>
          <!-- Red dot indicator -->
          <span class="absolute rounded-full" style="width: 8px; height: 8px; background: #D62828; bottom: 4px; right: 4px; box-shadow: 0 0 8px rgba(214,40,40,0.9);"></span>
        </div>
      </div>

    <!-- Name + role -->
    <div ref="nameEl" class="text-center mb-12" style="opacity: 0;">
      <div class="font-bold text-white mb-1" style="font-size: 1.25rem; letter-spacing: -0.02em;">Jishnu T V</div>
      <div class="font-medium" style="font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; color: #6B7280;">Full Stack Developer</div>
    </div>

    <!-- Progress bar -->
    <div ref="barEl" class="relative overflow-hidden rounded-full" style="width: 240px; height: 2px; background: rgba(255,255,255,0.06); opacity: 0;">
      <div
        class="h-full rounded-full transition-all duration-75 ease-out"
        :style="{ width: `${progress}%`, background: 'linear-gradient(90deg, #D62828, #ff6b6b)' }"
      ></div>
      <!-- Shimmer -->
      <div class="absolute top-0 bottom-0 w-12 bg-white/20 skew-x-12" style="animation: shimmer-red 1.5s infinite;" :style="{ left: `${progress - 20}%` }"></div>
    </div>

    <!-- Progress % -->
    <div ref="pctEl" class="mt-4 font-semibold tabular-nums" style="font-size: 0.6875rem; letter-spacing: 0.12em; color: rgba(214,40,40,0.7); opacity: 0;">
      {{ String(progress).padStart(3, '0') }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const loaderEl = ref<HTMLElement | null>(null)
const logoEl = ref<HTMLElement | null>(null)
const nameEl = ref<HTMLElement | null>(null)
const barEl = ref<HTMLElement | null>(null)
const pctEl = ref<HTMLElement | null>(null)
const progress = ref(0)
const isFullyCleared = ref(false)

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      // Slide out upward
      gsap.to(loaderEl.value, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power4.inOut',
        delay: 0.3,
        onComplete: () => {
          isFullyCleared.value = true
          store.setLoaded(true)
        }
      })
    }
  })

  // Animate elements in
  tl.to(logoEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.2)
  tl.to(nameEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.5)
  tl.to(barEl.value, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.7)
  tl.to(pctEl.value, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.8)

  // Progress animation
  tl.to(progress, {
    value: 100,
    duration: 2.8,
    ease: 'power2.inOut',
    snap: { value: 1 }
  }, 0.8)
})

onUnmounted(() => {})
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes shimmer-red {
  0%   { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(500%) skewX(-12deg); }
}
</style>

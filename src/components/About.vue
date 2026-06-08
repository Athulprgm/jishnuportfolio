<template>
  <section id="about" class="py-32 px-6 md:px-10 max-w-7xl mx-auto">
    <!-- Section label -->
    <div ref="labelEl" class="section-label mb-16" style="opacity:0;transform:translateY(20px);">
      About
    </div>

    <!-- Editorial layout: big statement + bio -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
      <!-- Left: Pull quote -->
      <div ref="quoteEl" class="lg:col-span-6" style="opacity:0;transform:translateY(30px);">
        <h2
          class="font-black text-white leading-tight"
          style="font-size:clamp(2.2rem,4.5vw,4rem);letter-spacing:-0.03em;"
        >
          Momentum<br />
          <span class="italic font-light" style="color:#9CA3AF;">+</span><br />
          Craft.
        </h2>
        <div class="mt-8 w-16 h-px" style="background:#D62828;"></div>
      </div>

      <!-- Right: Bio -->
      <div ref="bioEl" class="lg:col-span-6 flex flex-col justify-end" style="opacity:0;transform:translateY(30px);">
        <p class="text-base leading-relaxed mb-6" style="color:#9CA3AF;">
          Every project is an intersection of performance, usability and business outcomes. I focus on shipping products that users remember — because they <em class="text-white not-italic font-medium">work</em>, not because they are flashy.
        </p>
        <p class="text-base leading-relaxed" style="color:#6B7280;">
          I'm Jishnu T V, a Full Stack Developer based in India. I bridge the gap between clean engineering and thoughtful design — from scalable backend systems to polished UIs and AI-powered features. Available for freelance & remote opportunities.
        </p>
      </div>
    </div>

    <!-- Profile + Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      
      <!-- Profile card -->
      <div ref="cardEl" class="lg:col-span-5" style="opacity:0;transform:translateY(30px);">
        <div
          class="relative glass-card overflow-hidden"
          style="border-radius:28px;"
          @mousemove="handleTilt"
          @mouseleave="resetTilt"
        >
          <!-- Avatar Image -->
          <div class="w-full relative overflow-hidden" style="height:380px;">
            <img
              src="/avatar.png"
              alt="Jishnu T V"
              class="w-full h-full object-cover object-top"
              style="filter:drop-shadow(0 0 30px rgba(214,40,40,0.12));"
            />
            <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(to top,#0B0B0B 0%,transparent 50%);"></div>
          </div>

          <!-- Info overlay -->
          <div class="p-6" style="border-top:1px solid rgba(255,255,255,0.06);">
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-semibold text-white text-base">Jishnu T V</h3>
              <span class="flex items-center gap-1.5 text-xs" style="color:rgba(34,197,94,0.9);">
                <span class="w-1.5 h-1.5 rounded-full" style="background:#22c55e;"></span>
                Available
              </span>
            </div>
            <div class="text-sm mb-5" style="color:#6B7280;">Full Stack Developer · India</div>
            
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div v-for="item in profileItems" :key="item.label" class="flex flex-col gap-0.5">
                <span style="color:#6B7280;letter-spacing:0.06em;font-size:0.65rem;text-transform:uppercase;">{{ item.label }}</span>
                <span class="text-white font-medium">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats + Capabilities -->
      <div ref="statsEl" class="lg:col-span-7 flex flex-col gap-8" style="opacity:0;transform:translateY(30px);">
        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="p-6 rounded-2xl flex flex-col gap-1 transition-all duration-300 hover:border-red-500/20 cursor-default"
            style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);"
          >
            <span class="font-black text-white" style="font-size:2.5rem;letter-spacing:-0.04em;line-height:1;">{{ stat.value }}</span>
            <span class="text-sm" style="color:#6B7280;">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Philosophy statement -->
        <div class="p-8 rounded-2xl" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);">
          <div class="section-label mb-4">Philosophy</div>
          <blockquote class="text-base leading-relaxed font-medium text-white" style="font-style:italic;">
            "Great software is invisible — it gets out of the way and lets people accomplish what they set out to do."
          </blockquote>
        </div>

        <!-- Core skills tags -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in skills"
            :key="skill"
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:border-red-500/30 hover:text-white cursor-default"
            style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.07);color:#9CA3AF;"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const labelEl = ref<HTMLElement | null>(null)
const quoteEl = ref<HTMLElement | null>(null)
const bioEl = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const statsEl = ref<HTMLElement | null>(null)

const profileItems = [
  { label: 'Role', value: 'Full Stack Dev' },
  { label: 'Location', value: 'India' },
  { label: 'Experience', value: '5+ Years' },
  { label: 'Status', value: 'Open to Work' }
]

const stats = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '5+', label: 'Years Experience' },
  { value: '30+', label: 'Technologies' },
  { value: '100%', label: 'Client Satisfaction' }
]

const skills = ['Vue 3', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'OpenAI', 'Python', 'Nuxt', 'Next.js', 'Firebase', 'GraphQL']

const handleTilt = (e: MouseEvent) => {
  const el = cardEl.value?.querySelector('.glass-card') as HTMLElement || cardEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -10
  const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 10
  gsap.to(el, { rotateX: rotX, rotateY: rotY, transformPerspective: 1000, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
}

const resetTilt = () => {
  const el = cardEl.value?.querySelector('.glass-card') as HTMLElement || cardEl.value
  gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
}

onMounted(() => {
  const elements = [labelEl, quoteEl, bioEl, cardEl, statsEl]
  elements.forEach((el, i) => {
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        gsap.to(el.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1 })
      }
    }, { threshold: 0.1 })
  })
})
</script>

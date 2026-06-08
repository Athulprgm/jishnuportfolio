<template>
  <section class="py-24 px-6 md:px-10 max-w-7xl mx-auto" style="border-top:1px solid rgba(255,255,255,0.05);">
    <!-- Label -->
    <div ref="labelEl" class="section-label mb-6" style="opacity:0;transform:translateY(20px);">
      Capabilities
    </div>
    <div ref="titleEl" class="mb-16" style="opacity:0;transform:translateY(20px);">
      <h2 class="font-black text-white" style="font-size:clamp(2rem,4vw,3.5rem);letter-spacing:-0.03em;">What I Do</h2>
    </div>

    <!-- Large typography list -->
    <div ref="listEl" style="opacity:0;">
      <div
        v-for="(cap, index) in capabilities"
        :key="cap"
        class="group relative flex items-center justify-between py-6 cursor-default transition-all duration-300"
        :style="index < capabilities.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : ''"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = -1"
      >
        <!-- Number -->
        <span
          class="font-semibold text-xs w-8 flex-shrink-0 transition-colors duration-300"
          :style="activeIndex === index ? 'color:#D62828;' : 'color:#374151;'"
          style="letter-spacing:0.1em;"
        >{{ String(index + 1).padStart(2, '0') }}</span>

        <!-- Capability name -->
        <span
          class="flex-1 font-black transition-all duration-300 ml-6"
          :style="activeIndex === index
            ? 'color:#ffffff;font-size:clamp(1.8rem,3.5vw,3rem);letter-spacing:-0.03em;'
            : 'color:#374151;font-size:clamp(1.8rem,3.5vw,3rem);letter-spacing:-0.03em;'"
        >{{ cap }}</span>

        <!-- Arrow icon -->
        <svg
          class="w-6 h-6 flex-shrink-0 transition-all duration-300"
          :style="activeIndex === index ? 'color:#D62828;transform:translateX(4px);opacity:1;' : 'opacity:0;'"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const labelEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const listEl = ref<HTMLElement | null>(null)
const activeIndex = ref(-1)

const capabilities = [
  'Frontend Engineering',
  'Backend Development',
  'Cloud Architecture',
  'AI Integration',
  'UI Engineering',
  'Performance Optimization',
  'DevOps',
  'Product Development'
]

onMounted(() => {
  useIntersectionObserver(labelEl, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      gsap.to(labelEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      gsap.to(titleEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })
      gsap.to(listEl.value, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.25 })
    }
  }, { threshold: 0.1 })
})
</script>

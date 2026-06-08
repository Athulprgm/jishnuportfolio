<template>
  <section
    id="testimonials"
    class="min-h-screen py-24 max-w-7xl mx-auto flex flex-col justify-center border-t border-slate-900 overflow-hidden"
  >
    <!-- Section Title -->
    <div class="mb-16 px-6 md:px-12">
      <div class="text-[10px] font-mono text-[#00F5FF]/80 tracking-[0.3em] mb-2 uppercase select-none">// SYSTEM_ENDORSEMENTS</div>
      <h2 class="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">Client <span class="text-[#8B5CF6]">Reviews</span></h2>
      <div class="h-0.5 w-12 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] mt-4"></div>
    </div>

    <!-- Dual Infinite Scrolling Marquees -->
    <div class="space-y-8 select-none">
      <!-- Row 1: Scrolling Left -->
      <div
        class="marquee-container flex overflow-hidden py-4 border-y border-slate-900 bg-slate-950/20"
        @mouseenter="isHoveredRow1 = true"
        @mouseleave="isHoveredRow1 = false"
      >
        <div
          class="flex gap-6 min-w-full shrink-0"
          :class="isHoveredRow1 ? 'paused-animation' : 'animate-marquee-left'"
        >
          <div
            v-for="(test, idx) in list1"
            :key="`row1-${idx}`"
            @mousemove="handleTilt($event, `row1-${idx}`)"
            @mouseleave="resetTilt(`row1-${idx}`)"
            :ref="el => { if (el) cardRefs[`row1-${idx}`] = el as HTMLElement }"
            class="glass-card w-[320px] md:w-[380px] p-6 shrink-0 flex flex-col justify-between pointer-events-auto border border-white/5 reticule-link"
          >
            <div class="reticule-corners">
              <span class="top-left"></span>
              <span class="top-right"></span>
              <span class="bottom-right"></span>
              <span class="bottom-left"></span>
            </div>
            <p class="text-xs text-slate-300 italic leading-relaxed mb-6 font-sans">
              "{{ test.text }}"
            </p>
            <div class="flex items-center gap-3 font-mono">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center text-xs text-slate-950 font-bold">
                {{ test.author.substring(0, 1) }}
              </div>
              <div>
                <h4 class="text-xs text-white uppercase font-bold">{{ test.author }}</h4>
                <div class="text-[8px] text-slate-500 uppercase tracking-widest">{{ test.role }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Duplicate row for infinite scroll matching -->
        <div
          class="flex gap-6 min-w-full shrink-0"
          :aria-hidden="true"
          :class="isHoveredRow1 ? 'paused-animation' : 'animate-marquee-left'"
        >
          <div
            v-for="(test, idx) in list1"
            :key="`row1-dup-${idx}`"
            @mousemove="handleTilt($event, `row1-dup-${idx}`)"
            @mouseleave="resetTilt(`row1-dup-${idx}`)"
            :ref="el => { if (el) cardRefs[`row1-dup-${idx}`] = el as HTMLElement }"
            class="glass-card w-[320px] md:w-[380px] p-6 shrink-0 flex flex-col justify-between pointer-events-auto border border-white/5 reticule-link"
          >
            <div class="reticule-corners">
              <span class="top-left"></span>
              <span class="top-right"></span>
              <span class="bottom-right"></span>
              <span class="bottom-left"></span>
            </div>
            <p class="text-xs text-slate-300 italic leading-relaxed mb-6 font-sans">
              "{{ test.text }}"
            </p>
            <div class="flex items-center gap-3 font-mono">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center text-xs text-slate-950 font-bold">
                {{ test.author.substring(0, 1) }}
              </div>
              <div>
                <h4 class="text-xs text-white uppercase font-bold">{{ test.author }}</h4>
                <div class="text-[8px] text-slate-500 uppercase tracking-widest">{{ test.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: Scrolling Right -->
      <div
        class="marquee-container flex overflow-hidden py-4 border-b border-slate-900 bg-slate-950/20"
        @mouseenter="isHoveredRow2 = true"
        @mouseleave="isHoveredRow2 = false"
      >
        <div
          class="flex gap-6 min-w-full shrink-0"
          :class="isHoveredRow2 ? 'paused-animation' : 'animate-marquee-right'"
        >
          <div
            v-for="(test, idx) in list2"
            :key="`row2-${idx}`"
            @mousemove="handleTilt($event, `row2-${idx}`)"
            @mouseleave="resetTilt(`row2-${idx}`)"
            :ref="el => { if (el) cardRefs[`row2-${idx}`] = el as HTMLElement }"
            class="glass-card w-[320px] md:w-[380px] p-6 shrink-0 flex flex-col justify-between pointer-events-auto border border-white/5 reticule-link reticule-link-violet"
          >
            <div class="reticule-corners">
              <span class="top-left"></span>
              <span class="top-right"></span>
              <span class="bottom-right"></span>
              <span class="bottom-left"></span>
            </div>
            <p class="text-xs text-slate-300 italic leading-relaxed mb-6 font-sans">
              "{{ test.text }}"
            </p>
            <div class="flex items-center gap-3 font-mono">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#00F5FF] flex items-center justify-center text-xs text-slate-950 font-bold">
                {{ test.author.substring(0, 1) }}
              </div>
              <div>
                <h4 class="text-xs text-white uppercase font-bold">{{ test.author }}</h4>
                <div class="text-[8px] text-slate-500 uppercase tracking-widest">{{ test.role }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Duplicate row for infinite scroll matching -->
        <div
          class="flex gap-6 min-w-full shrink-0"
          :aria-hidden="true"
          :class="isHoveredRow2 ? 'paused-animation' : 'animate-marquee-right'"
        >
          <div
            v-for="(test, idx) in list2"
            :key="`row2-dup-${idx}`"
            @mousemove="handleTilt($event, `row2-dup-${idx}`)"
            @mouseleave="resetTilt(`row2-dup-${idx}`)"
            :ref="el => { if (el) cardRefs[`row2-dup-${idx}`] = el as HTMLElement }"
            class="glass-card w-[320px] md:w-[380px] p-6 shrink-0 flex flex-col justify-between pointer-events-auto border border-white/5 reticule-link reticule-link-violet"
          >
            <div class="reticule-corners">
              <span class="top-left"></span>
              <span class="top-right"></span>
              <span class="bottom-right"></span>
              <span class="bottom-left"></span>
            </div>
            <p class="text-xs text-slate-300 italic leading-relaxed mb-6 font-sans">
              "{{ test.text }}"
            </p>
            <div class="flex items-center gap-3 font-mono">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#00F5FF] flex items-center justify-center text-xs text-slate-950 font-bold">
                {{ test.author.substring(0, 1) }}
              </div>
              <div>
                <h4 class="text-xs text-white uppercase font-bold">{{ test.author }}</h4>
                <div class="text-[8px] text-slate-500 uppercase tracking-widest">{{ test.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

interface Testimonial {
  text: string
  author: string
  role: string
}

const isHoveredRow1 = ref(false)
const isHoveredRow2 = ref(false)
const cardRefs = ref<Record<string, HTMLElement>>({})

const list1: Testimonial[] = [
  {
    text: "Jishnu delivers absolute visual masterclasses. The Three.js scenes and micro animations are optimized to perfection.",
    author: "Elena Rostova",
    role: "Product Lead at Webflow Labs"
  },
  {
    text: "His integration of LLM agent workflows into reactive dashboards solved our team's analytics problems overnight.",
    author: "Marc Andre",
    role: "VP of Engineering at CloudNet"
  },
  {
    text: "Lighthouse speeds remained above 95 despite high-fidelity WebGL graphics. Incredible creative engineer.",
    author: "Shreya Patel",
    role: "Senior Frontend Lead at Stripe"
  }
]

const list2: Testimonial[] = [
  {
    text: "Clean, robust code layouts. The TypeScript interfaces and Vue stores are written with maximum maintainability.",
    author: "David Miller",
    role: "Staff Architect at Vercel"
  },
  {
    text: "Jishnu understands SEO and accessibility down to a science. Our search engine traffic jumped by 20% in months.",
    author: "Yuki Tanaka",
    role: "CEO at CyberSaaS"
  },
  {
    text: "Highly recommended for teams looking to blend high-fidelity visuals with robust system architectures.",
    author: "Alex Benson",
    role: "Technical Recruiter at Apple"
  }
]

// 3D Card Hover Tilt logic
const handleTilt = (e: MouseEvent, refId: string) => {
  const card = cardRefs.value[refId]
  if (!card) return
  
  const bounds = card.getBoundingClientRect()
  const mouseX = e.clientX - bounds.left
  const mouseY = e.clientY - bounds.top
  
  const rotX = ((mouseY / bounds.height) - 0.5) * -12
  const rotY = ((mouseX / bounds.width) - 0.5) * 12
  
  gsap.to(card, {
    rotateX: rotX,
    rotateY: rotY,
    transformPerspective: 800,
    duration: 0.2,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

const resetTilt = (refId: string) => {
  const card = cardRefs.value[refId]
  if (!card) return
  
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: 'power3.out',
    overwrite: 'auto'
  })
}
</script>

<style scoped>
@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee-right {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

.animate-marquee-left {
  animation: marquee-left 25s linear infinite;
}

.animate-marquee-right {
  animation: marquee-right 25s linear infinite;
}

.paused-animation {
  animation-play-state: paused;
}

.glass-card {
  perspective: 1000px;
  transform-style: preserve-3d;
}
</style>

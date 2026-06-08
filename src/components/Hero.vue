<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
  >
    <!-- Animated grid background -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 80px 80px;"></div>
      <!-- Red radial glow center-right -->
      <div class="absolute" style="width:700px;height:700px;right:-100px;top:50%;transform:translateY(-50%);background:radial-gradient(circle,rgba(214,40,40,0.07) 0%,transparent 70%);"></div>
      <!-- Subtle left glow -->
      <div class="absolute" style="width:400px;height:400px;left:-100px;top:30%;background:radial-gradient(circle,rgba(255,255,255,0.015) 0%,transparent 70%);"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <!-- LEFT: Text Content -->
      <div ref="leftColEl" class="flex flex-col">
        <!-- Eyebrow -->
        <div ref="eyebrowEl" class="section-label mb-8" style="opacity:0;transform:translateY(20px);">
          Full Stack Developer
        </div>

        <!-- Headline -->
        <h1
          ref="headlineEl"
          class="font-black text-white mb-6 leading-[1.0]"
          style="font-size: clamp(2.2rem, 6vw, 5.5rem); letter-spacing:-0.03em; opacity:0; transform:translateY(30px);"
        >
          Engineering<br />
          products that<br />
          <span style="color:#D62828;">feel effortless.</span>
        </h1>

        <!-- Description -->
        <p
          ref="descEl"
          class="text-base leading-relaxed mb-10 max-w-md"
          style="color:#9CA3AF;opacity:0;transform:translateY(20px);"
        >
          I design, build and scale modern web experiences using Vue, React, Node.js, AI tooling and cloud infrastructure — where engineering, design and AI intersect.
        </p>

        <!-- CTA Buttons -->
        <div ref="ctaEl" class="flex flex-wrap items-center gap-4" style="opacity:0;transform:translateY(20px);">
          <button
            ref="btnPrimary"
            @mousemove="magneticMove($event, btnPrimary)"
            @mouseleave="magneticLeave(btnPrimary)"
            @click="scrollTo('projects')"
            class="btn-primary pointer-events-auto"
          >
            View Projects
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
          <button
            ref="btnSecondary"
            @mousemove="magneticMove($event, btnSecondary)"
            @mouseleave="magneticLeave(btnSecondary)"
            @click="scrollTo('contact')"
            class="btn-secondary pointer-events-auto"
          >
            Let's Work Together
          </button>
        </div>

        <!-- Social proof strip -->
        <div ref="socialEl" class="flex items-center gap-6 mt-12 pt-8" style="border-top:1px solid rgba(255,255,255,0.06);opacity:0;">
          <div v-for="stat in quickStats" :key="stat.label" class="flex flex-col">
            <span class="font-bold text-white text-lg" style="letter-spacing:-0.02em;">{{ stat.value }}</span>
            <span class="text-xs" style="color:#6B7280;letter-spacing:0.04em;">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Portrait Card -->
      <div class="hidden lg:flex items-center justify-center">
        <div
          ref="portraitCard"
          class="relative"
          style="width:420px;"
          @mousemove="handleCardTilt"
          @mouseleave="resetCardTilt"
        >
          <!-- Floating glow rings -->
          <div class="absolute rounded-full animate-float pointer-events-none" style="width:480px;height:480px;top:50%;left:50%;transform:translate(-50%,-50%);border:1px solid rgba(214,40,40,0.08);"></div>
          <div class="absolute rounded-full pointer-events-none" style="width:380px;height:380px;top:50%;left:50%;transform:translate(-50%,-50%);border:1px solid rgba(214,40,40,0.12);animation:float 8s ease-in-out infinite reverse;"></div>

          <!-- Card -->
          <div
            ref="cardEl"
            class="relative glass-card overflow-hidden"
            style="border-radius:28px;aspect-ratio:3/4;background:#0B0B0B;"
          >
            <!-- Gradient overlay -->
            <div class="absolute inset-0 pointer-events-none z-10" style="background:linear-gradient(to top,rgba(5,5,5,0.9) 0%,rgba(5,5,5,0.1) 60%,transparent 100%);"></div>

            <!-- Avatar Video Animation -->
            <video
              src="/2d274a04d416477a9f80ee1249ac80b0.webm"
              autoplay
              loop
              muted
              playsinline
              class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style="filter:drop-shadow(0 0 40px rgba(214,40,40,0.15));"
            ></video>

            <!-- Bottom info card -->
            <div class="absolute bottom-0 left-0 right-0 z-20 p-6">
              <div class="rounded-2xl p-4" style="background:rgba(5,5,5,0.7);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-semibold text-white text-sm">Jishnu T V</span>
                  <span class="flex items-center gap-1.5 text-xs font-medium" style="color:rgba(34,197,94,0.9);">
                    <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#22c55e;"></span>
                    Available
                  </span>
                </div>
                <div class="text-xs" style="color:#6B7280;letter-spacing:0.04em;">Full Stack Developer · India</div>
              </div>
            </div>

            <!-- Top-right tag -->
            <div class="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full text-xs font-medium" style="background:rgba(214,40,40,0.1);border:1px solid rgba(214,40,40,0.25);color:#D62828;">
              Open to Work
            </div>
          </div>

          <!-- Floating tech badges -->
          <div class="absolute -left-8 top-1/4 px-3 py-2 rounded-xl text-xs font-medium text-white animate-float" style="background:rgba(17,17,17,0.9);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(12px);animation-delay:-2s;">
            <span style="color:#D62828;">●</span> Vue 3 + TypeScript
          </div>
          <div class="absolute -right-8 top-2/3 px-3 py-2 rounded-xl text-xs font-medium text-white" style="background:rgba(17,17,17,0.9);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(12px);animation:float 7s ease-in-out 1s infinite;">
            <span style="color:#D62828;">●</span> Node.js + AWS
          </div>
          <div class="absolute left-1/4 -bottom-6 px-3 py-2 rounded-xl text-xs font-medium text-white" style="background:rgba(17,17,17,0.9);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(12px);animation:float 9s ease-in-out -1s infinite;">
            <span style="color:#D62828;">●</span> AI Integration
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <a
      href="#about"
      @click.prevent="scrollTo('about')"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group pointer-events-auto"
    >
      <span class="text-xs font-medium" style="color:#6B7280;letter-spacing:0.12em;text-transform:uppercase;font-size:0.6rem;">Scroll</span>
      <div class="flex flex-col items-center gap-1">
        <div class="w-px h-8" style="background:linear-gradient(to bottom,transparent,rgba(214,40,40,0.5));"></div>
        <div class="w-1.5 h-1.5 rounded-full" style="background:#D62828;box-shadow:0 0 6px rgba(214,40,40,0.6);"></div>
      </div>
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const leftColEl = ref<HTMLElement | null>(null)
const eyebrowEl = ref<HTMLElement | null>(null)
const headlineEl = ref<HTMLElement | null>(null)
const descEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const socialEl = ref<HTMLElement | null>(null)
const portraitCard = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const btnPrimary = ref<HTMLElement | null>(null)
const btnSecondary = ref<HTMLElement | null>(null)

const quickStats = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '5+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' }
]

const scrollTo = (id: string) => {
  if (window.portfolioLenis) {
    window.portfolioLenis.scrollTo('#' + id)
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

const magneticMove = (e: MouseEvent, el: HTMLElement | null) => {
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.3
  const y = (e.clientY - rect.top - rect.height / 2) * 0.3
  gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
}

const magneticLeave = (el: HTMLElement | null) => {
  if (!el) return
  gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
}

const handleCardTilt = (e: MouseEvent) => {
  if (!cardEl.value) return
  const rect = cardEl.value.getBoundingClientRect()
  const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -14
  const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 14
  gsap.to(cardEl.value, { rotateX: rotX, rotateY: rotY, transformPerspective: 1000, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
}

const resetCardTilt = () => {
  gsap.to(cardEl.value, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
}

onMounted(() => {
  // Staggered fade-up reveal
  const tl = gsap.timeline({ delay: 0.2 })
  tl.to(eyebrowEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
  tl.to(headlineEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
  tl.to(descEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  tl.to(ctaEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  tl.to(socialEl.value, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')

  if (portraitCard.value) {
    tl.fromTo(portraitCard.value,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    )
  }

  // Scroll Trigger Parallax/Fade effects
  if (leftColEl.value) {
    gsap.to(leftColEl.value, {
      y: -80,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  if (portraitCard.value) {
    gsap.to(portraitCard.value, {
      y: 90,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-12px) rotate(1deg); }
  66% { transform: translateY(-6px) rotate(-0.5deg); }
}
.animate-float { animation: float 6s ease-in-out infinite; }
</style>

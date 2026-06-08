<template>
  <section id="experience" class="py-24 px-6 md:px-10 max-w-7xl mx-auto" style="border-top:1px solid rgba(255,255,255,0.05);">
    <!-- Header -->
    <div ref="headerEl" style="opacity:0;transform:translateY(20px);">
      <div class="section-label mb-4">Experience</div>
      <h2 class="font-black text-white mb-16" style="font-size:clamp(2rem,4vw,3.5rem);letter-spacing:-0.03em;">Timeline</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      <!-- Timeline -->
      <div ref="timelineEl" class="lg:col-span-8 relative pl-6" style="opacity:0;">
        <!-- Red line -->
        <div class="timeline-line"></div>

        <div
          v-for="exp in experiences"
          :key="exp.company"
          class="relative mb-10 last:mb-0"
          :style="{ paddingLeft: '1.5rem' }"
        >
          <!-- Timeline dot -->
          <div
            class="absolute flex items-center justify-center rounded-full timeline-dot"
            style="width:12px;height:12px;background:#D62828;left:-6px;top:6px;box-shadow:0 0 12px rgba(214,40,40,0.5);opacity:0;transform:scale(0);"
          ></div>

          <!-- Card -->
          <div
            class="timeline-card rounded-2xl p-7 transition-all duration-300 hover:border-red-500/20"
            style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);opacity:0;"
          >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <div class="text-xs font-medium mb-1.5" style="color:#6B7280;letter-spacing:0.08em;">{{ exp.period }}</div>
                <h3 class="font-bold text-white text-lg" style="letter-spacing:-0.02em;">{{ exp.role }}</h3>
                <div class="text-sm font-medium mt-0.5" style="color:#D62828;">{{ exp.company }}</div>
              </div>
              <span class="self-start text-xs font-medium px-3 py-1 rounded-full flex-shrink-0" style="background:rgba(214,40,40,0.08);border:1px solid rgba(214,40,40,0.2);color:#D62828;">{{ exp.type }}</span>
            </div>

            <p class="text-sm leading-relaxed mb-5" style="color:#9CA3AF;">{{ exp.desc }}</p>

            <ul class="space-y-2">
              <li
                v-for="bullet in exp.bullets"
                :key="bullet"
                class="flex items-start gap-3 text-sm"
                style="color:#6B7280;"
              >
                <span class="w-1 h-1 rounded-full mt-2 flex-shrink-0" style="background:#D62828;"></span>
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Sidebar: Skills + Achievements -->
      <div ref="sidebarEl" class="lg:col-span-4 flex flex-col gap-6" style="opacity:0;transform:translateY(20px);">
        
        <!-- Core skills bars -->
        <div class="p-6 rounded-2xl" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);">
          <div class="section-label mb-5">Proficiency</div>
          <div class="space-y-4">
            <div v-for="skill in proficiencies" :key="skill.label">
              <div class="flex justify-between text-xs font-medium mb-1.5">
                <span class="text-white">{{ skill.label }}</span>
                <span style="color:#6B7280;">{{ skill.pct }}%</span>
              </div>
              <div class="h-1 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.06);">
                <div
                  class="h-full rounded-full"
                  :style="{ width: skill.pct + '%', background: 'linear-gradient(90deg,#D62828,#ff6b6b)' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievement metric -->
        <div class="p-6 rounded-2xl" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);">
          <div class="section-label mb-5">Metrics</div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="m in metrics" :key="m.label" class="flex flex-col">
              <span class="font-black text-white text-2xl" style="letter-spacing:-0.03em;">{{ m.value }}</span>
              <span class="text-xs mt-1" style="color:#6B7280;">{{ m.label }}</span>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="p-6 rounded-2xl" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);">
          <div class="section-label mb-4">Education</div>
          <div class="flex flex-col">
            <div class="font-semibold text-white text-sm">B.Tech Computer Science</div>
            <div class="text-sm mt-0.5" style="color:#6B7280;">Kerala, India · 2024</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersectionObserver } from '@vueuse/core'

gsap.registerPlugin(ScrollTrigger)

const headerEl = ref<HTMLElement | null>(null)
const timelineEl = ref<HTMLElement | null>(null)
const sidebarEl = ref<HTMLElement | null>(null)

const experiences = [
  {
    period: 'Mar 2024 – Present',
    role: 'Full Stack Developer',
    company: 'Freelance & Remote',
    type: 'Freelance',
    desc: 'Designing and delivering end-to-end web applications for clients across healthcare, SaaS and e-commerce. From architecture to deployment, handling the full product lifecycle.',
    bullets: [
      'Shipped 4 production apps including BloodUndo healthcare platform and AI Resume Builder',
      'Reduced API response times by 42% through PostgreSQL query optimization and Redis caching',
      'Achieved 96+ Lighthouse performance scores across all delivered projects'
    ]
  },
  {
    period: 'Jan 2023 – Feb 2024',
    role: 'Frontend Developer',
    company: 'Digital Agency',
    type: 'Full-time',
    desc: 'Built responsive, accessible UIs for agency clients. Led frontend architecture decisions, introduced Vue 3 composition API patterns and improved team code quality standards.',
    bullets: [
      'Migrated legacy jQuery codebase to Vue 3 + TypeScript, reducing bundle size by 38%',
      'Introduced Tailwind CSS design system adopted across 6 client projects',
      'Mentored 3 junior developers in modern frontend practices and code review culture'
    ]
  },
  {
    period: '2022 – 2023',
    role: 'Junior Web Developer',
    company: 'Startup (Kerala)',
    type: 'Part-time',
    desc: 'First professional role building internal tools and customer-facing dashboards. Developed strong fundamentals in REST API design, database modeling and component architecture.',
    bullets: [
      'Built customer dashboard serving 1,200+ active users with Vue 2 and Express',
      'Designed MongoDB schemas for complex reporting queries',
      'Implemented JWT authentication flow and role-based access control system'
    ]
  }
]

const proficiencies = [
  { label: 'Frontend (Vue/React)', pct: 95 },
  { label: 'Backend (Node/Express)', pct: 90 },
  { label: 'Databases (SQL/NoSQL)', pct: 85 },
  { label: 'Cloud & DevOps', pct: 80 },
  { label: 'AI Integration', pct: 85 }
]

const metrics = [
  { value: '50+', label: 'Projects' },
  { value: '120+', label: 'Deployments' },
  { value: '99.9%', label: 'Uptime' },
  { value: '42%', label: 'Perf Gain' }
]

onMounted(() => {
  useIntersectionObserver(headerEl, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      gsap.to(headerEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      gsap.to(sidebarEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.25 })
    }
  }, { threshold: 0.05 })

  if (timelineEl.value) {
    // Reveal timeline container opacity
    gsap.set(timelineEl.value, { opacity: 1 })

    // Self-drawing vertical timeline line
    gsap.fromTo('.timeline-line',
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-line',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    )

    // Springing timeline dots reveal on scroll
    const dots = timelineEl.value.querySelectorAll('.timeline-dot')
    dots.forEach((dot) => {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    // Slide and fade in experience cards on scroll
    const cards = timelineEl.value.querySelectorAll('.timeline-card')
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    })
  }
})
</script>

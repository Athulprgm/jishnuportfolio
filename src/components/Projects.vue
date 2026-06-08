<template>
  <section id="projects" class="py-24 px-6 md:px-10 max-w-7xl mx-auto" style="border-top:1px solid rgba(255,255,255,0.05);">
    <!-- Header -->
    <div class="flex items-end justify-between mb-16 flex-wrap gap-6">
      <div ref="headerEl" style="opacity:0;transform:translateY(20px);">
        <div class="section-label mb-4">Selected Work</div>
        <h2 class="font-black text-white" style="font-size:clamp(2rem,4vw,3.5rem);letter-spacing:-0.03em;">Projects</h2>
      </div>
      <a href="https://github.com/jishnuTV" target="_blank" class="btn-secondary pointer-events-auto text-xs" style="padding:0.625rem 1.5rem;">
        View All on GitHub
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
      </a>
    </div>

    <!-- Bento Grid -->
    <div ref="gridEl" class="bento-grid" style="opacity:0;">
      
      <!-- Large Card 1: BloodUndo -->
      <div
        class="bento-large group relative overflow-hidden cursor-pointer"
        style="border-radius:24px;"
        @mousemove="handleTilt($event, 'bloodundo')"
        @mouseleave="resetTilt('bloodundo')"
        @click="openModal(projects[0])"
        :ref="el => { if (el) cardRefs['bloodundo'] = el as HTMLElement }"
      >
        <div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style="background:linear-gradient(135deg,#0d0a0a 0%,#1a0a0a 50%,#0d0808 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(circle at 30% 40%,rgba(214,40,40,0.1) 0%,transparent 60%);"></div>
        <div class="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60" style="background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%);"></div>
        <!-- Decorative circles -->
        <div class="absolute opacity-10 group-hover:opacity-20 transition-opacity" style="width:300px;height:300px;right:-50px;top:-50px;border:1px solid rgba(214,40,40,0.4);border-radius:50%;"></div>
        <div class="absolute opacity-5 group-hover:opacity-15 transition-opacity" style="width:200px;height:200px;right:0;top:20px;border:1px solid rgba(214,40,40,0.4);border-radius:50%;"></div>
        
        <div class="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div class="flex items-start justify-between">
            <span class="text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(214,40,40,0.15);border:1px solid rgba(214,40,40,0.3);color:#D62828;letter-spacing:0.08em;">Healthcare Platform</span>
            <div class="flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2" style="width:36px;height:36px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </div>
          </div>
          <div>
            <h3 class="font-black text-white mb-2 transition-colors duration-300" style="font-size:clamp(1.5rem,3vw,2.5rem);letter-spacing:-0.03em;">BloodUndo</h3>
            <p class="text-sm leading-relaxed max-w-md" style="color:#9CA3AF;">A comprehensive healthcare platform connecting blood donors with recipients — real-time matching, emergency alerts and hospital integrations.</p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="tag in ['Vue 3','Node.js','MongoDB','Socket.io','AWS']" :key="tag" class="text-xs px-2.5 py-1 rounded-full" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#9CA3AF;">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Medium Card 1: Construction ERP -->
      <div
        class="bento-medium group relative overflow-hidden cursor-pointer"
        style="border-radius:24px;"
        @mousemove="handleTilt($event, 'erp')"
        @mouseleave="resetTilt('erp')"
        @click="openModal(projects[1])"
        :ref="el => { if (el) cardRefs['erp'] = el as HTMLElement }"
      >
        <div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style="background:linear-gradient(135deg,#0a0d0a 0%,#0a1409 50%,#080d08 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(circle at 70% 30%,rgba(214,40,40,0.07) 0%,transparent 60%);"></div>
        <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%);"></div>
        <div class="absolute inset-0 p-7 flex flex-col justify-between z-10">
          <span class="self-start text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(214,40,40,0.12);border:1px solid rgba(214,40,40,0.25);color:#D62828;letter-spacing:0.08em;">SaaS</span>
          <div>
            <h3 class="font-black text-white mb-2 transition-colors duration-300" style="font-size:clamp(1.3rem,2.5vw,1.8rem);letter-spacing:-0.03em;">Construction ERP</h3>
            <p class="text-sm leading-relaxed" style="color:#9CA3AF;">Enterprise resource planning for construction firms — project tracking, resource allocation and financial dashboards.</p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="tag in ['React','Next.js','PostgreSQL','Docker']" :key="tag" class="text-xs px-2.5 py-1 rounded-full" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#9CA3AF;">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Medium Card 2: AI Resume Builder -->
      <div
        class="bento-medium group relative overflow-hidden cursor-pointer"
        style="border-radius:24px;"
        @mousemove="handleTilt($event, 'resume')"
        @mouseleave="resetTilt('resume')"
        @click="openModal(projects[2])"
        :ref="el => { if (el) cardRefs['resume'] = el as HTMLElement }"
      >
        <div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style="background:linear-gradient(135deg,#0a0a0d 0%,#09090f 50%,#080808 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(circle at 30% 70%,rgba(214,40,40,0.08) 0%,transparent 60%);"></div>
        <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%);"></div>
        <div class="absolute inset-0 p-7 flex flex-col justify-between z-10">
          <span class="self-start text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(214,40,40,0.12);border:1px solid rgba(214,40,40,0.25);color:#D62828;letter-spacing:0.08em;">AI Product</span>
          <div>
            <h3 class="font-black text-white mb-2 transition-colors duration-300" style="font-size:clamp(1.3rem,2.5vw,1.8rem);letter-spacing:-0.03em;">AI Resume Builder</h3>
            <p class="text-sm leading-relaxed" style="color:#9CA3AF;">GPT-powered resume generation with ATS optimization, job matching and one-click PDF export.</p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="tag in ['Vue 3','OpenAI','Node.js','Redis']" :key="tag" class="text-xs px-2.5 py-1 rounded-full" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#9CA3AF;">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Large Card 2: E-Commerce Suite -->
      <div
        class="bento-large group relative overflow-hidden cursor-pointer"
        style="border-radius:24px;"
        @mousemove="handleTilt($event, 'ecom')"
        @mouseleave="resetTilt('ecom')"
        @click="openModal(projects[3])"
        :ref="el => { if (el) cardRefs['ecom'] = el as HTMLElement }"
      >
        <div class="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style="background:linear-gradient(135deg,#0a0a0a 0%,#111111 50%,#0d0d0a 100%);"></div>
        <div class="absolute inset-0" style="background:radial-gradient(circle at 70% 60%,rgba(214,40,40,0.09) 0%,transparent 60%);"></div>
        <div class="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60" style="background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%);"></div>
        <div class="absolute opacity-8 group-hover:opacity-15 transition-opacity" style="width:400px;height:400px;left:-80px;bottom:-80px;border:1px solid rgba(214,40,40,0.2);border-radius:50%;"></div>
        
        <div class="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div class="flex items-start justify-between">
            <span class="text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(214,40,40,0.15);border:1px solid rgba(214,40,40,0.3);color:#D62828;letter-spacing:0.08em;">Full Stack</span>
            <div class="flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" style="width:36px;height:36px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </div>
          </div>
          <div>
            <h3 class="font-black text-white mb-2 transition-colors duration-300" style="font-size:clamp(1.5rem,3vw,2.5rem);letter-spacing:-0.03em;">E-Commerce Suite</h3>
            <p class="text-sm leading-relaxed max-w-md" style="color:#9CA3AF;">Full-featured multi-vendor marketplace with real-time inventory, payment processing, analytics dashboard and admin panel.</p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="tag in ['Nuxt','Express','PostgreSQL','Stripe','AWS S3']" :key="tag" class="text-xs px-2.5 py-1 rounded-full" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#9CA3AF;">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <Transition name="modal-fade">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8"
        style="background:rgba(0,0,0,0.85);backdrop-filter:blur(20px);"
        @click.self="closeModal"
      >
        <div
          class="w-full max-w-3xl overflow-hidden flex flex-col"
          style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.08);border-radius:28px;max-height:85vh;"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6" style="border-bottom:1px solid rgba(255,255,255,0.06);">
            <div>
              <div class="section-label mb-1">{{ selectedProject.category }}</div>
              <h3 class="font-black text-white text-xl" style="letter-spacing:-0.02em;">{{ selectedProject.title }}</h3>
            </div>
            <button @click="closeModal" class="flex items-center justify-center rounded-xl pointer-events-auto cursor-pointer text-white transition-colors hover:text-red-400" style="width:40px;height:40px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          
          <!-- Modal Body -->
          <div class="overflow-y-auto p-6 space-y-6">
            <!-- Description -->
            <p class="text-base leading-relaxed" style="color:#9CA3AF;">{{ selectedProject.description }}</p>
            
            <!-- Tech stack -->
            <div>
              <div class="section-label mb-3">Technology Stack</div>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in selectedProject.tech" :key="tag" class="text-xs px-3 py-1.5 rounded-full font-medium" style="background:rgba(214,40,40,0.08);border:1px solid rgba(214,40,40,0.2);color:#D62828;">{{ tag }}</span>
              </div>
            </div>

            <!-- Meta -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 rounded-2xl" style="background:#111111;border:1px solid rgba(255,255,255,0.06);">
                <div class="text-xs mb-1" style="color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">Architecture</div>
                <div class="text-sm font-medium text-white">{{ selectedProject.meta.architecture }}</div>
              </div>
              <div class="p-4 rounded-2xl" style="background:#111111;border:1px solid rgba(255,255,255,0.06);">
                <div class="text-xs mb-1" style="color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">Database</div>
                <div class="text-sm font-medium text-white">{{ selectedProject.meta.database }}</div>
              </div>
              <div class="p-4 rounded-2xl" style="background:#111111;border:1px solid rgba(255,255,255,0.06);">
                <div class="text-xs mb-1" style="color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">Deployment</div>
                <div class="text-sm font-medium text-white">{{ selectedProject.meta.deployment }}</div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4">
              <a :href="selectedProject.liveLink" target="_blank" class="btn-primary pointer-events-auto flex-1 text-center text-sm">
                View Project
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
              <a :href="selectedProject.githubLink" target="_blank" class="btn-secondary pointer-events-auto flex-1 text-center text-sm">
                GitHub
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersectionObserver } from '@vueuse/core'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string; category: string; description: string; tech: string[];
  liveLink: string; githubLink: string; meta: { architecture: string; database: string; deployment: string; }
}

const headerEl = ref<HTMLElement | null>(null)
const gridEl = ref<HTMLElement | null>(null)
const cardRefs = ref<Record<string, HTMLElement>>({})
const selectedProject = ref<Project | null>(null)

const projects: Project[] = [
  { title: 'BloodUndo', category: 'Healthcare Platform', description: 'A comprehensive healthcare platform that connects blood donors with recipients in real-time. Features emergency alerts, hospital integrations, donation tracking and a smart matching algorithm based on blood type, location and availability.', tech: ['Vue 3', 'Node.js', 'MongoDB', 'Socket.io', 'AWS', 'Express', 'JWT'], liveLink: 'https://github.com', githubLink: 'https://github.com', meta: { architecture: 'Microservices + REST API', database: 'MongoDB + Redis', deployment: 'AWS EC2 + S3' } },
  { title: 'Construction ERP', category: 'SaaS', description: 'An enterprise resource planning system built for construction firms. Manages project lifecycles, resource allocation, payroll, procurement and financial reporting with role-based dashboards for different stakeholders.', tech: ['React', 'Next.js', 'PostgreSQL', 'Docker', 'Prisma', 'TypeScript'], liveLink: 'https://github.com', githubLink: 'https://github.com', meta: { architecture: 'Monolithic + REST API', database: 'PostgreSQL + Prisma', deployment: 'Docker on VPS' } },
  { title: 'AI Resume Builder', category: 'AI Product', description: 'GPT-4 powered resume builder that crafts personalized, ATS-optimized resumes based on job descriptions. Includes real-time scoring, keyword gap analysis, cover letter generation and one-click PDF export.', tech: ['Vue 3', 'OpenAI API', 'Node.js', 'Redis', 'TypeScript', 'Pinia'], liveLink: 'https://github.com', githubLink: 'https://github.com', meta: { architecture: 'SPA + REST API', database: 'Redis + PostgreSQL', deployment: 'Vercel + Railway' } },
  { title: 'E-Commerce Suite', category: 'Full Stack', description: 'A full-featured multi-vendor marketplace platform with real-time inventory management, Stripe payment processing, advanced analytics dashboard and a complete admin panel for vendors and super-admins.', tech: ['Nuxt', 'Express', 'PostgreSQL', 'Stripe', 'AWS S3', 'Vue 3'], liveLink: 'https://github.com', githubLink: 'https://github.com', meta: { architecture: 'SSR + REST API', database: 'PostgreSQL + ElasticSearch', deployment: 'AWS ECS Fargate' } }
]

const handleTilt = (e: MouseEvent, id: string) => {
  const card = cardRefs.value[id]
  if (!card) return
  const rect = card.getBoundingClientRect()
  const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -10
  const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 10
  gsap.to(card, { rotateX: rotX, rotateY: rotY, transformPerspective: 900, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
}

const resetTilt = (id: string) => {
  const card = cardRefs.value[id]
  if (!card) return
  gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
}

const openModal = (proj: Project) => { selectedProject.value = proj }
const closeModal = () => { selectedProject.value = null }

onMounted(() => {
  useIntersectionObserver(headerEl, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      gsap.to(headerEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    }
  }, { threshold: 0.1 })

  if (gridEl.value) {
    // Reveal grid container
    gsap.set(gridEl.value, { opacity: 1 })

    // Animate bento cards with a 3D entrance folding-open effect
    gsap.fromTo('.bento-large, .bento-medium',
      {
        opacity: 0,
        y: 60,
        rotateX: 12,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridEl.value,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
})
</script>

<style scoped>
.bento-large {
  transform-style: preserve-3d;
  aspect-ratio: 16/10;
}
.bento-medium {
  transform-style: preserve-3d;
}
@media (max-width: 768px) {
  .bento-large {
    aspect-ratio: auto;
    min-height: 380px;
  }
}
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>

<template>
  <section id="contact" class="py-32 px-6 md:px-10" style="border-top:1px solid rgba(255,255,255,0.05);">
    <div class="max-w-7xl mx-auto">
      
      <!-- Premium CTA Block -->
      <div
        ref="ctaEl"
        class="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
        style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);opacity:0;transform:translateY(30px);"
      >
        <!-- Red glow background -->
        <div class="absolute rounded-full pointer-events-none" style="width:600px;height:600px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(214,40,40,0.07) 0%,transparent 70%);"></div>

        <!-- Label -->
        <div class="section-label justify-center mb-8">Let's Collaborate</div>

        <!-- Big Headline -->
        <h2 class="font-black text-white mb-6 mx-auto" style="font-size:clamp(2.5rem,6vw,5rem);letter-spacing:-0.04em;max-width:800px;line-height:1.0;">
          Let's build something <span style="color:#D62828;font-style:italic;">meaningful.</span>
        </h2>

        <p class="text-base leading-relaxed mb-12 mx-auto" style="color:#9CA3AF;max-width:520px;">
          Available for freelance projects, startup collaborations and remote opportunities. Let's create something that matters.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="mailto:jishnutvwork@gmail.com"
            ref="btnEmail"
            @mousemove="magneticMove($event, btnEmail)"
            @mouseleave="magneticLeave(btnEmail)"
            class="btn-primary pointer-events-auto"
            style="font-size:0.9rem;padding:1rem 2.5rem;"
          >
            Start a Project
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/jishnuTV"
            target="_blank"
            class="btn-secondary pointer-events-auto"
            style="font-size:0.9rem;padding:1rem 2.5rem;"
          >
            LinkedIn Profile
          </a>
        </div>

        <!-- Contact Info Bar -->
        <div class="flex flex-wrap items-center justify-center gap-8 pt-10" style="border-top:1px solid rgba(255,255,255,0.06);">
          <a
            v-for="item in contactItems"
            :key="item.label"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            class="flex items-center gap-2.5 text-sm font-medium transition-colors duration-200 pointer-events-auto cursor-pointer group"
            style="color:#6B7280;"
            @mouseenter="(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }"
            @mouseleave="(e) => { (e.currentTarget as HTMLElement).style.color = '#6B7280' }"
          >
            <span class="w-1.5 h-1.5 rounded-full" style="background:#D62828;"></span>
            {{ item.label }}
          </a>
        </div>
      </div>

      <!-- Quick Contact Form -->
      <div ref="formEl" class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8" style="opacity:0;transform:translateY(20px);">
        <!-- Form -->
        <div class="p-8 rounded-2xl" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);">
          <div class="section-label mb-6">Send a Message</div>
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-medium mb-2 block" style="color:#6B7280;letter-spacing:0.06em;text-transform:uppercase;">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Your name"
                  class="w-full text-sm text-white rounded-xl px-4 py-3 outline-none transition-all duration-200 pointer-events-auto"
                  style="background:#111111;border:1px solid rgba(255,255,255,0.07);"
                  @focus="(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(214,40,40,0.4)' }"
                  @blur="(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }"
                />
              </div>
              <div>
                <label class="text-xs font-medium mb-2 block" style="color:#6B7280;letter-spacing:0.06em;text-transform:uppercase;">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full text-sm text-white rounded-xl px-4 py-3 outline-none transition-all duration-200 pointer-events-auto"
                  style="background:#111111;border:1px solid rgba(255,255,255,0.07);"
                  @focus="(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(214,40,40,0.4)' }"
                  @blur="(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }"
                />
              </div>
            </div>
            <div>
              <label class="text-xs font-medium mb-2 block" style="color:#6B7280;letter-spacing:0.06em;text-transform:uppercase;">Message</label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                placeholder="Tell me about your project..."
                class="w-full text-sm text-white rounded-xl px-4 py-3 outline-none resize-none transition-all duration-200 pointer-events-auto"
                style="background:#111111;border:1px solid rgba(255,255,255,0.07);"
                @focus="(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(214,40,40,0.4)' }"
                @blur="(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }"
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn-primary w-full pointer-events-auto"
              :disabled="isSubmitting"
              :style="isSubmitting ? 'opacity:0.7;cursor:not-allowed;' : ''"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              <svg v-if="!isSubmitting" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
            <div v-if="submissionStatus" class="text-sm font-medium text-center" style="color:rgba(34,197,94,0.9);">
              ✓ {{ submissionStatus }}
            </div>
          </form>
        </div>

        <!-- Info card -->
        <div class="flex flex-col gap-6">
          <div class="p-8 rounded-2xl flex-1" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);">
            <div class="section-label mb-6">Contact Details</div>
            <div class="space-y-5">
              <div v-for="detail in details" :key="detail.label" class="flex flex-col gap-1">
                <span class="text-xs font-medium" style="color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">{{ detail.label }}</span>
                <a :href="detail.href" :target="detail.external ? '_blank' : undefined" class="text-sm font-medium text-white hover:text-red-400 transition-colors pointer-events-auto cursor-pointer">{{ detail.value }}</a>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl" style="background:rgba(214,40,40,0.04);border:1px solid rgba(214,40,40,0.15);">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full animate-pulse" style="background:#22c55e;"></span>
              <span class="text-sm font-semibold text-white">Currently Available</span>
            </div>
            <p class="text-sm" style="color:#9CA3AF;">Open to freelance projects, remote full-time and startup equity roles.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const ctaEl = ref<HTMLElement | null>(null)
const formEl = ref<HTMLElement | null>(null)
const btnEmail = ref<HTMLElement | null>(null)

const form = ref({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submissionStatus = ref('')

const contactItems = [
  { label: 'jishnutvwork@gmail.com', href: 'mailto:jishnutvwork@gmail.com', external: false },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jishnuTV', external: true },
  { label: 'GitHub', href: 'https://github.com/jishnuTV', external: true },
  { label: 'India (IST, UTC+5:30)', href: '#', external: false }
]

const details = [
  { label: 'Email', value: 'jishnutvwork@gmail.com', href: 'mailto:jishnutvwork@gmail.com', external: false },
  { label: 'LinkedIn', value: 'linkedin.com/in/jishnuTV', href: 'https://linkedin.com/in/jishnuTV', external: true },
  { label: 'GitHub', value: 'github.com/jishnuTV', href: 'https://github.com/jishnuTV', external: true },
  { label: 'Location', value: 'India · Remote Worldwide', href: '#', external: false }
]

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

const handleSubmit = () => {
  isSubmitting.value = true
  submissionStatus.value = ''
  setTimeout(() => {
    isSubmitting.value = false
    submissionStatus.value = 'Message sent! I\'ll get back to you within 24 hours.'
    form.value = { name: '', email: '', message: '' }
    setTimeout(() => { submissionStatus.value = '' }, 5000)
  }, 1500)
}

onMounted(() => {
  useIntersectionObserver(ctaEl, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      gsap.to(ctaEl.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      gsap.to(formEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 })
    }
  }, { threshold: 0.1 })
})
</script>

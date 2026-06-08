<template>
  <section id="articles" class="py-24 px-6 md:px-10 max-w-7xl mx-auto" style="border-top:1px solid rgba(255,255,255,0.05);">
    <!-- Header -->
    <div ref="headerEl" style="opacity:0;transform:translateY(20px);">
      <div class="section-label mb-4">Articles</div>
      <h2 class="font-black text-white mb-16" style="font-size:clamp(2rem,4vw,3.5rem);letter-spacing:-0.03em;">Thoughts &amp; Experiments</h2>
    </div>

    <!-- Articles Grid -->
    <div ref="gridEl" class="grid grid-cols-1 md:grid-cols-2 gap-6" style="opacity:0;">
      <article
        v-for="(article, i) in articles"
        :key="article.title"
        class="group relative p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:border-red-500/20"
        style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);"
        :style="i === 0 ? 'grid-column:span 2;' : ''"
        :class="{ 'md:col-span-2': i === 0 }"
      >
        <!-- Top row -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold px-3 py-1 rounded-full" style="background:rgba(214,40,40,0.08);border:1px solid rgba(214,40,40,0.2);color:#D62828;">{{ article.category }}</span>
            <span class="text-xs" style="color:#6B7280;">{{ article.date }}</span>
          </div>
          <div class="flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2" style="width:32px;height:32px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);">
            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </div>
        </div>

        <!-- Title -->
        <h3
          class="font-black text-white mb-3 transition-colors duration-300 group-hover:text-white"
          :style="i === 0 ? 'font-size:clamp(1.4rem,2.5vw,2rem);letter-spacing:-0.03em;' : 'font-size:1.25rem;letter-spacing:-0.02em;'"
        >{{ article.title }}</h3>

        <!-- Excerpt -->
        <p class="text-sm leading-relaxed mb-6" style="color:#6B7280;">{{ article.excerpt }}</p>

        <!-- Bottom: read time + underline on hover -->
        <div class="flex items-center justify-between">
          <span class="text-xs" style="color:#6B7280;">{{ article.readTime }} min read</span>
          <div class="h-px w-0 group-hover:w-16 transition-all duration-500" style="background:#D62828;"></div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const headerEl = ref<HTMLElement | null>(null)
const gridEl = ref<HTMLElement | null>(null)

const articles = [
  {
    title: 'Why Great Products Feel Invisible',
    category: 'Product',
    date: 'May 2026',
    readTime: 6,
    excerpt: 'The best digital products disappear into the background — they\'re so well-crafted that users never think about the interface, only about what they\'re trying to accomplish. Here\'s how to build that kind of invisible excellence.'
  },
  {
    title: 'Building AI-First Applications',
    category: 'Engineering',
    date: 'Apr 2026',
    readTime: 8,
    excerpt: 'Architectural patterns for integrating LLMs into production web applications — from prompt engineering to streaming responses, error handling and cost optimization.'
  },
  {
    title: 'Vue vs React in 2026',
    category: 'Frontend',
    date: 'Mar 2026',
    readTime: 5,
    excerpt: 'An honest comparison after shipping projects with both frameworks in 2026. Performance benchmarks, DX nuances, and when to reach for which.'
  },
  {
    title: 'Design Systems for Startups',
    category: 'Design',
    date: 'Feb 2026',
    readTime: 7,
    excerpt: 'How to build a scalable design system when you\'re moving fast and have limited resources. Tokens, components and the decisions that matter most early on.'
  }
]

onMounted(() => {
  useIntersectionObserver(headerEl, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      gsap.to(headerEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      gsap.to(gridEl.value, { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.15 })
    }
  }, { threshold: 0.1 })
})
</script>

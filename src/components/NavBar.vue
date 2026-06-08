<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500"
    :class="isScrolled
      ? 'py-3 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)]'
      : 'py-5 bg-transparent'"
  >
    <!-- Logo -->
    <a
      href="#hero"
      @click.prevent="scrollToSection('hero')"
      class="flex items-center gap-2.5 group cursor-pointer pointer-events-auto"
    >
      <div
        class="flex items-center justify-center rounded-xl font-bold text-white text-base transition-transform duration-300 group-hover:scale-105"
        style="width:36px;height:36px;background:rgba(214,40,40,0.1);border:1px solid rgba(214,40,40,0.3);font-family:Inter,sans-serif;font-weight:800;"
      >J</div>
      <span class="font-semibold text-white text-sm tracking-tight" style="letter-spacing:-0.01em;">
        Jishnu<span style="color:#D62828;">.</span>TV
      </span>
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden lg:flex items-center gap-8">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="scrollToSection(item.id)"
        class="relative text-xs font-medium cursor-pointer transition-colors duration-200 pointer-events-auto"
        :style="store.activeSection === item.id ? 'color:#ffffff;' : 'color:#6B7280;'"
        style="letter-spacing:0.04em;"
        @mouseenter="(e) => (e.target as HTMLElement).style.color = '#ffffff'"
        @mouseleave="(e) => { (e.target as HTMLElement).style.color = store.activeSection === item.id ? '#ffffff' : '#6B7280' }"
      >
        {{ item.label }}
        <span
          class="absolute -bottom-1 left-0 h-px transition-all duration-300"
          :style="store.activeSection === item.id ? 'width:100%;background:#D62828;' : 'width:0;background:#D62828;'"
        ></span>
      </a>
    </nav>

    <!-- Right Actions -->
    <div class="flex items-center gap-3">
      <!-- Availability pill -->
      <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium pointer-events-none select-none" style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);color:rgba(34,197,94,0.9);">
        <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#22c55e;"></span>
        Available
      </div>

      <!-- CTA button -->
      <div class="hidden md:block">
        <a
          href="#contact"
          @click.prevent="scrollToSection('contact')"
          class="btn-primary pointer-events-auto"
          style="padding:0.5rem 1.25rem;font-size:0.75rem;"
        >
          Let's Talk
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="isMobileOpen = !isMobileOpen"
        class="lg:hidden flex items-center justify-center rounded-xl pointer-events-auto"
        style="width:36px;height:36px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);"
      >
        <svg v-if="!isMobileOpen" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
        <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <div
        v-if="isMobileOpen"
        class="lg:hidden absolute top-full left-0 right-0 border-t flex flex-col gap-1 p-4 pointer-events-auto"
        style="background:rgba(5,5,5,0.97);backdrop-filter:blur(24px);border-color:rgba(255,255,255,0.06);"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          @click.prevent="scrollToSection(item.id); isMobileOpen = false"
          class="px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors"
          :style="store.activeSection === item.id ? 'color:#D62828;background:rgba(214,40,40,0.06);' : 'color:#9CA3AF;'"
        >
          {{ item.label }}
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const isScrolled = ref(false)
const isMobileOpen = ref(false)

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'articles', label: 'Articles' },
  { id: 'contact', label: 'Contact' }
]

const scrollToSection = (id: string) => {
  if (window.portfolioLenis) {
    window.portfolioLenis.scrollTo('#' + id)
    store.setActiveSection(id)
  } else {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      store.setActiveSection(id)
    }
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40

  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        store.setActiveSection(item.id)
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

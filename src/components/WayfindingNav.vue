<template>
  <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3" aria-label="Section navigation">
    <button
      v-for="item in navItems"
      :key="item.id"
      @click="scrollToSection(item.id)"
      :title="item.label"
      class="group relative flex items-center gap-3 cursor-pointer pointer-events-auto"
    >
      <!-- Dot -->
      <span
        class="block rounded-full transition-all duration-300"
        :style="store.activeSection === item.id
          ? 'width:8px;height:8px;background:#D62828;box-shadow:0 0 8px rgba(214,40,40,0.6);'
          : 'width:4px;height:4px;background:rgba(255,255,255,0.2);'"
      ></span>
      <!-- Label tooltip -->
      <span
        class="absolute right-full mr-3 text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200"
        style="background:#111111;border:1px solid rgba(255,255,255,0.08);color:#9CA3AF;"
      >{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'articles', label: 'Articles' },
  { id: 'contact', label: 'Contact' }
]

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  store.setActiveSection(id)
}
</script>

<template>
  <div
    class="relative min-h-screen text-white overflow-hidden"
    style="background:#050505;"
    :class="{ 'pointer-events-none': !store.isLoaded }"
  >
    <!-- Page Loader -->
    <PageLoader />

    <!-- Film Grain Overlay -->
    <Grain />

    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Floating Glass Navbar -->
    <NavBar v-if="store.isLoaded" />

    <!-- Right-side Wayfinding Dots -->
    <WayfindingNav v-if="store.isLoaded" />

    <!-- Main Content -->
    <main v-show="store.isLoaded" class="relative z-10">
      <!-- 1. Hero -->
      <Hero />

      <!-- 2. About + Stats -->
      <About />

      <!-- 3. Expertise / Capabilities (Large Type) -->
      <ExpertiseSection />

      <!-- 4. Tech Marquee -->
      <MarqueeSection />

      <!-- 5. Selected Projects (Bento Grid) -->
      <Projects />

      <!-- 6. Experience Timeline -->
      <Experience />

      <!-- 7. Articles -->
      <ArticlesSection />

      <!-- 8. Contact + CTA -->
      <Contact />

      <!-- Footer -->
      <footer class="py-12 px-6 md:px-10" style="border-top:1px solid rgba(255,255,255,0.05);">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Logo -->
          <div class="flex items-center gap-2.5">
            <div
              class="flex items-center justify-center rounded-xl font-bold text-white text-sm"
              style="width:30px;height:30px;background:rgba(214,40,40,0.1);border:1px solid rgba(214,40,40,0.25);font-family:Inter,sans-serif;font-weight:800;"
            >J</div>
            <span class="font-semibold text-white text-sm" style="letter-spacing:-0.01em;">
              Jishnu<span style="color:#D62828;">.</span>TV
            </span>
          </div>

          <!-- Copyright -->
          <div class="text-xs" style="color:#6B7280;">
            © 2026 Jishnu T V. All rights reserved.
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-6">
            <a
              href="https://github.com/jishnuTV"
              target="_blank"
              class="text-xs font-medium transition-colors duration-200 pointer-events-auto cursor-pointer"
              style="color:#6B7280;"
              @mouseenter="(e) => (e.target as HTMLElement).style.color = '#ffffff'"
              @mouseleave="(e) => (e.target as HTMLElement).style.color = '#6B7280'"
            >GitHub</a>
            <a
              href="https://linkedin.com/in/jishnuTV"
              target="_blank"
              class="text-xs font-medium transition-colors duration-200 pointer-events-auto cursor-pointer"
              style="color:#6B7280;"
              @mouseenter="(e) => (e.target as HTMLElement).style.color = '#ffffff'"
              @mouseleave="(e) => (e.target as HTMLElement).style.color = '#6B7280'"
            >LinkedIn</a>
            <a
              href="mailto:jishnutvwork@gmail.com"
              class="text-xs font-medium transition-colors duration-200 pointer-events-auto cursor-pointer"
              style="color:#6B7280;"
              @mouseenter="(e) => (e.target as HTMLElement).style.color = '#ffffff'"
              @mouseleave="(e) => (e.target as HTMLElement).style.color = '#6B7280'"
            >Email</a>
          </div>
        </div>
      </footer>
    </main>

    <!-- Command Palette overlay (Ctrl+K or /) -->
    <CommandPalette />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { usePortfolioStore } from '@/stores/portfolio'

// Core layout
import PageLoader from '@/components/PageLoader.vue'
import Grain from '@/components/Grain.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import NavBar from '@/components/NavBar.vue'
import WayfindingNav from '@/components/WayfindingNav.vue'

// Sections
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import ExpertiseSection from '@/components/ExpertiseSection.vue'
import MarqueeSection from '@/components/MarqueeSection.vue'
import Projects from '@/components/Projects.vue'
import Experience from '@/components/Experience.vue'
import ArticlesSection from '@/components/ArticlesSection.vue'
import Contact from '@/components/Contact.vue'

// Overlay
import CommandPalette from '@/components/CommandPalette.vue'

const store = usePortfolioStore()
let lenisInstance: Lenis | null = null

onMounted(() => {
  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  function raf(time: number) {
    lenisInstance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
})

onUnmounted(() => {
  lenisInstance?.destroy()
})
</script>

<style>
* { box-sizing: border-box; }
body { overflow-x: hidden; }
::selection { background: #D62828; color: #ffffff; }

/* Transition helpers */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

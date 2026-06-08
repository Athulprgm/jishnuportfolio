<template>
  <section class="py-20 overflow-hidden" style="border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);">
    <!-- Row 1: left to right -->
    <div class="relative flex overflow-hidden mb-4">
      <div class="marquee-track flex items-center gap-8 whitespace-nowrap">
        <template v-for="_ in 2" :key="_">
          <span
            v-for="tech in row1"
            :key="tech"
            class="flex items-center gap-3 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 cursor-default"
            style="color:#6B7280;background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);"
            @mouseenter="(e) => { (e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.borderColor = 'rgba(214,40,40,0.3)'; }"
            @mouseleave="(e) => { (e.target as HTMLElement).style.color = '#6B7280'; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }"
          >
            <span class="w-1.5 h-1.5 rounded-full" style="background:#D62828;flex-shrink:0;"></span>
            {{ tech }}
          </span>
        </template>
      </div>
    </div>

    <!-- Row 2: right to left -->
    <div class="relative flex overflow-hidden">
      <div class="marquee-track-reverse flex items-center gap-8 whitespace-nowrap">
        <template v-for="_ in 2" :key="_">
          <span
            v-for="tech in row2"
            :key="tech"
            class="flex items-center gap-3 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 cursor-default"
            style="color:#6B7280;background:#0B0B0B;border:1px solid rgba(255,255,255,0.06);"
            @mouseenter="(e) => { (e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.borderColor = 'rgba(214,40,40,0.3)'; }"
            @mouseleave="(e) => { (e.target as HTMLElement).style.color = '#6B7280'; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }"
          >
            <span class="w-1.5 h-1.5 rounded-full" style="background:#D62828;flex-shrink:0;"></span>
            {{ tech }}
          </span>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const row1 = ['Vue 3', 'Nuxt', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS']
const row2 = ['OpenAI API', 'Firebase', 'Python', 'FastAPI', 'GSAP', 'Three.js', 'GraphQL', 'Redis', 'Kubernetes', 'Vite', 'Pinia', 'Prisma', 'Supabase']
</script>

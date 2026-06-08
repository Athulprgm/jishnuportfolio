<template>
  <section
    id="skills"
    class="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center border-t border-slate-900"
  >
    <!-- Section Title -->
    <div class="mb-16">
      <div class="text-[10px] font-mono text-[#00F5FF]/80 tracking-[0.3em] mb-2 uppercase select-none">// SKILLS_CAPACITY</div>
      <h2 class="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">Tech <span class="text-[#00F5FF]">Arsenal</span></h2>
      <div class="h-0.5 w-12 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] mt-4"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Left: Interactive 3D Canvas Skill Sphere -->
      <div class="lg:col-span-6 flex flex-col items-center">
        <div class="text-center mb-4 font-mono text-xs text-slate-500 uppercase tracking-widest select-none">
          Drag/Hover to Spin Skills Cloud
        </div>
        <div
          class="relative w-full max-w-[450px] aspect-square rounded-2xl border border-solid border-slate-900/60 bg-slate-950/20 backdrop-blur-sm cursor-grab overflow-hidden flex items-center justify-center reticule-link"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseLeave"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleMouseUp"
        >
          <div class="reticule-corners">
            <span class="top-left"></span>
            <span class="top-right"></span>
            <span class="bottom-right"></span>
            <span class="bottom-left"></span>
          </div>
          <canvas ref="canvasEl" class="w-full h-full"></canvas>
        </div>
      </div>

      <!-- Right: SVG Radar Competency Chart -->
      <div class="lg:col-span-6 flex flex-col justify-center">
        <h3 class="font-display font-bold text-xl sm:text-2xl text-white mb-6 uppercase">
          Neural Core Competencies
        </h3>
        
        <!-- Radar Chart Container -->
        <div ref="radarContainer" class="flex justify-center mb-8">
          <svg viewBox="0 0 400 400" class="w-full max-w-[320px] h-auto font-mono text-[9px] font-semibold text-slate-400">
            <!-- Polygon grid lines -->
            <polygon points="200,40 338,120 338,280 200,360 62,280 62,120" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            <polygon points="200,80 304,140 304,260 200,320 96,260 96,140" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            <polygon points="200,120 270,160 270,240 200,280 130,240 130,160" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <polygon points="200,160 235,180 235,220 200,240 165,220 165,180" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

            <!-- Axis lines -->
            <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            <line x1="62" y1="120" x2="338" y2="280" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            <line x1="338" y1="120" x2="62" y2="280" stroke="rgba(255,255,255,0.05)" stroke-width="1" />

            <!-- Radar Active Value area -->
            <polygon
              :points="animatedPointsString"
              fill="rgba(0, 245, 255, 0.12)"
              stroke="#00F5FF"
              stroke-width="2"
              class="transition-all duration-300"
            />
            
            <!-- Value node rings -->
            <circle v-for="(pt, idx) in animatedCoords" :key="idx" :cx="pt.x" :cy="pt.y" r="4" fill="#050816" stroke="#8B5CF6" stroke-width="1.5" />

            <!-- Axis Labels -->
            <text x="200" y="25" text-anchor="middle" fill="#ffffff">FRONTEND_ARCH (95%)</text>
            <text x="350" y="115" text-anchor="start">AGENTIC_AI (90%)</text>
            <text x="350" y="295" text-anchor="start">WebGL_3D (85%)</text>
            <text x="200" y="380" text-anchor="middle" fill="#ffffff">BACKEND_API (90%)</text>
            <text x="50" y="295" text-anchor="end">DATABASES (80%)</text>
            <text x="50" y="115" text-anchor="end">DEV_OPS (85%)</text>
          </svg>
        </div>

        <!-- Tech Orbit categories -->
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 rounded-xl border border-solid border-slate-900 bg-slate-950/50 relative reticule-link">
            <div class="reticule-corners">
              <span class="top-left"></span>
              <span class="top-right"></span>
              <span class="bottom-right"></span>
              <span class="bottom-left"></span>
            </div>
            <h4 class="text-xs font-mono font-bold text-[#00F5FF] mb-2 uppercase select-none">Client Stack</h4>
            <div class="flex flex-wrap gap-1.5 text-[9px] font-mono">
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">Vue 3</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">TypeScript</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">Tailwind v4</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">Three.js</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">GSAP</span>
            </div>
          </div>

          <div class="p-4 rounded-xl border border-solid border-slate-900 bg-slate-950/50 relative reticule-link reticule-link-violet">
            <div class="reticule-corners">
              <span class="top-left"></span>
              <span class="top-right"></span>
              <span class="bottom-right"></span>
              <span class="bottom-left"></span>
            </div>
            <h4 class="text-xs font-mono font-bold text-[#8B5CF6] mb-2 uppercase select-none">Agent Stacks</h4>
            <div class="flex flex-wrap gap-1.5 text-[9px] font-mono">
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">LangChain</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">Python</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">PyTorch</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">FastAPI</span>
              <span class="px-2 py-1 bg-slate-900 text-slate-300 rounded border border-slate-800">PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const radarContainer = ref<HTMLElement | null>(null)

// 3D sphere variables
const skills = [
  'Vue 3', 'Vite', 'TypeScript', 'WebGL', 'Three.js', 
  'GSAP', 'Tailwind', 'Pinia', 'FastAPI', 'Python', 
  'PyTorch', 'LangChain', 'Node.js', 'PostgreSQL', 
  'Docker', 'Git', 'CSS Grid', 'REST APIs', 'GraphQL'
]

interface SphereTag {
  text: string
  x: number
  y: number
  z: number
}

let tags: SphereTag[] = []
let ctx: CanvasRenderingContext2D | null = null
let angleX = 0.003
let angleY = 0.003
const focusLength = 300
let radius = 160
let isDragging = false
let startMouseX = 0
let startMouseY = 0
let animFrameId: number

const initSphere = () => {
  if (!canvasEl.value) return
  ctx = canvasEl.value.getContext('2d')
  if (!ctx) return

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Fibonacci spiral distribution of points on a sphere
  const count = skills.length
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    
    tags.push({
      text: skills[i],
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi)
    })
  }

  tickSphere()
}

const resizeCanvas = () => {
  if (canvasEl.value) {
    const parent = canvasEl.value.parentElement
    if (parent) {
      canvasEl.value.width = parent.clientWidth
      canvasEl.value.height = parent.clientHeight
      // Scale radius relative to screen size
      radius = Math.min(parent.clientWidth, parent.clientHeight) * 0.36
    }
  }
}

// 3D Rotation math
const rotateX = (tag: SphereTag, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const y = tag.y * cos - tag.z * sin
  const z = tag.z * cos + tag.y * sin
  tag.y = y
  tag.z = z
}

const rotateY = (tag: SphereTag, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const x = tag.x * cos - tag.z * sin
  const z = tag.z * cos + tag.x * sin
  tag.x = x
  tag.z = z
}

const tickSphere = () => {
  if (!ctx || !canvasEl.value) return
  
  const width = canvasEl.value.width
  const height = canvasEl.value.height
  const cx = width / 2
  const cy = height / 2

  ctx.clearRect(0, 0, width, height)

  // Decelerate drag rotation smoothly back to slow spin
  if (!isDragging) {
    angleX *= 0.95
    angleY *= 0.95
    angleX += (0.0015 - angleX) * 0.08
    angleY += (0.0015 - angleY) * 0.08
  }

  // Render tags and connections
  // 1. Update rotations first
  tags.forEach(tag => {
    rotateX(tag, angleX)
    rotateY(tag, angleY)
  })

  // 2. Draw connection lines between nearby tags
  for (let i = 0; i < tags.length; i++) {
    for (let j = i + 1; j < tags.length; j++) {
      const t1 = tags[i]
      const t2 = tags[j]

      const dx = t1.x - t2.x
      const dy = t1.y - t2.y
      const dz = t1.z - t2.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      // Only draw lines between close tags to form constellation
      if (dist < 125) {
        const scale1 = focusLength / (focusLength + t1.z)
        const projX1 = t1.x * scale1 + cx
        const projY1 = t1.y * scale1 + cy

        const scale2 = focusLength / (focusLength + t2.z)
        const projX2 = t2.x * scale2 + cx
        const projY2 = t2.y * scale2 + cy

        // Calculate opacity based on Z depth
        const zAvg = (t1.z + t2.z) / 2
        const lineAlpha = Math.max(0, Math.min((radius - zAvg) / (radius * 2) * 0.18, 0.22))

        ctx.save()
        ctx.globalAlpha = lineAlpha
        // Front connections are cyan, back connections are violet
        ctx.strokeStyle = zAvg < 0 ? '#00F5FF' : '#8B5CF6'
        ctx.lineWidth = 0.55
        ctx.beginPath()
        ctx.moveTo(projX1, projY1)
        ctx.lineTo(projX2, projY2)
        ctx.stroke()
        ctx.restore()
      }
    }
  }

  // 3. Render the text tags on top
  tags.forEach(tag => {
    // 3D perspective projection
    const scale = focusLength / (focusLength + tag.z)
    const projX = tag.x * scale + cx
    const projY = tag.y * scale + cy
    
    // Fade and size according to depth (Z coord)
    const alpha = (radius - tag.z) / (radius * 2) + 0.3
    const fontSize = Math.max(Math.floor(10 + scale * 7), 8)
    
    ctx!.save()
    ctx!.globalAlpha = Math.min(alpha, 1.0)
    ctx!.font = `bold ${fontSize}px "Orbitron", sans-serif`
    
    // Front elements colored Cyan, Back elements colored Purple/Slate
    ctx!.fillStyle = tag.z < 0 ? '#00F5FF' : '#8B5CF6'
    
    // Text shadows
    ctx!.shadowBlur = tag.z < 0 ? 10 : 0
    ctx!.shadowColor = '#00F5FF'
    
    ctx!.textAlign = 'center'
    ctx!.textBaseline = 'middle'
    ctx!.fillText(tag.text, projX, projY)
    ctx!.restore()
  })

  animFrameId = requestAnimationFrame(tickSphere)
}

// Interactive Mouse/Touch Spin logic
const handleMouseDown = (e: MouseEvent) => {
  isDragging = true
  startMouseX = e.clientX
  startMouseY = e.clientY
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  const dx = e.clientX - startMouseX
  const dy = e.clientY - startMouseY
  
  angleY = dx * 0.0003
  angleX = -dy * 0.0003
  
  startMouseX = e.clientX
  startMouseY = e.clientY
}

const handleMouseUp = () => {
  isDragging = false
}

const handleMouseLeave = () => {
  isDragging = false
}

const handleTouchStart = (e: TouchEvent) => {
  isDragging = true
  startMouseX = e.touches[0].clientX
  startMouseY = e.touches[0].clientY
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging) return
  const dx = e.touches[0].clientX - startMouseX
  const dy = e.touches[0].clientY - startMouseY
  
  angleY = dx * 0.0003
  angleX = -dy * 0.0003
  
  startMouseX = e.touches[0].clientX
  startMouseY = e.touches[0].clientY
}

// Radar Chart Competencies
const radarValues = ref([0, 0, 0, 0, 0, 0]) // Start from 0 for animation entry
const radarMaxes = [95, 90, 85, 90, 80, 85]   // Competency targets

// Convert radial index to 2D graphic points on 400x400 map
const getPointCoords = (index: number, val: number) => {
  const angle = (Math.PI * 2 / 6) * index - Math.PI / 2
  const center = 200
  const maxRadius = 160
  
  const currentRadius = (val / 100) * maxRadius
  const x = center + Math.cos(angle) * currentRadius
  const y = center + Math.sin(angle) * currentRadius
  return { x, y }
}

const animatedCoords = computed(() => {
  return radarValues.value.map((v, i) => getPointCoords(i, v))
})

const animatedPointsString = computed(() => {
  return animatedCoords.value.map(pt => `${pt.x},${pt.y}`).join(' ')
})

onMounted(() => {
  initSphere()

  // Animate Radar Chart values when section enters viewport
  useIntersectionObserver(
    radarContainer,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        radarMaxes.forEach((max, idx) => {
          gsap.to(radarValues.value, {
            [idx]: max,
            duration: 1.6,
            ease: 'power3.out',
            delay: idx * 0.05
          })
        })
      }
    },
    { threshold: 0.1 }
  )
})

onUnmounted(() => {
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped></style>

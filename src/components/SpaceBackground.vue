<template>
  <canvas id="bg-canvas" ref="canvasEl"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasEl = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let particleSystem: THREE.Points
let animationFrameId: number

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

// Create a circular gradient texture programmatically (avoiding external PNG image downloads)
const createCircleTexture = (): THREE.Texture => {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // Inner glow circular gradient
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.1, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(0, 245, 255, 0.7)')
    gradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.25)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const initThree = () => {
  if (!canvasEl.value) return

  // Scene
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2('#050816', 0.001)

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 250

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasEl.value,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Particles Geometry Setup
  const count = 6000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const colorCyan = new THREE.Color('#00F5FF')
  const colorViolet = new THREE.Color('#8B5CF6')

  for (let i = 0; i < count; i++) {
    // Generate spiral galaxy coordinates
    const r = Math.random() * 280
    const theta = Math.random() * Math.PI * 2
    const spiral = (r / 20) * 1.5 // spiral arm offset
    
    // Galaxy branches configuration (2 arms)
    const arm = i % 2 === 0 ? 0 : Math.PI
    const x = Math.cos(theta + spiral + arm) * r + (Math.random() - 0.5) * 12
    const y = (Math.random() - 0.5) * 15 // thickness
    const z = Math.sin(theta + spiral + arm) * r + (Math.random() - 0.5) * 12

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Color distribution: cyan inside, violet transitions outwards, with dark space outer bounds
    const mixFactor = Math.min(r / 250, 1.0)
    const colorFinal = new THREE.Color()
    colorFinal.lerpColors(colorCyan, colorViolet, mixFactor)
    
    // Randomize brightness
    const factor = Math.random() * 0.4 + 0.6
    
    colors[i * 3] = colorFinal.r * factor
    colors[i * 3 + 1] = colorFinal.g * factor
    colors[i * 3 + 2] = colorFinal.b * factor
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // Materials
  const material = new THREE.PointsMaterial({
    size: 2.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: createCircleTexture()
  })

  // Points Cloud
  particleSystem = new THREE.Points(geometry, material)
  scene.add(particleSystem)

  // Listeners
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('mousemove', onMouseMove)
  
  // Start Anim Loop
  tick()
}

const onMouseMove = (e: MouseEvent) => {
  mouseX = (e.clientX - window.innerWidth / 2) * 0.1
  mouseY = (e.clientY - window.innerHeight / 2) * 0.1
}

const onWindowResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const tick = () => {
  // Slowly rotate the galaxy
  if (particleSystem) {
    particleSystem.rotation.y += 0.0008
    particleSystem.rotation.z += 0.0002
  }

  // Smooth mouse movement follow (inertia damping)
  targetX += (mouseX - targetX) * 0.05
  targetY += (mouseY - targetY) * 0.05

  if (camera) {
    camera.position.x = targetX
    camera.position.y = -targetY
    camera.lookAt(scene.position)
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  animationFrameId = requestAnimationFrame(tick)
}

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('mousemove', onMouseMove)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
#bg-canvas {
  transition: filter 0.5s ease;
}
</style>

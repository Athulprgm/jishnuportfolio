<template>
  <!-- Custom Cursor Dot -->
  <div ref="cursorDot" class="custom-cursor" :class="{ 'scale-150': isHovering, 'opacity-0': !isVisible }"></div>
  <!-- Custom Cursor Ring -->
  <div ref="cursorRing" class="custom-cursor-ring" :class="{ 'scale-150 border-red-600/60': isHovering }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const isVisible = ref(false)

let ringX = 0
let ringY = 0
let dotX = 0
let dotY = 0
let rafId: number

const onMouseMove = (e: MouseEvent) => {
  dotX = e.clientX
  dotY = e.clientY
  isVisible.value = true

  gsap.to(cursorDot.value, {
    x: dotX,
    y: dotY,
    duration: 0.08,
    ease: 'linear',
    overwrite: 'auto'
  })
}

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const animateRing = () => {
  ringX = lerp(ringX, dotX, 0.12)
  ringY = lerp(ringY, dotY, 0.12)
  
  if (cursorRing.value) {
    cursorRing.value.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
  }
  rafId = requestAnimationFrame(animateRing)
}

const onMouseEnterInteractive = () => { isHovering.value = true }
const onMouseLeaveInteractive = () => { isHovering.value = false }

const attachInteractiveListeners = () => {
  const interactiveEls = document.querySelectorAll('a, button, [data-cursor="hover"]')
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', onMouseEnterInteractive)
    el.addEventListener('mouseleave', onMouseLeaveInteractive)
  })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(animateRing)
  
  setTimeout(attachInteractiveListeners, 2000)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background: #D62828;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(214, 40, 40, 0.7), 0 0 20px rgba(214, 40, 40, 0.3);
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.custom-cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(214, 40, 40, 0.35);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
</style>

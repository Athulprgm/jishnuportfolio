<template>
  <button
    @click="handleToggle"
    class="relative flex items-center justify-center p-2 rounded-full border border-solid border-[rgba(0,245,255,0.3)] bg-[rgba(0,245,255,0.02)] hover:bg-[rgba(0,245,255,0.1)] hover:border-[#00F5FF] text-[#00F5FF] transition-all duration-300 pointer-events-auto"
    :class="{ 'border-[#8B5CF6] text-[#8B5CF6] bg-[rgba(139,92,246,0.05)] hover:border-[#8B5CF6]': !store.isSoundEnabled }"
    title="Toggle Ambient Audio"
  >
    <div class="flex items-center gap-1.5 px-2 py-0.5">
      <!-- Visual Equalizer Bars when enabled -->
      <div v-if="store.isSoundEnabled" class="flex gap-0.5 h-3.5 items-end">
        <span class="bar w-0.5 bg-[#00F5FF] animate-[eq-bar-1_1s_infinite_alternate]"></span>
        <span class="bar w-0.5 bg-[#00F5FF] animate-[eq-bar-2_0.8s_infinite_alternate_delay-100]"></span>
        <span class="bar w-0.5 bg-[#00F5FF] animate-[eq-bar-3_1.2s_infinite_alternate_delay-200]"></span>
      </div>
      <span class="text-[10px] font-display uppercase tracking-widest">
        {{ store.isSoundEnabled ? 'Audio On' : 'Audio Off' }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio'
import { onUnmounted } from 'vue'

const store = usePortfolioStore()

// Web Audio API Elements
let audioCtx: AudioContext | null = null
let droneGain: GainNode | null = null
let osc1: OscillatorNode | null = null
let osc2: OscillatorNode | null = null
let filter: BiquadFilterNode | null = null
let lfo: OscillatorNode | null = null
let lfoGain: GainNode | null = null

const initAudio = () => {
  if (audioCtx) return

  // Create Context
  // @ts-ignore
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  audioCtx = new AudioContextClass()

  // 1. Synth Space Drone
  filter = audioCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 220
  filter.Q.value = 8

  droneGain = audioCtx.createGain()
  droneGain.gain.setValueAtTime(0, audioCtx.currentTime)

  // Modulated low drone frequencies
  osc1 = audioCtx.createOscillator()
  osc1.type = 'sine'
  osc1.frequency.value = 55 // A1 note
  
  osc2 = audioCtx.createOscillator()
  osc2.type = 'sawtooth'
  osc2.frequency.value = 55.4 // Slightly detuned

  // Lowpass filter modulation via LFO
  lfo = audioCtx.createOscillator()
  lfo.frequency.value = 0.15 // Very slow sweep (6.6 seconds per cycle)
  
  lfoGain = audioCtx.createGain()
  lfoGain.gain.value = 80 // sweep range (+/- 80Hz)

  // Connections
  lfo.connect(lfoGain)
  if (filter) {
    lfoGain.connect(filter.frequency)
    
    osc1.connect(filter)
    osc2.connect(filter)
    
    filter.connect(droneGain)
    droneGain.connect(audioCtx.destination)
  }

  // Start Oscillators
  osc1.start()
  osc2.start()
  lfo.start()
}

const playBleep = (freq = 800, duration = 0.08, type: OscillatorType = 'sine') => {
  if (!store.isSoundEnabled || !audioCtx) return
  
  try {
    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)

    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)

    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (err) {
    console.warn('Audio Bleep Error:', err)
  }
}

// Public feedback sound triggers to hook globally or locally
const playHoverSound = () => {
  playBleep(1200, 0.05, 'sine')
}

const playClickSound = () => {
  if (!store.isSoundEnabled || !audioCtx) return
  playBleep(600, 0.04, 'triangle')
  setTimeout(() => playBleep(900, 0.04, 'triangle'), 30)
}

const handleToggle = () => {
  try {
    if (!audioCtx) {
      initAudio()
    }
    
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    
    store.toggleSound()

    if (store.isSoundEnabled && droneGain && audioCtx) {
      droneGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1.5)
      playClickSound()
    } else if (droneGain && audioCtx) {
      droneGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8)
    }
  } catch (e) {
    console.error('Audio Context creation is blocked or failed:', e)
  }
}

// Clean up oscillators on unmount
onUnmounted(() => {
  if (osc1) osc1.stop()
  if (osc2) osc2.stop()
  if (lfo) lfo.stop()
  if (audioCtx) audioCtx.close()
})

// Expose click/hover bleep methods globally so we can invoke them
// @ts-ignore
window.playClickSound = playClickSound
// @ts-ignore
window.playHoverSound = playHoverSound
</script>

<style scoped>
@keyframes eq-bar-1 {
  0% { height: 4px; }
  100% { height: 14px; }
}
@keyframes eq-bar-2 {
  0% { height: 6px; }
  100% { height: 16px; }
}
@keyframes eq-bar-3 {
  0% { height: 2px; }
  100% { height: 12px; }
}

.bar {
  display: block;
}
</style>

<template>
  <div class="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 pointer-events-auto">
    <!-- Feedback tooltip -->
    <Transition name="fade">
      <div
        v-if="feedbackText"
        class="bg-slate-950/90 border border-[#00F5FF]/40 text-[#00F5FF] text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(0,245,255,0.2)]"
      >
        SPEECH: "{{ feedbackText }}"
      </div>
    </Transition>

    <!-- Glowing Voice Floating Action Button -->
    <button
      v-if="isSpeechSupported"
      @click="toggleListening"
      class="relative group w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 shadow-lg"
      :class="store.isVoiceActive 
        ? 'border-[#00F5FF] bg-slate-950 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.4)]' 
        : 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white hover:border-slate-700'"
      title="Toggle Voice Navigation"
    >
      <!-- Pulse Rings when active -->
      <span v-if="store.isVoiceActive" class="absolute inset-0 rounded-full border border-[#00F5FF] animate-ping opacity-60"></span>
      
      <!-- Mic Icon -->
      <svg
        v-if="!store.isVoiceActive"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 group-hover:scale-110 transition-transform"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>

      <!-- Animated Soundwave Icon when active -->
      <div v-else class="flex gap-1 items-center justify-center h-4">
        <span class="w-[3px] h-3 bg-[#00F5FF] rounded-full animate-[voice-wave_0.6s_infinite_alternate]"></span>
        <span class="w-[3px] h-4 bg-[#00F5FF] rounded-full animate-[voice-wave_0.8s_infinite_alternate_delay-100]"></span>
        <span class="w-[3px] h-3 bg-[#00F5FF] rounded-full animate-[voice-wave_0.6s_infinite_alternate_delay-200]"></span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const feedbackText = ref('')
const isSpeechSupported = ref(false)

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition: any = null

const initSpeech = () => {
  if (!SpeechRecognition) {
    console.warn('Web Speech API is not supported in this browser.')
    return
  }

  isSpeechSupported.value = true
  recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = false
  recognition.lang = 'en-US'

  recognition.onresult = (event: any) => {
    const resultIndex = event.resultIndex
    const transcript = event.results[resultIndex][0].transcript.trim().toLowerCase()
    
    feedbackText.value = transcript
    setTimeout(() => {
      feedbackText.value = ''
    }, 3500)
    
    // Command Router
    handleVoiceCommand(transcript)
  }

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error)
    if (event.error === 'not-allowed') {
      store.isVoiceActive = false
    }
  }

  recognition.onend = () => {
    // Restart if active in store
    if (store.isVoiceActive) {
      recognition.start()
    }
  }
}

const handleVoiceCommand = (command: string) => {
  // @ts-ignore
  if (window.playClickSound) window.playClickSound()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      store.setActiveSection(id)
    }
  }

  // Section matches
  if (command.includes('scroll to hero') || command.includes('go to hero') || command.includes('scroll to home') || command.includes('go to home')) {
    scrollToSection('hero')
  } else if (command.includes('scroll to about') || command.includes('go to about') || command.includes('about me')) {
    scrollToSection('about')
  } else if (command.includes('scroll to skills') || command.includes('go to skills') || command.includes('skills')) {
    scrollToSection('skills')
  } else if (command.includes('scroll to projects') || command.includes('go to projects') || command.includes('projects')) {
    scrollToSection('projects')
  } else if (command.includes('scroll to experience') || command.includes('go to experience') || command.includes('experience')) {
    scrollToSection('experience')
  } else if (command.includes('scroll to testimonials') || command.includes('go to testimonials') || command.includes('testimonials')) {
    scrollToSection('testimonials')
  } else if (command.includes('scroll to contact') || command.includes('go to contact') || command.includes('contact')) {
    scrollToSection('contact')
  } 
  
  // State matches
  else if (command.includes('toggle theme') || command.includes('theme') || command.includes('dark mode') || command.includes('light mode')) {
    store.toggleTheme()
  } else if (command.includes('open chatbot') || command.includes('open assistant') || command.includes('show chat')) {
    store.isChatbotOpen = true
  } else if (command.includes('close chatbot') || command.includes('close assistant') || command.includes('hide chat')) {
    store.isChatbotOpen = false
  } else if (command.includes('open command') || command.includes('open console') || command.includes('open terminal')) {
    store.isTerminalOpen = true
  } else if (command.includes('close command') || command.includes('close console') || command.includes('close terminal')) {
    store.isTerminalOpen = false
  } else if (command.includes('mute') || command.includes('unmute') || command.includes('sound on') || command.includes('sound off')) {
    // Trigger audio toggle directly
    const audioBtn = document.querySelector('[title="Toggle Ambient Audio"]') as HTMLElement
    if (audioBtn) audioBtn.click()
  }
}

const toggleListening = () => {
  if (!recognition) return

  store.toggleVoice()

  if (store.isVoiceActive) {
    try {
      recognition.start()
    } catch (e) {
      console.warn('Speech Recognition already running:', e)
    }
  } else {
    try {
      recognition.stop()
    } catch (e) {
      console.warn('Speech Recognition failed to stop:', e)
    }
  }
}

onMounted(() => {
  initSpeech()
})

onUnmounted(() => {
  if (recognition) {
    recognition.stop()
  }
})
</script>

<style scoped>
@keyframes voice-wave {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1.4); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

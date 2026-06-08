<template>
  <Transition name="fade">
    <div
      v-if="store.isTerminalOpen"
      class="fixed inset-0 bg-black/70 backdrop-blur-md z-[99999] flex items-start justify-center pt-[15vh] px-4"
      @click.self="closePalette"
    >
      <div
        class="w-full max-w-2xl overflow-hidden flex flex-col" style="background:#0B0B0B;border:1px solid rgba(255,255,255,0.08);border-radius:20px;box-shadow:0 0 60px rgba(0,0,0,0.8);font-family:Inter,sans-serif;"
        @click.stop
      >


        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3.5 select-none" style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <div class="flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full" style="background:#D62828;"></span>
            <span class="text-xs font-semibold" style="color:#9CA3AF;letter-spacing:0.08em;">Command Palette</span>
          </div>
          <kbd class="text-xs px-2 py-0.5 rounded" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#6B7280;">ESC</kbd>
        </div>

        <!-- Input Area -->
        <div class="flex items-center gap-3 px-5 py-4" style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <svg class="w-4 h-4 flex-shrink-0" style="color:#D62828;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/></svg>
          <input
            ref="inputEl"
            v-model="query"
            @keydown.down.prevent="moveDown"
            @keydown.up.prevent="moveUp"
            @keydown.enter="executeCommand"
            type="text"
            placeholder="Type a command (e.g. /skills, /theme) or ask me anything..."
            class="flex-1 bg-transparent border-none outline-none text-white text-base placeholder-slate-500 w-full"
          />
        </div>

        <!-- Suggestions & Command List -->
        <div class="max-h-[350px] overflow-y-auto p-3" v-if="filteredOptions.length > 0">
          <div class="text-xs font-medium px-3 py-2 mb-1" style="color:#6B7280;letter-spacing:0.08em;text-transform:uppercase;">Navigation</div>
          <div
            v-for="(opt, idx) in filteredOptions"
            :key="opt.command"
            @click="selectOption(opt)"
            @mouseenter="activeIndex = idx"
            class="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150"
            :style="idx === activeIndex ? 'background:rgba(214,40,40,0.08);color:#ffffff;' : 'color:#9CA3AF;'"
          >
            <div class="flex items-center gap-3">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-lg" :style="idx === activeIndex ? 'background:rgba(214,40,40,0.15);color:#D62828;border:1px solid rgba(214,40,40,0.25);' : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#6B7280;'">{{ opt.command }}</span>
              <span class="text-sm font-medium">{{ opt.description }}</span>
            </div>
            <span v-if="idx === activeIndex" class="text-xs font-medium" style="color:#D62828;">↵</span>
          </div>
        </div>

        <!-- Footer tip -->
        <div class="px-5 py-3 text-xs" style="border-top:1px solid rgba(255,255,255,0.05);color:#6B7280;">
          <span v-if="!query">Type <span style="color:#D62828;">/section</span> to navigate or ask a question</span>
          <span v-else>Press <span class="font-semibold text-white">Enter</span> to execute</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

interface CommandOption {
  command: string
  description: string
  action: () => void
}

const store = usePortfolioStore()
const query = ref('')
const activeIndex = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

// Sound effect triggers if enabled
const playHover = () => {
  // @ts-ignore
  if (window.playHoverSound) window.playHoverSound()
}
const playClick = () => {
  // @ts-ignore
  if (window.playClickSound) window.playClickSound()
}

// Scroll navigation helper
const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    store.setActiveSection(id)
  }
}

// Command options mapping
const options: CommandOption[] = [
  { command: '/about', description: 'Scroll to Biography & Timeline', action: () => scrollToSection('about') },
  { command: '/skills', description: 'Scroll to Skills Constellation & Orbit System', action: () => scrollToSection('skills') },
  { command: '/projects', description: 'Scroll to 3D Projects Carousel', action: () => scrollToSection('projects') },
  { command: '/experience', description: 'Scroll to Professional Experience Milestones', action: () => scrollToSection('experience') },
  { command: '/testimonials', description: 'Scroll to Client Endorsements Marquee', action: () => scrollToSection('testimonials') },
  { command: '/contact', description: 'Scroll to Contact Form & Live AI Assistant', action: () => scrollToSection('contact') },
  { command: '/theme', description: 'Switch between futuristic Dark & Light mode', action: () => store.toggleTheme() },
  { command: '/sound', description: 'Toggle ambient synthesizers and audio feedback', action: () => {
    // Toggling sound needs to happen on user interaction context, which we are inside
    const audioBtn = document.querySelector('[title="Toggle Ambient Audio"]') as HTMLElement
    if (audioBtn) audioBtn.click()
  }},
  { command: '/chatbot', description: 'Open the integrated AI Assistant interface', action: () => store.toggleChatbot() },
  { command: '/clear', description: 'Clear chatbot guide message logs', action: () => {
    store.chatbotMessages = [
      {
        sender: 'bot',
        text: 'Logs cleared. Guide re-initialized.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  }}
]

// Filter suggestions based on query
const filteredOptions = computed(() => {
  if (!query.value.startsWith('/')) {
    // If user is typing normal question, only suggest matching slash commands if they start with slash
    return options.slice(0, 6)
  }
  const cleanQuery = query.value.toLowerCase()
  return options.filter(opt => opt.command.toLowerCase().includes(cleanQuery))
})

// Focus input on open
watch(() => store.isTerminalOpen, async (isOpen) => {
  if (isOpen) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    if (inputEl.value) {
      inputEl.value.focus()
    }
  }
})

// Sound triggers on moving indices
watch(activeIndex, () => {
  playHover()
})

const moveDown = () => {
  if (filteredOptions.value.length === 0) return
  activeIndex.value = (activeIndex.value + 1) % filteredOptions.value.length
}

const moveUp = () => {
  if (filteredOptions.value.length === 0) return
  activeIndex.value = (activeIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length
}

const selectOption = (opt: CommandOption) => {
  playClick()
  opt.action()
  closePalette()
}

const executeCommand = () => {
  if (query.value.startsWith('/') && filteredOptions.value[activeIndex.value]) {
    selectOption(filteredOptions.value[activeIndex.value])
  } else if (query.value.trim() !== '') {
    // Normal query -> Route to Chatbot!
    playClick()
    const question = query.value.trim()
    store.addMessage('user', question)
    store.isChatbotOpen = true
    
    // Simulate AI response logic
    setTimeout(() => {
      let reply = "I'm processing that. Let me fetch Jishnu's details..."
      const q = question.toLowerCase()
      
      if (q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('code')) {
        reply = "Jishnu is highly skilled in Vue 3, TypeScript, WebGL, Node.js, and Python. He specializes in designing full stack AI solutions."
      } else if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
        reply = "Jishnu has built award-winning applications including custom LLM integrations, Three.js spatial simulations, and high-performance WebGL platforms."
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
        reply = "You can contact Jishnu directly using the Contact Form at the bottom of the page, or by clicking the Hire buttons in the Hero/NavBar."
      } else if (q.includes('github') || q.includes('stats')) {
        reply = "Jishnu has active open source contributions. You can view his live GitHub statistics under the Projects section."
      } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        reply = "Hello! I am Jishnu's AI portfolio agent. Ask me anything about his credentials, achievements, or tech stacks!"
      } else {
        reply = `That is a great question! Jishnu specializes in solving complex UI challenges, training custom neural controllers, and scaling secure web backends. Feel free to shoot him an email via the contact form to discuss this in depth!`
      }
      
      store.addMessage('bot', reply)
    }, 800)
    
    closePalette()
  }
}

const closePalette = () => {
  store.isTerminalOpen = false
}

// Global hotkey event handler
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.ctrlKey && e.key.toLowerCase() === 'k')) {
    e.preventDefault()
    store.toggleTerminal()
  } else if (e.key === '/' && !store.isTerminalOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
    e.preventDefault()
    store.toggleTerminal()
  } else if (e.key === 'Escape' && store.isTerminalOpen) {
    closePalette()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

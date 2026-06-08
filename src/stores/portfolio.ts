import { defineStore } from 'pinia'

export interface Message {
  sender: 'user' | 'bot'
  text: string
  timestamp: string
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    theme: 'dark' as 'dark' | 'light',
    isSoundEnabled: false,
    isVoiceActive: false,
    isTerminalOpen: false,
    isChatbotOpen: false,
    activeSection: 'hero',
    isLoaded: false,
    chatbotMessages: [
      {
        sender: 'bot',
        text: 'System online. I am Jishnu\'s AI Portfolio Guide. How can I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ] as Message[]
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      const html = document.documentElement
      if (this.theme === 'light') {
        html.classList.remove('dark')
        html.classList.add('light-theme')
      } else {
        html.classList.add('dark')
        html.classList.remove('light-theme')
      }
    },
    toggleSound() {
      this.isSoundEnabled = !this.isSoundEnabled
    },
    toggleVoice() {
      this.isVoiceActive = !this.isVoiceActive
    },
    toggleTerminal() {
      this.isTerminalOpen = !this.isTerminalOpen
    },
    toggleChatbot() {
      this.isChatbotOpen = !this.isChatbotOpen
    },
    setActiveSection(sectionId: string) {
      this.activeSection = sectionId
    },
    setLoaded(value: boolean) {
      this.isLoaded = value
    },
    addMessage(sender: 'user' | 'bot', text: string) {
      this.chatbotMessages.push({
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })
    }
  }
})

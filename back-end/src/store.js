import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    setTheme(theme) {
      this.isDarkMode = theme === 'dark'
    }
  }
})

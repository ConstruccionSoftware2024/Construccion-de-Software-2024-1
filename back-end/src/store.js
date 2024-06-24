import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode))
    },
    setTheme(theme) {
      this.isDarkMode = theme === 'dark'
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode))
    }
  }
})

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false
  }),
  actions: {
    setUser(user) {
      this.user = user
      this.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAuthenticated', 'true')
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.setItem('isAuthenticated', 'false')
    }
  }
})

export const useSesionStore = defineStore('', {
  state: () => ({
    sesionId: JSON.parse(localStorage.getItem('sesion')) || null,
  }),
  actions: {
    setSesion(sesion) {
      this.sesionId = sesion
      localStorage.setItem('sesion', JSON.stringify(this.sesionId))
    },
  }
}) 
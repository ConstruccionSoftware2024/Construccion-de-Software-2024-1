import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(value) {
      this.loading = value;
    },
  },
});

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: (() => {
      try {
        const cookieValue = Cookies.get('isDarkMode')
        return cookieValue ? JSON.parse(cookieValue) : false
      } catch (error) {
        console.error('Error parsing isDarkMode from cookies:', error)
        return false
      }
    })()
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      Cookies.set('isDarkMode', JSON.stringify(this.isDarkMode), { expires: 7 }) // 7 dias (durabilidad de las cookies)
    },
    setTheme(theme) {
      this.isDarkMode = theme === 'dark'
      Cookies.set('isDarkMode', JSON.stringify(this.isDarkMode), { expires: 7 })
    }
  }
})

export const useUserStore = defineStore('user', {
  state: () => ({
    user: (() => {
      try {
        const cookieValue = Cookies.get('user')
        return cookieValue ? JSON.parse(cookieValue) : null
      } catch (error) {
        console.error('Error parsing user from cookies:', error)
        return null
      }
    })(),
    isAuthenticated: (() => {
      try {
        const cookieValue = Cookies.get('isAuthenticated')
        return cookieValue ? JSON.parse(cookieValue) : false
      } catch (error) {
        console.error('Error parsing isAuthenticated from cookies:', error)
        return false
      }
    })()
  }),
  actions: {
    setUser(user) {
      this.user = user
      this.isAuthenticated = true
      Cookies.set('user', JSON.stringify(user), { expires: 7 })
      Cookies.set('isAuthenticated', 'true', { expires: 7 })
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      Cookies.remove('user')
      Cookies.set('isAuthenticated', 'false', { expires: 7 })
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
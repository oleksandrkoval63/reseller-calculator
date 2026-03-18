import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  if (!authStore.isReady) {
    return
  }

  if (!authStore.isAuthenticated) {
    return navigateTo(localePath('/login'))
  }

  if (!authStore.isStaff) {
    return navigateTo(localePath('/'))
  }
})

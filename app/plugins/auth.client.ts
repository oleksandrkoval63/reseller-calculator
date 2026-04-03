import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const { syncAuth } = useAuth()
  const supabase = useSupabaseClient()

  await syncAuth(true)

  supabase.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      authStore.clearAuth()
      authStore.setReady(true)
      return
    }

    queueMicrotask(() => {
      syncAuth(false)
    })
  })
})

import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin({
  name: 'auth-sync',
  dependsOn: ['supabase'],
  async setup() {
    const authStore = useAuthStore()
    const supabase = useSupabaseClient()

    const loadProfileRole = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) return null
      return data?.role ?? null
    }

    const syncAuth = async (initial = false) => {
      if (initial) {
        authStore.setReady(false)
      }

      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        authStore.clearAuth()
        return
      }

      authStore.setUser(data.user)
      authStore.setRole(await loadProfileRole(data.user.id))

      if (initial) {
        authStore.setReady(true)
      }
    }

    await syncAuth(true)

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session?.user) {
        authStore.clearAuth()
        return
      }

      setTimeout(() => {
        syncAuth(false)
      }, 0)
    })
  },
})

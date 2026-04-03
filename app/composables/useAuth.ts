import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()

  const loadProfileRole = async (userId: string) => {
    const supabase = useSupabaseClient()

    const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single()

    if (error) return null
    return data?.role ?? null
  }

  const syncAuth = async (initial = false) => {
    const supabase = useSupabaseClient()

    if (initial) {
      authStore.setReady(false)
    }

    try {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        authStore.clearAuth()
        return
      }

      authStore.setUser(data.user)
      authStore.setRole(await loadProfileRole(data.user.id))
    } finally {
      if (initial) {
        authStore.setReady(true)
      }
    }
  }

  const signUp = async (email: string, password: string) => {
    const supabase = useSupabaseClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  const signIn = async (email: string, password: string) => {
    const supabase = useSupabaseClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    await syncAuth(false)

    return data
  }

  const signOut = async () => {
    const supabase = useSupabaseClient()

    const { error } = await supabase.auth.signOut()
    if (error) throw error

    authStore.clearAuth()
    authStore.setReady(true)

    await navigateTo(localePath('/'))
  }

  const getUser = async () => {
    const supabase = useSupabaseClient()

    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  }

  return {
    signUp,
    signIn,
    signOut,
    getUser,
    syncAuth,
  }
}

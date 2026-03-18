import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const authStore = useAuthStore()

  const localePath = useLocalePath()

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    authStore.clearAuth()
    await navigateTo(localePath('/'))
  }

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  }

  return {
    signUp,
    signIn,
    signOut,
    getUser,
  }
}

import type { User } from '@supabase/supabase-js'

export type AppRole = 'user' | 'moderator' | 'admin' | null

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const role = ref<AppRole>(null)
  const isReady = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin')
  const isModerator = computed(() => role.value === 'moderator')
  const isStaff = computed(() => role.value === 'admin' || role.value === 'moderator')

  const setUser = (value: User | null) => {
    user.value = value
  }

  const setRole = (value: AppRole) => {
    role.value = value
  }

  const setReady = (value: boolean) => {
    isReady.value = value
  }

  const clearAuth = () => {
    user.value = null
    role.value = null
    isReady.value = true
  }

  return {
    user,
    role,
    isReady,
    isAuthenticated,
    isAdmin,
    isModerator,
    isStaff,
    setUser,
    setRole,
    setReady,
    clearAuth,
  }
})

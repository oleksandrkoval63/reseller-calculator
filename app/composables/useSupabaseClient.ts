import type { SupabaseClient } from '@supabase/supabase-js'

export const useSupabaseClient = () => {
  return useNuxtApp().$supabase as SupabaseClient
}

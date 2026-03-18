import { createClient } from '@supabase/supabase-js'

export const createSupabaseAdmin = () => {
  const config = useRuntimeConfig()

  return createClient(config.public.supabaseUrl as string, config.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

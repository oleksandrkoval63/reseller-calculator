import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const useSupabaseClient = () => {
  if (import.meta.server) {
    throw new Error('Supabase client is only available on client')
  }

  if (supabaseClient) {
    return supabaseClient
  }

  const config = useRuntimeConfig()

  supabaseClient = createBrowserClient(
    config.public.supabaseUrl as string,
    config.public.supabasePublishableKey as string,
  )

  return supabaseClient
}

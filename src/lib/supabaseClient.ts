import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  const url = String(import.meta.env.VITE_SUPABASE_URL ?? '').trim()
  const publishableKey = String(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '').trim()

  if (!url || !publishableKey || !publishableKey.startsWith('sb_publishable_')) {
    return null
  }

  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return null
    }
  } catch {
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        skipAutoInitialize: false,
      },
    })
  }

  return supabaseClient
}

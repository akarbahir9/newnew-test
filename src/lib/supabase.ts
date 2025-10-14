import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// If environment variables are missing (for example during a preview or
// misconfigured Netlify/Vercel build), avoid throwing during module init
// which causes the whole app to fail with a white screen. Instead export
// a lightweight mock client that surface errors gracefully when used.
let _supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase not configured: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing')
  // Minimal mock that supports common chain calls like supabase.from(...).select(...)
  const mockQuery = () => ({
    select: async () => ({ data: null, error: new Error('Supabase not configured') }),
    insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
    update: async () => ({ data: null, error: new Error('Supabase not configured') }),
    delete: async () => ({ data: null, error: new Error('Supabase not configured') }),
    eq: () => mockQuery(),
    order: () => mockQuery(),
    limit: () => mockQuery(),
  })

  _supabase = {
    from: (_: string) => mockQuery(),
    // other helpers can be added if your app uses them
  }
}

export const supabase = _supabase

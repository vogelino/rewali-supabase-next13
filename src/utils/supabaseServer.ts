// @ts-check
import { Database } from '../lib/database.types'
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const supabaseServer = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

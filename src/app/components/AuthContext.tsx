"use client"
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { AuthSession } from '@supabase/supabase-js'
import { useState } from 'react'

export const AuthContext: React.FC<{
  initialSession?: AuthSession | null;
  children: JSX.Element;
}> = ({ initialSession, children }) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  )
}

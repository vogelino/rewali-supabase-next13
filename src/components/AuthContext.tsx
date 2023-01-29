"use client"
import { SessionContextProvider, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AuthSession } from '@supabase/supabase-js'

export const AuthContext: React.FC<{
  initialSession?: AuthSession | null;
  children: JSX.Element;
}> = ({ initialSession, children }) => {
  // Create a new supabase browser client on every first render.
  const supabaseClient = useSupabaseClient()

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  )
}

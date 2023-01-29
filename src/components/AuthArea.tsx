"use client"
import { Database } from '@/lib/database.types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { AuthSession } from '@supabase/supabase-js'
import { AuthContext } from './AuthContext'

export const AuthArea: React.FC<{
  initialSession?: AuthSession | null;
}> = ({ initialSession }) => {
  const supabaseClient = useSupabaseClient<Database>()
  // Create a new supabase browser client on every first render.
  const user = useUser()

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut()
    error && console.error(error)
  }

  return (
    <AuthContext initialSession={initialSession}>
      <div className="flex items-center gap-4">
        <p>{user?.email && <span>Logged in as {user.email}</span>}</p>
        <button
          className="rounded-full bg-black px-6 py-3 font-semibold text-white no-underline transition hover:bg-black/80"
          onClick={user ? () => void signOut() : () => console.log()}
        >
          {user ? "Sign out" : "Sign in"}
        </button>
      </div>
    </AuthContext>
  )
}

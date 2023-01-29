"use client"

import { useAuth } from './AuthProvider';

export const AuthArea: React.FC = () => {
  const { initial, user, signOut } = useAuth();

  if (initial || !user) return null;

  return (
    <div className="flex items-center gap-4">
      {user?.email && <p>Logged in as {user.email}</p>}
      <button
        className="rounded-full bg-black px-6 py-3 font-semibold text-white no-underline transition hover:bg-black/80"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  )
}

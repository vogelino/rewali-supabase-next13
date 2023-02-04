'use client';

import { useAuth } from './AuthProvider';
import LogoutIcon from '@/icons/log-out.svg';

export default function SignOut() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      console.error('ERROR signing out:', error);
    }
  }

  return (
    <button type="button" className="text-red-600 flex gap-2 items-center text-lg" onClick={handleSignOut}>
      <LogoutIcon />
      Sign Out
    </button>
  );
}

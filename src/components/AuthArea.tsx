"use client"

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import SignOut from './SignOut';
import Image from 'next/image'

export const AuthArea: React.FC = () => {
  const { initial, user, gravatarProfile } = useAuth();

  if (initial || !user) return null;

  const username = gravatarProfile?.displayName ? gravatarProfile.displayName : user.email
  return (
    <div className="flex items-center gap-8">
      {username && (
        <Link
          href="/profile"
          className="text-left text-slate-700 underline decoration-slate-300 hover:decoration-black hover:text-black transition-all flex gap-2 items-center"
        >
          {gravatarProfile?.thumbnailUrl && (
            <Image
              src={gravatarProfile.thumbnailUrl}
              alt={`Avatar of "${username}"`}
              className="w-6 h-6 rounded-full border border-slate-100"
              width={24}
              height={24}
            />
          )}
          {username}
        </Link>
      )}
      <SignOut />
    </div>
  )
}

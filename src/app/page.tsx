'use client';

import Link from 'next/link';

import Auth from '@/components/Auth';
import { useAuth, VIEWS } from '@/components/AuthProvider';
import cn from "classnames"

export default function Home() {
  const { initial, user, view } = useAuth();

  if (initial) {
    return <div className="card h-72">Loading...</div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <>
        <Link className="button" href="/profile">
          Go to Profile
        </Link>
      </>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-300px)] items-center">
      <div>
        <h1 className={cn("text-6xl font-extrabold mb-4")}>Welcome!</h1>
        <p className={cn("max-w-lg")}>
          Rewali is a small app allowing you to create a reading and watching list (Rewali) and to easily search for titles without having to goolge for those informations
        </p>
      </div>
      <div>
        <Auth view={view} />
      </div>
    </div>
  );
}

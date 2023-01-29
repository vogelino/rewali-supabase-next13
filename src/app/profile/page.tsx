import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from '@/components/SignOut';
import { supabaseServer } from '@/utils/supabaseServer';

export default async function Profile() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="card">
      <h2>User Profile</h2>
      <code className="highlight">{user.email}</code>
      <div className="heading">Last Signed In:</div>
      {user?.last_sign_in_at && (
        <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>
      )}
      <Link className="button" href="/">
        Go Home
      </Link>
      <SignOut />
    </div>
  );
}

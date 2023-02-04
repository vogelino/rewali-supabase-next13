import { redirect } from 'next/navigation';
import { supabaseServer } from '@/utils/supabaseServer';
import { getRewalist } from '@/utils/rewalistUtil';
import Search from '@/components/Search'

export default async function Rewalist() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect('/');
  }

  const rewalist = await getRewalist(user.id, supabase)

  return (
    <>
      <Search />
      <pre>
        {JSON.stringify(rewalist, null, 2)}
      </pre>
    </>
  );
}

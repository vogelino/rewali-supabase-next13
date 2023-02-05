import { redirect } from 'next/navigation';
import { supabaseServer } from '@/utils/supabaseServer';
import { getRewalist } from '@/utils/rewalistUtil';
import Search from '@/components/Search'
import { ReWaList } from '@/components/ReWaList'

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
      <section>
        <h1 className="mb-8 text-5xl font-extrabold">
          Reading and Watching List
        </h1>
        <ReWaList initialRewalist={rewalist} />
      </section>
    </>
  );
}

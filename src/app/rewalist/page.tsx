import { redirect } from 'next/navigation';
import { supabaseServer } from '@/utils/supabaseServer';
import { getRewalist } from '@/utils/rewalistUtil';

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
    <div className="mx-auto max-w-lg p-4 md:p-6 lg:p-8 border border-slate-200 shadow-lg">
      <pre>
        {JSON.stringify(rewalist, null, 2)}
      </pre>
    </div>
  );
}

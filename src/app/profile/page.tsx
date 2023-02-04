import { redirect } from 'next/navigation';
import UpdatePassword from '../../components/Auth/UpdatePassword'

import SignOut from '@/components/SignOut';
import { supabaseServer } from '@/utils/supabaseServer';
import { getGravatarProfile } from '@/utils/gravatarUtil';
import { getRelativeTime } from '@/utils/timeUtil';

export default async function Profile() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect('/');
  }

  const gravatarProfile = await getGravatarProfile(user.email)

  return (
    <div className="mx-auto max-w-lg p-4 md:p-6 lg:p-8 border border-slate-200 shadow-lg">
      <h2 className="text-4xl font-bold mb-6">User Profile</h2>
      <h3 className="text-2xl font-bold mb-6 pt-8 mt-8 border-t border-slate-100">Basic Info</h3>
      <div className={`grid ${gravatarProfile ? "grid-cols-[auto,1fr]" : "grid-cols-1"} items-center gap-x-6`}>
        {gravatarProfile && (
          <img
            src={gravatarProfile.thumbnailUrl}
            alt={`Gravatar image for email "${user.email}"`}
            className="aspect-square rounded-full border-slate-100"
          />
        )}
        <div className="flex flex-col gap-2">
          {gravatarProfile?.name?.formatted && (
            <div className="grid grid-cols-3 gap-4">
              <span className="font-bold">Name</span>
              <span className="col-span-2">{gravatarProfile.name.formatted}</span>
            </div>
          )}
          {gravatarProfile?.displayName && (
            <div className="grid grid-cols-3 gap-4">
              <span className="font-bold">Username</span>
              <span className="col-span-2">{gravatarProfile.displayName}</span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            <span className="font-bold">Email</span>
            <span className="col-span-2">{user.email}</span>
          </div>
          {!gravatarProfile && user?.last_sign_in_at && (
            <div className="grid grid-cols-3 gap-4">
              <span className="font-bold">Last Sign-in:</span>
              <span className="col-span-2">
                {getRelativeTime(new Date(user.last_sign_in_at))}
              </span>
            </div>
          )}
        </div>
        {gravatarProfile?.aboutMe && (
          <div className="col-start-2 mt-2">
            <span className="font-bold">Bio</span>
            <p className="">{gravatarProfile.aboutMe}</p>
          </div>
        )}
        <div className={`${gravatarProfile ? "col-span-2 mt-6" : "mt-4"} `}>
          <a
            href={gravatarProfile?.profileUrl || "https://en.gravatar.com/"}
            title={`${gravatarProfile ? "Edit" : "Add"} your profile information on Gravatar`}
            className="text-left text-slate-700 underline decoration-slate-300 hover:decoration-black hover:text-black transition-all"
          >
            {gravatarProfile ? "Edit" : "Add"} your profile information on{' '}
            <strong>gravatar.com</strong>
          </a>
        </div>
      </div>
      <UpdatePassword />
      <div className="border-t border-red-200 pt-4 flex justify-center">
        <SignOut />
      </div>
    </div>
  );
}

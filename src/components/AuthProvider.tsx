'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/utils/supabaseClient';
import { AuthError, AuthSession, User } from '@supabase/supabase-js';
import { getInternalGravatarProfile, GravatarProfileType } from '@/utils/gravatarUtil';

export const EVENTS = {
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
};

export const VIEWS = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

export type ViewType = typeof VIEWS[keyof typeof VIEWS]

type AppContextType = {
  initial: boolean,
  session: AuthSession | null,
  user: User | null,
  gravatarProfile: GravatarProfileType | null,
  view: ViewType,
  setView: (view: ViewType) => void,
  signOut: () => Promise<{ error: AuthError | null; }>,
}

export const AuthContext = createContext<AppContextType>({
  initial: true,
  session: null,
  user: null,
  gravatarProfile: null,
  view: VIEWS.SIGN_IN,
  setView: () => undefined,
  signOut: () => Promise.resolve({ error: null }),
});

export const AuthProvider = (props: {
  accessToken: string | null;
  children: JSX.Element;
}) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [gravatarProfile, setGravatarProfile] = useState<GravatarProfileType | null>(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);
  const router = useRouter();
  const { accessToken, ...rest } = props;

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabaseClient.auth.getSession();
      if (activeSession) {
        setSession(activeSession);
        setUser(activeSession?.user ?? null);
      }
      setInitial(false);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabaseClient.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);


      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD);
          break;
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      getInternalGravatarProfile(session.user.email)
        .then((gravatarProfile) => gravatarProfile
          && setGravatarProfile(gravatarProfile))
    }
  }, [session])

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      gravatarProfile,
      signOut: () => supabaseClient.auth.signOut(),
    };
  }, [initial, gravatarProfile, session, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

'use client';

import { redirect } from 'next/navigation';
import { useAuth, VIEWS, type ViewType } from '../AuthProvider';
import ResetPassword from './ResetPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UpdatePassword from './UpdatePassword';

const Auth = ({ view: initialView }: { view?: ViewType }) => {
  let auth = useAuth();

  if (auth.user?.email) {
    redirect("/rewalist")
  }

  const view = initialView || auth.view || VIEWS.SIGN_IN

  switch (view) {
    case VIEWS.UPDATE_PASSWORD:
      return <UpdatePassword />;
    case VIEWS.FORGOTTEN_PASSWORD:
      return <ResetPassword />;
    case VIEWS.SIGN_UP:
      return <SignUp />;
    default:
      return <SignIn />;
  }
};

export default Auth;

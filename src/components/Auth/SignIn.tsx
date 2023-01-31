'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth, VIEWS } from '../AuthProvider';
import { supabaseClient } from '@/utils/supabaseClient';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

type FormType = Yup.InferType<typeof SignInSchema>

const SignIn = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function signIn(formData: FormType) {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error?.message) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="px-8 py-6 border bg-white border-slate-200 shadow-lg">
      <h2 className="font-bold mb-6 text-2xl">Sign In</h2>
      <Formik
        // @ts-ignore
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={signIn}
      >
        {({ errors, touched, submitCount }) => (
          <Form className="flex flex-col gap-y-2 border-b border-slate-200 pb-6 mb-4">
            <label htmlFor="email" className='pt-2'>Email</label>
            <div className='flex flex-col gap-1 mb-2'>
              <Field
                className={cn(
                  'input ',
                  errors.email && touched.email && submitCount > 0
                    ? 'bg-red-50 border-red-500 placeholder:text-red-400 focus:border-red-700'
                    : 'border-slate-300 focus:border-slate-500 placeholder:text-slate-400'
                )}
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              {errors.email && touched.email && submitCount > 0 ? (
                <div className="text-red-600">{errors.email}</div>
              ) : null}
            </div>

            <label htmlFor="email" className='pt-2'>Password</label>
            <div className='flex flex-col gap-1 mb-6'>
              <Field
                className={cn(
                  'input ',
                  errors.password && touched.password && submitCount > 0
                    ? 'bg-red-50 border-red-500 placeholder:text-red-400 focus:border-red-700'
                    : 'border-slate-300 focus:border-slate-500 placeholder:text-slate-400'
                )}
                id="password"
                name="password"
                placeholder="●●●●●●●●●"
                type="password"
              />
              {errors.password && touched.password && submitCount > 0 ? (
                <div className="text-red-600">{errors.password}</div>
              ) : null}
            </div>

            <div className='col-span-2 flex justify-end gap-6'>
              <button
                className="text-left text-slate-700 underline decoration-slate-300 hover:decoration-black hover:text-black transition-all"
                type="button"
                onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
              >
                Forgot your password?
              </button>

              <button className="text-left px-4 py-2 bg-black text-white rounded-full" type="submit">
                Submit
              </button>
            </div>
            {errorMsg && <div className="col-span-2 flex justify-start text-red-600 border-t pt-4 border-red-200">{errorMsg}</div>}
          </Form>
        )}
      </Formik>
      <div className='flex justify-center'>
        <button
          className="text-left text-slate-700 underline decoration-slate-300 hover:decoration-black hover:text-black transition-all"
          type="button"
          onClick={() => setView(VIEWS.SIGN_UP)}
        >
          Don&apos;t have an account? <strong>Sign Up.</strong>
        </button>
      </div>
    </div>
  );
};

export default SignIn;

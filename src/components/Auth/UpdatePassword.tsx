'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { supabaseClient } from '@/utils/supabaseClient';

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

type FormType = Yup.InferType<typeof UpdatePasswordSchema>

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function updatePassword(formData: FormType) {
    const { data, error } = await supabaseClient.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error?.message);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Update Password</h2>
      <Formik
        // @ts-ignore
        initialValues={{
          password: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={updatePassword}
      >
        {({ errors, touched, submitCount }) => (
          <Form className="flex flex-col gap-y-2 border-b border-slate-200 pb-6 mb-4">
            <label htmlFor="password" className='pt-2'>New password</label>
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
              <button className="text-left px-4 py-2 bg-black text-white rounded-full" type="submit">
                Update Password
              </button>
            </div>
            {errorMsg && <div className="flex flex-col text-red-600 border-t pt-4 border-red-200">{errorMsg}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;


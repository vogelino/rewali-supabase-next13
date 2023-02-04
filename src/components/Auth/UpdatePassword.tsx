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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function updatePassword(formData: FormType) {
    const { error } = await supabaseClient.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error?.message);
    }

    setSuccessMsg("Your password was successfully reset")
  }

  return (
    <div className="pt-8 mt-8 border-t border-slate-100">
      <h3 className="text-2xl font-bold mb-4">Change Password</h3>
      <Formik
        // @ts-ignore
        initialValues={{
          password: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={updatePassword}
      >
        {({ errors, touched, submitCount }) => (
          <Form className="flex flex-col gap-y-2 pb-6 mb-4">
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
                Change Password
              </button>
            </div>
            {errorMsg && <div className="flex flex-col text-red-600 border-t pt-4 border-red-200">{errorMsg}</div>}
            {successMsg && <div className="flex flex-col text-green-600 border-t pt-4 border-green-200">{errorMsg}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;


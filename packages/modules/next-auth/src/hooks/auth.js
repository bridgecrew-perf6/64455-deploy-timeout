import { useState, useMemo } from 'react';
import { useRouter } from '@atelierfabien/next-foundation';
import { isBlank } from '@atelierfabien/next-foundation/lib/util';
import { useTranslation } from '@foundation/next';
import { signIn, useSession } from 'next-auth/client';
import { signUp } from '../lib/client';

const signupProviders = ['sanity-login'];

export const useCredentialsForm = ({ redirectTo, ...options }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t, lang } = useTranslation();

  return useMemo(() => {
    const resetForm = () => {
      setName('');
      setEmail('');
      setPassword('');
    };

    const handleSignIn = async (e) => {
      e.preventDefault();

      const provider = e.target.dataset.provider ?? 'sanity-login';

      const response = await signIn(provider, {
        email,
        password,
        locale: lang,
        redirect: false,
        ...options,
      });

      if (response?.error) {
        UIkit.notification({
          message: t('auth:errors.signIn'),
          status: 'warning',
        });
      } else {
        resetForm();

        UIkit.notification({
          message: t(
            provider === 'email'
              ? 'auth:email.signIn.message'
              : 'auth:credentials.signIn.message'
          ),
          status: 'success',
        });

        if (!isBlank(redirectTo)) router.push(redirectTo);
      }
    };

    const handleSignUp = async (e) => {
      e.preventDefault();

      const provider = e.target.dataset.provider ?? 'sanity-login';

      if (signupProviders.includes(provider)) {
        let response = await signUp({
          name,
          email,
          password,
        });

        if (response.error && !response.signIn) {
          UIkit.notification({
            message: t('auth:errors.signUp'),
            status: 'warning',
          });
        } else {
          resetForm();

          UIkit.notification({
            message: t(
              response.disabled
                ? 'auth:credentials.signUp.managed'
                : 'auth:credentials.signUp.message'
            ),
            status: 'success',
          });

          if (!response.disabled) handleSignIn(e);
        }
      }
    };

    return {
      router,
      handleSignUp,
      handleSignIn,
      resetForm,
      session,
      loading,
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      locale: lang,
    };
  }, [router, lang, session, loading, name, email, password, options, t]);
};

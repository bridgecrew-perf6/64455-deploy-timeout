import { useState, useMemo } from 'react';
import { useRouter } from '@atelierfabien/next-foundation';
import { isBlank } from '@atelierfabien/next-foundation/lib/util';
import { useTranslation } from '@foundation/next';
import { signIn, useSession } from 'next-auth/client';
import { signUp } from '../lib/client';

const signupProviders = ['sanity-login'];

export const useCredentialsForm = (config = {}) => {
  const { redirectTo, onSubmit, ...options } = config;
  const router = useRouter();
  const [session, loading] = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSent, setSent] = useState(false);

  const { t, lang } = useTranslation();

  return useMemo(() => {
    const resetForm = (sent = true) => {
      setSent(sent);
      setName('');
      setEmail('');
      setPassword('');
    };

    const handleSignIn = async e => {
      e.preventDefault();

      const provider = e.target.dataset.provider ?? 'sanity-login';
      const isEmail = provider === 'email';

      const callbackUrl = !isBlank(router.query.callbackUrl)
        ? router.query.callbackUrl
        : redirectTo;

      const data = {
        email,
        password,
        locale: lang,
        redirect: false,
        callbackUrl,
        ...options,
      };

      const response = await signIn(provider, data);

      if (response?.error) {
        UIkit.notification({
          message: t('auth:errors.signIn'),
          status: 'warning',
        });
      } else {
        resetForm();

        if (typeof onSubmit === 'function') onSubmit(data);

        UIkit.notification({
          message: t(
            isEmail
              ? 'auth:email.signIn.message'
              : 'auth:credentials.signIn.message'
          ),
          status: 'success',
        });

        if (!isEmail && !isBlank(callbackUrl)) {
          router.push(callbackUrl);
        }
      }
    };

    const handleSignUp = async e => {
      e.preventDefault();

      const provider = e.target.dataset.provider ?? 'sanity-login';

      if (signupProviders.includes(provider)) {
        const data = {
          name,
          email,
          password,
        };

        let response = await signUp(data);

        if (response.error && !response.signIn) {
          UIkit.notification({
            message: t('auth:errors.signUp'),
            status: 'warning',
          });
        } else {
          resetForm();

          if (typeof onSubmit === 'function') onSubmit(data);

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
      disabled: isSent,
    };
  }, [
    router,
    session,
    loading,
    name,
    email,
    password,
    lang,
    isSent,
    setSent,
    redirectTo,
    options,
    t,
    onSubmit,
  ]);
};

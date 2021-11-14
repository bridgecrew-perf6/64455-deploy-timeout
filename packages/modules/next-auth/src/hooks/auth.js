import { useState, useMemo } from 'react';
// import { signIn, signUp, useSession } from 'next-auth/client';
import { useSession } from 'next-auth/client';

export const useCredentialsForm = ({
  authPath = 'credentials',
  ...options
}) => {
  const [session, loading] = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return useMemo(() => {
    const handleSignIn = async (e) => {
      e.preventDefault();

      console.log('SIGN IN', email, password);

      // const result = await signIn(authPath, {
      //   email,
      //   password,
      //   redirect: false,
      //   ...options,
      // });

      // console.log(result);
    };

    const handleSignUp = async (e) => {
      e.preventDefault();

      console.log('SIGN UP', name, email, password);

      // const user = await signUp({
      //   name,
      //   email,
      //   password,
      // });

      // console.log(user);

      // const result = await signIn(authPath, {
      //   email,
      //   password,
      //   redirect: false,
      //   ...options,
      // });

      // console.log(result);
    };

    return {
      handleSignUp,
      handleSignIn,
      session,
      loading,
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
    };
  }, [authPath, options, email, loading, name, password, session]);
};

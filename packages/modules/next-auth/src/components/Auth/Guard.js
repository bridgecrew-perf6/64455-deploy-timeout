import { useEffect, useMemo } from 'react';
import { useRouter } from '@atelierfabien/next-foundation';

import { signIn, useSession } from 'next-auth/client';

import AuthUnauthorized from '@app/components/Auth/Unauthorized';

const AuthGuard = ({ authentication, children, ...props }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const authenticationOptions = useMemo(() => {
    return typeof authentication === 'object' ? authentication : {};
  }, [authentication]);

  const action = useMemo(() => {
    return typeof authenticationOptions.signIn === 'function'
      ? () => authenticationOptions.signIn(router, signIn)
      : signIn;
  }, [authenticationOptions, router]);

  useEffect(() => {
    if (authenticationOptions.redirect && !loading && !session) action();
  }, [authenticationOptions, action, loading, session]);

  if (session) {
    return <>{children}</>;
  } else if (authenticationOptions.redirect) {
    return null; // don't render anything
  } else {
    return (
      <AuthUnauthorized
        loading={loading}
        action={action}
        options={authenticationOptions}
        {...props}
      />
    );
  }
};

export default AuthGuard;

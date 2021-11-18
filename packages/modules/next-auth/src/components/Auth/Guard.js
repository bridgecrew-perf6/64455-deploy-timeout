import { useEffect, useMemo } from 'react';
import { useRouter } from '@atelierfabien/next-foundation';

import { signIn, useSession } from 'next-auth/client';

import AuthUnauthorized from '@app/components/Auth/Unauthorized';

const AuthGuard = ({
  authentication,
  redirectToSignIn = false,
  children,
  ...props
}) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const action = useMemo(() => {
    return typeof authentication === 'function'
      ? () => authentication(router, signIn)
      : signIn;
  }, [authentication, router]);

  useEffect(() => {
    if (redirectToSignIn && !loading && !session) action();
  }, [redirectToSignIn, action, loading, session]);

  if (session) {
    return <>{children}</>;
  } else {
    return <AuthUnauthorized loading={loading} action={action} {...props} />;
  }
};

export default AuthGuard;

import { useMemo } from 'react';
import { AppLayout } from '@foundation/components/App';

import AuthUnauthorizedContainer from '@app/components/Auth/Unauthorized/Container';
import AuthUnauthorizedLoading from '@app/components/Auth/Unauthorized/Loading';
import AuthUnauthorizedWarning from '@app/components/Auth/Unauthorized/Warning';

export const useUnauthorizedComponent = (action, loading = false) => {
  return useMemo(() => {
    const Comp = loading ? AuthUnauthorizedLoading : AuthUnauthorizedWarning;
    // eslint-disable-next-line react/display-name
    return () => (
      <AuthUnauthorizedContainer>
        <Comp action={action} />
      </AuthUnauthorizedContainer>
    );
  }, [action, loading]);
};

const AuthUnauthorized = ({ action, loading, pageProps }) => {
  const Component = useUnauthorizedComponent(action, loading);
  return <AppLayout Component={Component} pageProps={pageProps} />;
};

export default AuthUnauthorized;

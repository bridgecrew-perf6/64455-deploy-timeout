import { useMemo } from 'react';
import { AppLayout } from '@foundation/components/App';

import AuthUnauthorizedContainer from '@app/components/Auth/Unauthorized/Container';
import AuthUnauthorizedLoading from '@app/components/Auth/Unauthorized/Loading';
import AuthUnauthorizedWarning from '@app/components/Auth/Unauthorized/Warning';

export const useUnauthorizedComponent = (
  action,
  loading = false,
  options = {}
) => {
  return useMemo(() => {
    const Comp = loading ? AuthUnauthorizedLoading : AuthUnauthorizedWarning;
    const AuthUnauthorizedPage = () => (
      <AuthUnauthorizedContainer action={action} options={options}>
        <Comp action={action} options={options} />
      </AuthUnauthorizedContainer>
    );
    return AuthUnauthorizedPage;
  }, [action, loading, options]);
};

const AuthUnauthorized = ({ action, loading, pageProps }) => {
  const Component = useUnauthorizedComponent(action, loading);
  return <AppLayout Component={Component} pageProps={pageProps} />;
};

export default AuthUnauthorized;

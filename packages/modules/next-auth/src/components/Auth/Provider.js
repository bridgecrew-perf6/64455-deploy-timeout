import { Provider } from 'next-auth/client';

const AuthProvider = ({ pageProps, children }) => (
  <Provider session={pageProps.session}>{children}</Provider>
);

export default AuthProvider;

import AuthProvider from '@app/components/Auth/Provider';

const AppContainer = ({ children, ...props }) => (
  <AuthProvider {...props}>{children}</AuthProvider>
);

export default AppContainer;

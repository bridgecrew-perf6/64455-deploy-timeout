import AuthProvider from '@app/components/Auth/Provider';
import AuthGuard from '@app/components/Auth/Guard';

// To enable authentication on a page:
//
// const Page = () => <h1>Members only</h1>;
// Page.authentication = true;
//
// Or using options:
//
// Page.authentication = {
//   redirect: true, // optional, to auto-redirect to sign-in page
//   signIn: (router, signIn) => () // optional
// }
// export default Page;

const AppContainer = ({ Component, children, ...props }) => {
  const { authentication } = Component;
  return (
    <AuthProvider Component={Component} {...props}>
      {authentication && (
        <AuthGuard authentication={authentication} {...props}>
          {children}
        </AuthGuard>
      )}
      {!authentication && <>{children}</>}
    </AuthProvider>
  );
};

export default AppContainer;

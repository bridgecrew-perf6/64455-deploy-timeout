import AuthProvider from '@app/components/Auth/Provider';
import AuthGuard from '@app/components/Auth/Guard';

// To enable authentication on a page:
//
// const Page = () => <h1>Members only</h1>;
// Page.authentication = true; // or fn(router, signIn);
// Page.redirectToSignIn = true; // optional, to auto-redirect to sign-in page
// export default Page;

const AppContainer = ({ Component, children, ...props }) => {
  const { authentication, redirectToSignIn } = Component;
  return (
    <AuthProvider Component={Component} {...props}>
      {authentication && (
        <AuthGuard
          authentication={authentication}
          redirectToSignIn={redirectToSignIn}
          {...props}
        >
          {children}
        </AuthGuard>
      )}
      {!authentication && <>{children}</>}
    </AuthProvider>
  );
};

export default AppContainer;

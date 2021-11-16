import { signOut } from 'next-auth/client';

import { useTranslation } from '@foundation/next';

import { useCredentialsForm } from '@app/hooks/auth';
import AuthCredentialsSignIn from '@app/components/Auth/Credentials/SignIn';
import AuthCredentialsSignUp from '@app/components/Auth/Credentials/SignUp';
import AuthEmailSignIn from '@app/components/Auth/Email/SignIn';

const AuthPage = (props) => {
  const form = useCredentialsForm(props);
  const { session, loading } = form;

  const { t } = useTranslation();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {session && (
        <>
          <p>
            User: {session?.user?.name} / {session?.user?.email}
          </p>
          <button onClick={signOut} className="uk-button uk-button-danger">
            {t('auth:signOut.button')}
          </button>
        </>
      )}
      {!session && (
        <>
          <AuthCredentialsSignUp {...form} />
          <AuthCredentialsSignIn {...form} />
          <AuthEmailSignIn {...form} />
        </>
      )}
    </div>
  );
};

export default AuthPage;

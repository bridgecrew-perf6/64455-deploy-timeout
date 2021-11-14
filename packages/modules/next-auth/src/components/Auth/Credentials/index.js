import { useCredentialsForm } from '@app/hooks/auth';
import AuthCredentialsSignIn from '@app/components/Auth/Credentials/SignIn';
import AuthCredentialsSignUp from '@app/components/Auth/Credentials/SignUp';

const AuthCredentials = (props) => {
  const form = useCredentialsForm(props);
  const { session, loading } = form;

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>User: {session?.user?.name}</p>
      <h1>Sign Up</h1>
      <AuthCredentialsSignUp {...form} />
      <h1>Sign In</h1>
      <AuthCredentialsSignIn {...form} />
    </div>
  );
};

export default AuthCredentials;

export { AuthCredentialsSignIn, AuthCredentialsSignUp };

import { useTranslation } from '@foundation/next';

const AuthCredentialsSignIn = ({ provider = 'sanity-login', ...props }) => {
  const { handleSignIn, email, setEmail, password, setPassword } = props;

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSignIn} data-provider={provider}>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">
          {t('auth:credentials.signIn.title')}
        </legend>
        <div className="uk-margin">
          <input
            type="email"
            value={email}
            placeholder={t('auth:fields.email.placeholder')}
            className="uk-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <input
            type="password"
            placeholder={t('auth:fields.password.placeholder')}
            value={password}
            className="uk-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <button type="submit" className="uk-button uk-button-primary">
            {t('auth:credentials.signIn.button')}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default AuthCredentialsSignIn;

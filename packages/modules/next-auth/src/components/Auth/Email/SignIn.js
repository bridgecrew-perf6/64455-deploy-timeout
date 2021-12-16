import { useTranslation } from '@foundation/next';

const AuthEmailSignIn = props => {
  const { handleSignIn, email, setEmail } = props;

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSignIn} data-provider="email">
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">{t('auth:email.signIn.title')}</legend>
        <div className="uk-margin">
          <input
            type="email"
            value={email}
            placeholder={t('auth:fields.email.placeholder')}
            className="uk-input"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <button type="submit" className="uk-button uk-button-primary">
            {t('auth:email.signIn.button')}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default AuthEmailSignIn;

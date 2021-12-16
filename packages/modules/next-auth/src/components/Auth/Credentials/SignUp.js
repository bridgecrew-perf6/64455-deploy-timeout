import { useTranslation } from '@foundation/next';

const AuthCredentialsSignUp = ({ provider = 'sanity-login', ...props }) => {
  const {
    handleSignUp,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
  } = props;

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSignUp} data-provider={provider}>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">
          {t('auth:credentials.signUp.title')}
        </legend>
        <div className="uk-margin">
          <input
            type="name"
            placeholder={t('auth:fields.name.placeholder')}
            value={name}
            className="uk-input"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <input
            type="email"
            placeholder={t('auth:fields.email.placeholder')}
            value={email}
            className="uk-input"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <input
            type="password"
            placeholder={t('auth:fields.password.placeholder')}
            value={password}
            className="uk-input"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <button type="submit" className="uk-button uk-button-primary">
            {t('auth:credentials.signUp.button')}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default AuthCredentialsSignUp;

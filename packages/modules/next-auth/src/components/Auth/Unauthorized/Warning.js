import { useTranslation } from '@foundation/next';

const AuthUnauthorizedWarning = ({ action }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('auth:unauthorized.title')}</h1>
      <p>{t('auth:unauthorized.message')}</p>
      <button className="uk-button uk-button-primary" onClick={() => action()}>
        {t('auth:signIn.button')}
      </button>
    </div>
  );
};

export default AuthUnauthorizedWarning;

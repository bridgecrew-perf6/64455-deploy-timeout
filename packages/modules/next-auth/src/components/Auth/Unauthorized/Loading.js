import { useTranslation } from '@foundation/next';

const AuthUnauthorizedLoading = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('auth:loading')}</h1>
    </div>
  );
};

export default AuthUnauthorizedLoading;

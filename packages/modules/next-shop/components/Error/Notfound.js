import { Link, useTranslation } from '@foundation/next';

const ErrorNotfound = () => {
  const { t } = useTranslation();

  return (
    <section
      className="uk-section uk-section-small"
      uk-height-viewport="expand: true"
    >
      <div className="uk-container">
        <div className="uk-text-center">
          <h1 className="uk-heading-large">
            {t('common:errors.pageNotFound.heading')}
          </h1>
          <div className="uk-text-lead">
            {t('common:errors.pageNotFound.title')}
          </div>
          <div className="uk-margin-top">
            {t('common:errors.pageNotFound.description')}
          </div>
          <div className="uk-margin-top">
            <Link href="/">{t('common:errors.pageNotFound.action')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorNotfound;

import { useTranslation } from '@foundation/next';

import { WarningAlt16 } from '@carbon/icons-react';

const ProductListInfo = ({ query }) => {
  const { t } = useTranslation();

  const nbHits = query.data?.length ?? 0;
  const loaded = query.isSuccess;
  const searching = query.isLoading;
  const error = query.isError;

  const showStats = loaded && !searching && !error;
  const showLoading = searching || (!loaded && !error);
  const showError = error && !showLoading;

  return (
    <div className="uk-line-height">
      {showStats && (
        <p className="uk-text-muted uk-margin-remove">
          {t('shop:hitsCount', { count: nbHits, nbHits })}
        </p>
      )}
      {showLoading && (
        <div className="uk-flex uk-flex-middle uk-line-height">
          <div className="uk-margin-small-right" uk-spinner="ratio: 0.5" />
        </div>
      )}
      {showError && (
        <div className="uk-flex uk-flex-middle uk-line-height">
          <WarningAlt16 className="uk-icon uk-notification-message-warning uk-margin-small-right" />
          <p className="uk-margin-remove">{t('shop:searchError')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductListInfo;

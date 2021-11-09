import { connectStateResults } from 'react-instantsearch-dom';

import { StatsSummary } from '@shop/components/Algolia/Widgets/Stats';

import { useTranslation, useHasLoaded } from '@foundation/next';

import { WarningAlt16 } from '@carbon/icons-react';

const StateResults = ({ searchResults, searching, error }) => {
  const { t } = useTranslation();

  const loaded = useHasLoaded(searchResults, searchResults => searchResults);

  const showStats = loaded && !searching && !error;
  const showLoading = searching || (!loaded && !error);
  const showError = error && !showLoading;

  return (
    <div className="uk-line-height">
      {showStats && <StatsSummary {...searchResults} />}
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

export default connectStateResults(StateResults);

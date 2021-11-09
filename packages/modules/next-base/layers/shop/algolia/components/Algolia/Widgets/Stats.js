import { connectStats } from 'react-instantsearch-dom';

import { useTranslation } from '@foundation/next';

export const StatsSummary = ({
  processingTimeMS,
  nbHits,
  nbSortedHits,
  areHitsSorted,
}) => {
  const { t } = useTranslation();
  return (
    <p className="uk-text-muted uk-margin-remove">
      {areHitsSorted && nbHits !== nbSortedHits
        ? t('shop:sortedHitsCount', {
            count: nbSortedHits,
            nbSortedHits,
            areHitsSorted,
            processingTimeMS,
          })
        : t('shop:hitsCount', { count: nbHits, nbHits, processingTimeMS })}
    </p>
  );
};

export default connectStats(StatsSummary);

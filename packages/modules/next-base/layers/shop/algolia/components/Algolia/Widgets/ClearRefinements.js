import { useMemo } from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

import { useTranslation } from '@foundation/next';

const ClearRefinements = ({ items, refine, autoHide, withIcon, filter }) => {
  const { t } = useTranslation();

  const refinements = useMemo(() => {
    if (Array.isArray(filter)) {
      return items.filter(item => filter.includes(item.attribute));
    } else if (typeof filter === 'function') {
      return items.filter(item => filter(item));
    } else {
      return items;
    }
  }, [filter, items]);

  if (autoHide && !refinements.length) {
    return null;
  } else {
    return (
      <button
        className={`uk-button uk-button-${
          refinements.length ? 'primary' : 'default'
        } uk-width-1-1 uk-text-truncate`}
        type="button"
        onClick={() => refine(refinements)}
        disabled={!refinements.length}
      >
        {withIcon && (
          <span
            className="uk-margin-xsmall-right"
            uk-icon="icon: close; ratio: .75;"
          />
        )}
        {t('shop:filtersResetAll')}
      </button>
    );
  }
};

export default connectCurrentRefinements(ClearRefinements);

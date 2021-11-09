import { connectHitsPerPage } from 'react-instantsearch-dom';

import { useTranslation } from '@foundation/next';

import { useUserPreference } from '@app/hooks/preferences';

import CustomSelect from '@shop/components/Common/CustomSelect';

const defaults = {
  perPage: 24,
  perPageOptions: [
    { label: '12', value: 12 },
    { label: '24', value: 24 },
    { label: '64', value: 64 },
  ],
};

export const HitsPerPage = connectHitsPerPage(
  ({
    label,
    items = [],
    currentRefinement,
    refine,
    preferenceKey = 'hitsPerPage',
    ...props
  }) => {
    const [preference, updatePreference] = useUserPreference(
      preferenceKey,
      items,
      currentRefinement,
      refine
    );

    const { t } = useTranslation();
    const selectLabel = label ?? t('common:pagination.perPage');
    return (
      <CustomSelect
        label={selectLabel}
        value={preference}
        items={items}
        onChange={e => {
          e.preventDefault();
          refine(e.target.value);
          updatePreference(e.target.value, v => parseInt(v, 10));
        }}
        {...props}
      />
    );
  }
);

const HitsPerPageSelect = ({ perPage, perPageOptions, ...props }) => {
  const defaultRefinement = perPage > 0 ? perPage : defaults.perPage;
  const items = Array.isArray(perPageOptions)
    ? perPageOptions
    : defaults.perPageOptions;

  if (items.length > 0) {
    return (
      <HitsPerPage
        defaultRefinement={defaultRefinement}
        items={items}
        {...props}
      />
    );
  } else {
    return null;
  }
};

export default HitsPerPageSelect;

import { useMemo } from 'react';

import { connectSortBy } from 'react-instantsearch-dom';

import { useTranslation, useRouter } from '@foundation/next';

import { camelCase } from '@foundation/lib/util';

import { useUserPreference } from '@app/hooks/preferences';

import CustomSelect from '@shop/components/Common/CustomSelect';

import { getIndexName } from '@app/lib/algolia';

const defaults = {
  sortByOptions: [],
};

export const SortBy = connectSortBy(
  ({
    label,
    items = [],
    currentRefinement,
    refine,
    preferenceKey = 'sortBy',
    ...props
  }) => {
    const [preference, updatePreference] = useUserPreference(
      preferenceKey,
      items,
      currentRefinement,
      refine
    );

    const { t } = useTranslation();
    const selectLabel = label ?? t('common:pagination.sortBy');

    return (
      <CustomSelect
        label={selectLabel}
        value={preference}
        items={items}
        onChange={e => {
          e.preventDefault();
          refine(e.target.value);
          updatePreference(e.target.value);
        }}
        {...props}
      />
    );
  }
);

const HitsPerPageSelect = ({ sortBy, sortByOptions, ...props }) => {
  const { locale } = useRouter();
  const { t } = useTranslation();

  const defaultRefinement = getIndexName(locale, sortBy ?? defaults.sortBy);
  const sortOptions = Array.isArray(sortByOptions)
    ? sortByOptions
    : defaults.sortByOptions;

  const items = useMemo(() => {
    const options = sortOptions.map(item => {
      const fallback = `shop:${camelCase(`sort by ${item.value}`)}`;
      const label = t(item.label ?? fallback, {}, { fallback });
      const value = getIndexName(locale, item.value);
      return { label, value };
    });

    return [
      {
        label: t('shop:sortByDefault'),
        value: defaultRefinement,
      },
    ].concat(options);
  }, [defaultRefinement, locale, sortOptions, t]);

  if (items.length > 1) {
    return (
      <SortBy defaultRefinement={defaultRefinement} items={items} {...props} />
    );
  } else {
    return null;
  }
};

export default HitsPerPageSelect;

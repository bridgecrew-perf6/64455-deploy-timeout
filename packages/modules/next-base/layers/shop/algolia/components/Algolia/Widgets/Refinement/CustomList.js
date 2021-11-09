import { connectMenu } from 'react-instantsearch-dom';
import { useMemo } from 'react';
import { useRouter } from '@foundation/next';
import { lookup, keyBy } from '@foundation/lib/util';

import { withRefinementList } from '@app/hooks/algolia';

const CustomList = ({ WrapperComponent, ...props }) => {
  const { values = [], items: entries = [], refine, refinementId } = props;
  const { locale, defaultLocale } = useRouter();

  const items = useMemo(() => {
    const itemsLookup = keyBy(entries, 'label');
    return values.reduce((memo, value) => {
      const match = itemsLookup[value.value];
      const label =
        lookup(
          value,
          ['i18n', locale, 'label'],
          ['i18n', defaultLocale, 'label']
        ) ?? match.label;

      if (match && match.count > 0) {
        memo.push({ ...match, label });
      }
      return memo;
    }, []);
  }, [defaultLocale, entries, locale, values]);

  return (
    <WrapperComponent {...props}>
      <ul className="uk-list tm-scrollbox">
        {items.map((item, index) => (
          <li
            key={item.label}
            onClick={e => {
              e.preventDefault();
              refine(item.isRefined ? '' : item.value);
            }}
          >
            <input
              className="tm-checkbox"
              id={`${refinementId}-${index}`}
              name={refinementId}
              checked={item.isRefined}
              type="checkbox"
              onChange={e => e.preventDefault()}
            />
            <label htmlFor={`${refinementId}-${index}`}>
              <span>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </WrapperComponent>
  );
};

export default connectMenu(withRefinementList(CustomList));

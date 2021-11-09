import { connectMenu } from 'react-instantsearch-dom';

import { useTranslation } from '@foundation/next';

import { withRefinementList } from '@app/hooks/algolia';

const MenuSelect = ({ WrapperComponent, ...props }) => {
  const { label, items, currentRefinement, refine } = props;
  const { t } = useTranslation();
  return (
    <WrapperComponent {...props}>
      <select
        className="uk-select tm-search-select"
        value={currentRefinement || ''}
        onChange={event => refine(event.currentTarget.value)}
      >
        <option value="">
          {t('shop:allQuantifier')} {String(label).toLowerCase()}
        </option>
        {items.map(item => (
          <option
            key={item.label}
            value={item.isRefined ? currentRefinement : item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </WrapperComponent>
  );
};

export default connectMenu(
  withRefinementList(MenuSelect, { alphabetical: true })
);

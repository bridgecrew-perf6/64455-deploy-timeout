import { useState } from 'react';

import { useTranslation } from '@foundation/next';

import { isBlank } from '@foundation/lib/util';

const ListSearch = ({ onChange }) => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const empty = isBlank(value);

  return (
    <form
      noValidate
      action=""
      role="search"
      className="uk-search uk-search-default uk-width-1-1 tm-refinement-list-search"
    >
      <input
        className="uk-search-input"
        type="search"
        placeholder={t('common:search.placeholder')}
        value={value}
        onChange={e => {
          setValue(e.currentTarget.value);
          onChange(e);
        }}
      />
      <a
        onClick={e => {
          e.preventDefault();
          setValue('');
          onChange(e);
        }}
        className="uk-search-icon uk-search-icon-flip uk-animation-fade uk-animation-fast"
        uk-icon="close"
        hidden={empty}
      />
    </form>
  );
};

export const List = props => {
  const {
    refinementId,
    items,
    refine,
    searchForItems,
    searchable,
    WrapperComponent,
  } = props;

  return (
    <WrapperComponent {...props}>
      {searchable && (
        <ListSearch
          onChange={event => searchForItems(event.currentTarget.value)}
        />
      )}
      <ul className="uk-list tm-scrollbox">
        {items.map((item, index) => (
          <li
            key={item.label}
            onClick={e => {
              e.preventDefault();
              refine(item.value);
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

export default List;

import { connectSearchBox } from 'react-instantsearch-dom';

import { useTranslation } from '@foundation/next';

import { isBlank } from '@foundation/lib/util';

const SearchBox = ({ currentRefinement, refine }) => {
  const { t } = useTranslation();

  const empty = isBlank(currentRefinement);
  return (
    <form
      noValidate
      action=""
      role="search"
      className="uk-search uk-search-default uk-width-1-1"
    >
      <a className="uk-search-icon" uk-icon="search" />
      <input
        className="uk-search-input"
        type="search"
        placeholder={t('common:search.placeholder')}
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      />
      <a
        onClick={e => {
          e.preventDefault();
          refine('');
        }}
        className="uk-search-icon uk-search-icon-flip uk-animation-fade uk-animation-fast"
        uk-icon="close"
        hidden={empty}
      />
    </form>
  );
};

export default connectSearchBox(SearchBox);

import { connectRefinementList } from 'react-instantsearch-dom';

import { withRefinementList } from '@app/hooks/algolia';

import RefinementList from '@shop/components/Algolia/Widgets/Common/List';

export default connectRefinementList(
  withRefinementList(RefinementList, { autoHide: true, alphabetical: true })
);

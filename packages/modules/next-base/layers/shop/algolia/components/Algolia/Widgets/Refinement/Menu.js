import { connectMenu } from 'react-instantsearch-dom';

import { withRefinementList } from '@app/hooks/algolia';

import Menu from '@shop/components/Algolia/Widgets/Common/List';

export default connectMenu(
  withRefinementList(Menu, { autoHide: true, alphabetical: true })
);

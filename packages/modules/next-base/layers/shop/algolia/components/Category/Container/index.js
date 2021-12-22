import { withAlgolia } from '@app/hooks/algolia';
import { withProductCategory } from '@app/hooks/shop';

import Container from '@shop/components/Page/Container';

import CategoryPage from '@shop/components/Category';
import CategoryContainerSeo from '@shop/components/Category/Container/Seo';

const CategoryContainer = props => {
  return (
    <Container {...props} inheritFragments="all">
      <CategoryPage {...props} />
      <CategoryContainerSeo {...props} />
    </Container>
  );
};

export default withAlgolia(withProductCategory(CategoryContainer), {
  pathname: '/shop/categories',
  onSearchStateChange: (state, global) => {
    if (global.has('clickedProduct')) global.unset('clickedProduct');
  },
});

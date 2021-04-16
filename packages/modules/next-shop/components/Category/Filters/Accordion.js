import CategoryFiltersCategory from '@shop/components/Category/Filters/Category';
import CategoryFiltersPrice from '@shop/components/Category/Filters/Price';
import CategoryFiltersBrand from '@shop/components/Category/Filters/Brand';
import CategoryFiltersReset from '@shop/components/Category/Filters/Reset';

const CategoryFiltersAccordion = () => (
  <div
    className="uk-margin-remove uk-flex-1 uk-overflow-auto"
    uk-accordion="multiple: true; targets: > .js-accordion-section"
    style={{
      flexBasis: 'auto',
    }}
  >
    {/* Categories */}
    <CategoryFiltersCategory />
    {/* Prices */}
    <CategoryFiltersPrice />
    {/* Properties */}
    <CategoryFiltersBrand />
    {/* Reset filters */}
    <CategoryFiltersReset />
  </div>
);

export default CategoryFiltersAccordion;

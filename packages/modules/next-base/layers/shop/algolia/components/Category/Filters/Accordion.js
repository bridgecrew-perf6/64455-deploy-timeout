import CategoryFiltersCategory from '@shop/components/Category/Filters/Category';
import CategoryFiltersRefinements from '@shop/components/Category/Filters/Refinements';
import CategoryFiltersReset from '@shop/components/Category/Filters/Reset';
import CategoryFiltersSearch from '@shop/components/Category/Filters/Search';

const CategoryFiltersAccordion = props => {
  return (
    <div
      className="uk-margin-remove uk-flex-1 uk-overflow-auto"
      uk-accordion="multiple: true; targets: > .js-accordion-section"
      style={{
        flexBasis: 'auto',
      }}
    >
      <CategoryFiltersCategory {...props} />
      <CategoryFiltersSearch />
      <CategoryFiltersRefinements {...props} />
      <CategoryFiltersReset clearsQuery />
    </div>
  );
};

export default CategoryFiltersAccordion;

import CategoryFiltersHeader from '@shop/components/Category/Filters/Header';
import CategoryFiltersAccordion from '@shop/components/Category/Filters/Accordion';

const CategoryFilters = () => (
  <div className="uk-offcanvas-bar uk-padding-remove">
    <div className="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
      {/* Header */}
      <CategoryFiltersHeader />
      {/* Accordion */}
      <CategoryFiltersAccordion />
    </div>
  </div>
);

export default CategoryFilters;

import CategoryFiltersHeader from '@shop/components/Category/Filters/Header';
import SubcategoryFiltersAccordion from '@shop/components/Subcategory/Filters/Accordion';

const SubcategoryFilters = () => (
  <div className="uk-offcanvas-bar uk-padding-remove">
    <div className="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
      {/* Header */}
      <CategoryFiltersHeader></CategoryFiltersHeader>
      {/* Accordion */}
      <SubcategoryFiltersAccordion></SubcategoryFiltersAccordion>
    </div>
  </div>
);

export default SubcategoryFilters;

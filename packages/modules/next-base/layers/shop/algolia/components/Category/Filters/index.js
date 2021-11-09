import CategoryFiltersHeader from '@shop/components/Category/Filters/Header';
import CategoryFiltersAccordion from '@shop/components/Category/Filters/Accordion';

const CategoryFilters = props => {
  return (
    <div
      className="uk-offcanvas-bar uk-padding-remove"
      uk-sticky="offset: 90; bottom: true; media: @m"
      data-part="filters"
    >
      <div className="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
        {/* Header */}
        <CategoryFiltersHeader {...props} />
        {/* Accordion */}
        <CategoryFiltersAccordion {...props} />
      </div>
    </div>
  );
};

export default CategoryFilters;

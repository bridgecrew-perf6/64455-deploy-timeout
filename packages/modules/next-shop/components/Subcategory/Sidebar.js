import SubcategoryFilters from '@shop/components/Subcategory/Filters';

const SubcategorySidebar = () => (
  <aside
    className="uk-width-1-4 tm-aside-column tm-filters"
    id="filters"
    uk-offcanvas="overlay: true; container: #__next;"
  >
    <SubcategoryFilters></SubcategoryFilters>
  </aside>
);

export default SubcategorySidebar;

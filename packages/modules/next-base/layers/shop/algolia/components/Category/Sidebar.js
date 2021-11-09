import CategoryFilters from '@shop/components/Category/Filters';

const CategorySidebar = props => (
  <aside
    className="uk-width-1-4 tm-aside-column tm-filters"
    id="filters"
    uk-offcanvas="overlay: true; container: #__next"
  >
    <CategoryFilters {...props} />
  </aside>
);

export default CategorySidebar;

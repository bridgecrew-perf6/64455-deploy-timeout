import CategoryFilters from '@shop/components/Category/Filters';

const CategorySidebar = () => (
  <aside
    className="uk-width-1-4 tm-aside-column tm-filters"
    id="filters"
    uk-offcanvas="overlay: true; container: false;"
  >
    <CategoryFilters />
  </aside>
);

export default CategorySidebar;

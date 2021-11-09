import { useMemo } from 'react';

import NavbarItem from '@app/components/Common/Navbar/Menu/Item';

const CategoryFiltersCategory = ({ category }) => {
  const [subcategories, current] = useMemo(() => {
    if (!category) {
      return [[], null];
    } else if (category.children.length > 0) {
      return [category.children, category];
    } else if (category.parent && Array.isArray(category.parent.children)) {
      return [category.parent.children, category.parent];
    } else {
      return [[], category];
    }
  }, [category]);

  return (
    <section className="uk-card-small uk-card-body">
      {current && <h4 className="uk-margin-small-bottom">{current.name}</h4>}
      <ul className="uk-nav uk-nav-default">
        {subcategories.map(node => (
          <NavbarItem
            key={node._key ?? node._id}
            levels={0}
            shallow
            partial
            {...node}
          />
        ))}
      </ul>
    </section>
  );
};

export default CategoryFiltersCategory;

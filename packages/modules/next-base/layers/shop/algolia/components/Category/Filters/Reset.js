import ClearRefinements from '@shop/components/Algolia/Widgets/ClearRefinements';

const filterRefinements = ({ attribute }) => attribute !== 'paths';

const CategoryFiltersReset = props => (
  <div className="uk-card-body">
    <ClearRefinements
      {...props}
      withIcon
      clearsQuery
      filter={filterRefinements}
    />
  </div>
);

export default CategoryFiltersReset;

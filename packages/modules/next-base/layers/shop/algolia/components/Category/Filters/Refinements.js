import { useToggleStates } from '@app/hooks/preferences';

import Refinement from '@shop/components/Algolia/Widgets/Refinement';

import wrapperComponent from '@shop/components/Category/Filters/Section';

const CategoryFiltersRefinements = ({ algolia, preferenceKey, ...props }) => {
  const [openRefinements] = useToggleStates(
    '.js-accordion-section',
    preferenceKey ?? 'openCategoryFilters'
  );

  return (
    <>
      {algolia.refinements.map(refinement => (
        <Refinement
          key={refinement._key}
          {...props}
          refinement={refinement}
          openRefinements={openRefinements}
          wrapperComponent={wrapperComponent}
        />
      ))}
    </>
  );
};

export default CategoryFiltersRefinements;

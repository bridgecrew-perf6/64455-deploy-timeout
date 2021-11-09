import { useMemo } from 'react';

import dynamic from 'next/dynamic';

const UnknownRefinement = ({ type }) => <div>Invalid type: {type}</div>;

// TODO:
//
// 'HierarchicalMenu',
// 'RangeInput',
// 'RatingMenu',

const mapping = {
  Menu: dynamic(() => import('./Menu')),
  MenuSelect: dynamic(() => import('./MenuSelect')),
  NumericMenu: dynamic(() => import('./NumericMenu')),
  RefinementList: dynamic(() => import('./List')),
  ToggleRefinement: dynamic(() => import('./ToggleRefinement')),
  CustomList: dynamic(() => import('./CustomList')),
};

const Refinement = ({ refinement, wrapperComponent, openRefinements = [] }) => {
  const [_, type] = refinement._type.split('.');

  const Component = useMemo(() => mapping[type] ?? UnknownRefinement, [type]);

  return (
    <Component
      type={type}
      {...refinement}
      wrapperComponent={wrapperComponent}
      openRefinements={openRefinements}
    />
  );
};

export default Refinement;

import { connectToggleRefinement } from 'react-instantsearch-dom';

import { withRefinementList } from '@app/hooks/algolia';

const ToggleRefinement = props => {
  const { label, value, refine, currentRefinement, refinementId } = props;

  return (
    <section data-id={refinementId} className="uk-card-body">
      <ul className="uk-list tm-scrollbox">
        <li
          onClick={e => {
            e.preventDefault();
            refine(currentRefinement ? '' : value);
          }}
        >
          <input
            className="tm-checkbox"
            id={`${refinementId}-${value}`}
            name={`${refinementId}-${value}`}
            checked={currentRefinement}
            type="checkbox"
            onChange={e => e.preventDefault()}
          />
          <label htmlFor={`${refinementId}-${value}`}>
            <span>{label}</span>
          </label>
        </li>
      </ul>
    </section>
  );
};

export default connectToggleRefinement(withRefinementList(ToggleRefinement));

import { connectNumericMenu } from 'react-instantsearch-dom';

import { useNumericRanges, withRefinementList } from '@app/hooks/algolia';

const NumericMenu = ({ WrapperComponent, ...props }) => {
  const { items: entries = [], refine, refinementId } = props;
  const items = useNumericRanges(entries, props);

  return (
    <WrapperComponent {...props}>
      <ul className="uk-list tm-scrollbox">
        {items.map((item, index) => (
          <li
            key={item.label}
            onClick={e => {
              e.preventDefault();
              refine(item.isRefined ? '' : item.value);
            }}
          >
            <input
              className="tm-checkbox"
              id={`${refinementId}-${index}`}
              name={refinementId}
              checked={item.isRefined}
              type="checkbox"
              onChange={e => e.preventDefault()}
            />
            <label htmlFor={`${refinementId}-${index}`}>
              <span>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </WrapperComponent>
  );
};

export default connectNumericMenu(withRefinementList(NumericMenu));

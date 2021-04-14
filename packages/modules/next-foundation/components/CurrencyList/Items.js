import { useCallback } from 'react';
import { useCurrency, useSettings } from '../../lib';

export default function CurrencyListItems({ activeClassName }) {
  const currency = useCurrency();
  const { setCurrency } = useSettings();

  const className = activeClassName ?? 'uk-active';

  const onClick = useCallback(
    e => {
      e.preventDefault();
      setCurrency(e.target.dataset.code);
    },
    [setCurrency]
  );

  return (
    <>
      {currency.currencies.map(({ code, active, name }) => (
        <li key={code} className={active ? className : ''}>
          <a href="#" data-code={code} onClick={onClick}>
            {name}
          </a>
        </li>
      ))}
    </>
  );
}

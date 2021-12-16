import { useCallback } from 'react';
import { useCurrency, useSettings } from '../../lib';

export default function CurrencySelect({ className, withCode, withChevron }) {
  const currency = useCurrency();
  const { setCurrency } = useSettings();

  const onChange = useCallback(
    e => {
      e.preventDefault();
      setCurrency(e.target.value);
    },
    [setCurrency]
  );

  return (
    <div className={className} uk-form-custom="target: false">
      <select value={currency.code} onChange={onChange}>
        {currency.currencies.map(({ code, name }) => (
          <option key={code} value={code}>
            {withCode && `${code} - `} {name}
          </option>
        ))}
      </select>
      <span>{currency.code}</span>
      {withChevron && (
        <span
          className="uk-margin-xsmall-left"
          uk-icon="icon: chevron-down; ratio: .75;"
        />
      )}
    </div>
  );
}

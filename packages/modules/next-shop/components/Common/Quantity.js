import { useState, useCallback, useEffect } from 'react';

import { isBlank } from '@foundation/lib/util';

const Quantity = ({
  value,
  onChange,
  min = 1,
  max = -1,
  resetTo = 0,
  buttons = false,
  disabled = false,
  readOnly = false,
  target = 'quantity',
  inputProps = {},
}) => {
  const [count, setCount] = useState(typeof value === 'number' ? value : 1);

  const clamp = useCallback(
    value =>
      Math.max(
        Math.max(0, min),
        max > 0 && value > max ? (resetTo > 0 ? resetTo : max) : value
      ),
    [max, min, resetTo]
  );

  const increment = useCallback(() => setCount(count => clamp(count + 1)), [
    clamp,
  ]);

  const decrement = useCallback(() => setCount(count => clamp(count - 1)), [
    clamp,
  ]);

  const update = useCallback(
    e => {
      if (isBlank(e.target.value) && e.type !== 'blur') {
        setCount('');
      } else if (!(String(e.target.value).length > 2)) {
        const int = parseInt(e.target.value, 10);
        setCount(clamp(int > 0 ? int : 1));
      }
    },
    [clamp]
  );

  useEffect(() => {
    if (typeof onChange === 'function')
      onChange(target, typeof count === 'number' ? count : 0);
  }, [target, count, onChange]);

  useEffect(() => {
    if (typeof value === 'number') setCount(value);
  }, [value]);

  return (
    <div
      className={`tm-quantity-input tm-quantity-input-${
        buttons ? 'buttons' : 'default'
      }`}
    >
      {buttons && <a uk-icon="icon: minus; ratio: .75" onClick={decrement} />}
      <input
        className="uk-input"
        id={target}
        type="number"
        step="1"
        value={count}
        onChange={update}
        onBlur={update}
        disabled={disabled}
        readOnly={readOnly}
        {...inputProps}
      />
      {buttons && <a uk-icon="icon: plus; ratio: .75" onClick={increment} />}
    </div>
  );
};

export default Quantity;

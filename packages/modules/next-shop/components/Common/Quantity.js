import { useState, useCallback, useEffect } from 'react';

const Quantity = ({ target, value, onChange }) => {
  const [count, setCount] = useState(typeof value === 'number' ? value : 1);

  const increment = useCallback(() => setCount(count => count + 1), []);
  const decrement = useCallback(
    () => setCount(count => Math.max(0, count - 1)),
    []
  );

  useEffect(() => {
    if (typeof onChange === 'function') onChange(target, count);
  }, [target, count, onChange]);

  return (
    <div>
      <a uk-icon="icon: minus; ratio: .75" onClick={decrement} />
      <input
        className="uk-input tm-quantity-input"
        id={target}
        type="text"
        maxLength={3}
        value={count}
        onChange={e => setCount(e.value)}
      />
      <a uk-icon="icon: plus; ratio: .75" onClick={increment} />
    </div>
  );
};

export default Quantity;

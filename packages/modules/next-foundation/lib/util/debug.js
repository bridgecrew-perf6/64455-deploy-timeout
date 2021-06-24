/* eslint-disable no-console */

import { partition, fromPairs } from 'lodash-es';

export function debug(props, parentKey) {
  const [scalars, objects] = partition(
    Object.entries(props ?? {}),
    ([_, value]) => {
      const type = Array.isArray(value) ? 'array' : typeof value;
      return type === 'array' || type === 'object';
    }
  );

  if (!parentKey) console.log('-------------------------');

  console.table
    ? console.table(fromPairs(objects))
    : console.log(fromPairs(objects));

  scalars.forEach(([key, value]) => {
    const type = Array.isArray(value) ? 'array' : typeof value;
    if ((type === 'array' || type === 'object') && type !== null) {
      const localKey = parentKey ? `${parentKey}.${key}` : `${key}`;
      console.log(`${localKey}:`);
      debug(value, localKey);
    }
  });
}

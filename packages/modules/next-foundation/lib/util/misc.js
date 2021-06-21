import { get, isEmpty, isNumber, isNaN, omitBy, isBoolean } from 'lodash-es';

export function isBlank(value) {
  return (
    (isEmpty(value) && !isNumber(value) && !isBoolean(value)) || isNaN(value)
  );
}

export function titleizeString(camelCase) {
  return camelCase
    .replace(/([A-Z0-9])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())
    .trim();
}

export function mergeObjects(...objects) {
  return objects.reduce((memo, obj) => {
    const data = omitBy(obj, value => isBlank(value));
    return { ...memo, ...data };
  }, {});
}

export function lookup(obj, ...keys) {
  let value;
  keys.find(key => {
    const v = get(obj, key);
    const valid = !isBlank(v);
    if (valid) value = v;
    return valid;
  });
  return value;
}

export function detect(items, fn) {
  let value;
  items.find((item, index) => {
    const match = fn(item, index);
    if (typeof match === 'boolean' && value) {
      value = item;
    } else if (match !== undefined) {
      value = match;
    }
    return match;
  });
  return value;
}

export function sliceEnd(array, count = 1) {
  return array.slice(Math.max(array.length - count, 0));
}

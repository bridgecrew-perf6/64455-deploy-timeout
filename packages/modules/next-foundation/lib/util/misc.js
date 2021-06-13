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

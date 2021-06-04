import { isEmpty, isNumber, isNaN, omitBy } from 'lodash-es';

export function isBlank(value) {
  return (isEmpty(value) && !isNumber(value)) || isNaN(value);
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

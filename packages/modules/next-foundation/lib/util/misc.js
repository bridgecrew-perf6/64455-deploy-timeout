export { default as defaults } from 'lodash.defaults';
export { default as get } from 'lodash.get';
export { default as set } from 'lodash.set';
export { default as pick } from 'lodash.pick';
export { default as pickBy } from 'lodash.pickby';
export { default as omit } from 'lodash.omit';
export { default as omitBy } from 'lodash.omitby';

export function titleizeString(camelCase) {
  return camelCase
    .replace(/([A-Z0-9])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())
    .trim();
}

/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable func-names */

import traverse from 'traverse';

export * as tree from 'tree-walk-util';

export { default as traverse } from 'traverse';

export const processResults = data => {
  return traverse(data).map(function(x) {
    if (this.circular || x === null) {
      this.remove();
    } else if (
      x &&
      typeof x === 'object' &&
      x._type === 'slug' &&
      typeof x.current === 'string'
    ) {
      this.update(x.current);
    }
  });
};

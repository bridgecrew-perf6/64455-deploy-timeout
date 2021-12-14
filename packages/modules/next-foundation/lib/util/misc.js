import {
  get,
  set,
  has,
  unset,
  isEmpty,
  isNumber,
  isDate,
  isNaN,
  omitBy,
  isBoolean,
  pickBy,
  identity,
  trim,
  compact,
} from 'lodash-es';

export function isBlank(value) {
  return (
    (isEmpty(value) && !isNumber(value) && !isBoolean(value)) || isNaN(value)
  );
}

export function formatDate(value, options = {}) {
  const { locale = 'en-GB', format } = options;
  const date = parseDate(value);
  if (isValidDate(date)) {
    return date.toLocaleDateString(
      locale,
      format ?? {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  }
}

export function parseDate(str) {
  if (isDate(str)) return str;
  try {
    const date = new Date(str);
    if (isValidDate(date)) return date;
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export function titleizeString(camelCase) {
  return camelCase
    .replace(/([A-Z0-9])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())
    .trim();
}

export function segmentize(str, delimiter = '/') {
  return compact(trim(String(str || ''), delimiter).split(delimiter));
}

export function mergeObjects(...objects) {
  return objects.reduce((memo, obj) => {
    const data = omitBy(obj, value => isBlank(value));
    return { ...memo, ...data };
  }, {});
}

export function compactObject(obj) {
  return pickBy(obj, identity);
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

export function blocksToText(blocks, opts = {}) {
  const options = { nonTextBehavior: 'remove', newlines: true, ...opts };
  if (typeof blocks === 'string') {
    return blocks;
  } else if (Array.isArray(blocks)) {
    return blocks
      .map(block => {
        if (
          !(block._type === 'block' || block?._type.indexOf('block.') === 0) ||
          !block.children
        ) {
          return options.nonTextBehavior === 'remove'
            ? ''
            : `[${block._type} block]`;
        }
        return block.children.map(child => child.text).join('');
      })
      .join(options.newlines ? '\n\n' : ' ');
  } else {
    return '';
  }
}

export function wrapStateObject(data, setData, defaults = {}) {
  return {
    data,
    setData,
    get: (key, defaultValue) => {
      return typeof key === 'undefined' ? data : get(data, key, defaultValue);
    },
    set: (key, value) => setData(state => ({ ...set(state, key, value) })),
    has: key => has(data, key),
    unset: key => setData(state => (unset(state, key) ? { ...state } : state)),
    reset: (obj = defaults) => setData(obj),
    merge: obj => {
      if (typeof obj === 'function') {
        return setData(obj);
      } else {
        return setData(state => ({ ...state, ...obj }));
      }
    },
  };
}

export function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'number') {
    return value === 1;
  } else {
    return ['1', 'true', 't', 'yes', 'y'].includes(String(value).toLowerCase());
  }
}

export function sortObjectsByIds(idName, ids, objects = [], strict = false) {
  ids = ids.map(String);

  let indexOf = x => ids.indexOf(String(x[idName]));
  let heading = [];
  let tailing = [];

  objects.forEach(x => {
    if (typeof x === 'object') {
      let idx = indexOf(x);
      if (strict && idx === -1) return;
      idx === -1 ? tailing.push(x) : heading.push(x);
    }
  });

  heading.sort((x, y) => {
    let a = indexOf(x);
    let b = indexOf(y);
    if (a === -1 || b === -1) return 1; // last
    if (a === b) return 0;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  return heading.concat(tailing);
}

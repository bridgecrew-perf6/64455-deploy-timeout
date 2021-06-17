import { flatten } from 'lodash-es';
import { isBlank } from './misc';

const URL_REGEXP = /^([^:/?#]+:)?(?:\/\/([^/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/;

const ERROR_PAGE_REGEXP = /^\/(404|500|_error)/;

const PORT_MAPPING = { 'http:': 80, 'https:': 443 };

export function isErrorPage(pathname) {
  return ERROR_PAGE_REGEXP.test(String(pathname || ''));
}

export function isUrl(url) {
  return URL_REGEXP.test(String(url || ''));
}

export function joinUrl(...parts) {
  return `/${flatten(
    parts.map(part => {
      return part.split('/');
    })
  )
    .filter(part => !isBlank(part))
    .join('/')}`;
}

export function isExternalUrl(url, strict = false) {
  const match = String(url || '').match(URL_REGEXP) || [];
  if (strict && typeof window !== 'undefined') {
    const { location } = window;
    const replace = new RegExp(`:(${PORT_MAPPING[location.protocol]})?$`);
    if (
      typeof match[1] === 'string' &&
      match[1].length > 0 &&
      match[1].toLowerCase() !== location.protocol
    ) {
      return true;
    }
    if (
      typeof match[2] === 'string' &&
      match[2].length > 0 &&
      match[2].replace(replace, '') !== location.host
    ) {
      return true;
    }
  } else if (typeof match[1] === 'string' && match[1].length > 0) {
    return true;
  }
  return false;
}

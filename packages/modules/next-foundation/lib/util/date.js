const defaultDateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const defaultTimeZone =
  process.env.NEXT_PUBLIC_TIMEZONE ?? 'Europe/Brussels';

export function formatDate(value, options = {}) {
  const { locale = 'en-GB', format = {} } = options;
  const { timeZone = defaultTimeZone } = format;
  const date = parseDate(value);
  const opts = isEmptyObject(format) ? defaultDateFormat : format;
  opts.timeZone = timeZone;
  if (isValidDate(date)) {
    return date.toLocaleDateString(locale, opts);
  }
}

export function parseDate(str) {
  if (isValidDate(str)) return str;
  try {
    const date = new Date(str);
    if (isValidDate(date)) return date;
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d);
}

function isEmptyObject(obj) {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

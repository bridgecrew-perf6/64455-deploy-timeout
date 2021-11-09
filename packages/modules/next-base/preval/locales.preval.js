import preval from 'next-plugin-preval';

import i18n from '@root/i18n';

async function getData() {
  return (i18n?.locales ?? []).reduce((memo, lc) => {
    memo[lc] = memo[lc] || { weekdays: {} };
    memo[lc].weekdays.long = daysForLocale(lc);
    memo[lc].weekdays.short = daysForLocale(lc, 'short');
    return memo;
  }, {});
}

export default preval(getData());

function daysForLocale(lc = i18n.defaultLocale, weekday = 'long') {
  const { format } = new Intl.DateTimeFormat(lc, { weekday });
  return [...Array(7).keys()].map(day =>
    format(new Date(Date.UTC(2021, 4, 2 + day)))
  );
}

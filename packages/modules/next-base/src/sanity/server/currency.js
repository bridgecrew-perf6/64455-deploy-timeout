/* eslint-disable no-console */

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import { set, lookup, isBlank } from '@foundation/server';

import { currencySettingsPipeline } from '@app/sanity/queries';

import { defaultLocale } from '@root/i18n';

const sanityClient = getClient(true);

const apiKey = process.env.CURRENCY_API_KEY;

export async function fetchCurrencies() {
  const data = await sanityClient.fetch(currencySettingsPipeline);
  const normalized = normalizeCurrencies(data);
  if (!isBlank(apiKey)) {
    const rates = await fetchCurrencyRates(
      normalized.default,
      Object.keys(normalized.currencies)
    );
    data.currencies.forEach(({ code }) => {
      if (typeof rates[code] === 'number') {
        set(normalized, ['currencies', code, 'rate'], rates[code]);
      }
    });
  }
  return normalized;
}

export async function fetchCurrencyRates(base, currencyCodes = []) {
  let url = `http://data.fixer.io/api/latest?access_key=${apiKey}&base=${base}`;
  if (currencyCodes.length > 0) url += `&symbols=${currencyCodes.join(',')}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => response?.rates ?? {})
    .catch(e => {
      console.log('Failed to fetch currencies');
      console.log(e.message);
      return {};
    });
}

export function normalizeCurrencies(data) {
  return {
    default: data.currency.code,
    currencies: data.currencies.reduce((memo, currency) => {
      memo[currency.code] = normalizeCurrency(currency);
      return memo;
    }, {}),
  };
}

export function normalizeCurrency(currency, locale = defaultLocale) {
  const name = lookup(
    currency,
    ['i18n', locale, 'name'],
    ['i18n', defaultLocale, 'name']
  );
  const { rate } = currency;
  return { name, rate, i18n: currency.i18n ?? {} };
}

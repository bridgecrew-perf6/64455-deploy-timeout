import { useMemo } from 'react';
import { useSettings } from './settings';
import Currency from './util/currency';

export { Currency };

export function useCurrency(currency, locale) {
  const settings = useSettings();
  currency = currency || settings.currency;
  locale = locale || settings.locale;
  return useMemo(() => {
    return Currency.use(currency, { locale, convert: true });
  }, [currency, locale]);
}

import { useMemo } from 'react';
import { useSettings } from './settings';
import Currency from './util/currency';

export { Currency };

export function useCurrency(currency, options = {}) {
  const settings = useSettings();
  currency = currency || settings.currency;
  const locale = options.locale || settings.locale;
  return useMemo(() => {
    return Currency.use(currency, { locale, convert: true, ...options });
  }, [currency, locale, options]);
}

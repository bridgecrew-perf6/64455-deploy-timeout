import { Currency } from '@mono/lib/currency';
import currencyConfig from '@app/config/currency';

export { default as useTranslation } from 'next-translate/useTranslation';

export * from '@mono/lib/baobab';
export * from '@mono/lib/currency';
export * from '@mono/lib/settings';
export * from '@mono/lib/site';

Currency.setDefault(currencyConfig.default || 'EUR');

Currency.setCurrencies(currencyConfig.currencies);

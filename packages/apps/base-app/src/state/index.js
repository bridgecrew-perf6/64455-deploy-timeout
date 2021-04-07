import { tree } from 'lib/baobab';
import { Currency } from 'lib/currency';

import currencyConfig from 'config/currency';
import initialState from 'config/state';

export { default as useTranslation } from 'next-translate/useTranslation';

export * from 'lib/baobab';
export * from 'lib/currency';
export * from 'lib/settings';
export * from 'lib/site';

Currency.setDefault(currencyConfig.default || 'EUR');

Currency.setCurrencies(currencyConfig.currencies);

tree.merge(initialState);
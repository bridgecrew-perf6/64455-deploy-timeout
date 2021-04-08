import { tree } from '@atelierfabien/mono-next/lib/baobab';
import { Currency } from '@atelierfabien/mono-next/lib/currency';

import currencyConfig from '@app/config/currency';
import initialState from '@app/config/state';

export { default as useTranslation } from 'next-translate/useTranslation';

export * from '@atelierfabien/mono-next/lib/baobab';
export * from '@atelierfabien/mono-next/lib/currency';
export * from '@atelierfabien/mono-next/lib/settings';
export * from '@atelierfabien/mono-next/lib/site';

Currency.setDefault(currencyConfig.default || 'EUR');

Currency.setCurrencies(currencyConfig.currencies);

tree.merge(initialState);
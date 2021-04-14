import currencyConfig from '@app/config/currency';
import { Currency } from './lib';

export * from './lib';
export * from './lib/util';

Currency.setDefault(currencyConfig.default || 'EUR');
Currency.setCurrencies(currencyConfig.currencies);

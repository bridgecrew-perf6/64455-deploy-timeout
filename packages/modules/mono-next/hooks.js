export * from './lib';

import { Currency } from './lib';
import currencyConfig from '@app/config/currency';

Currency.setDefault(currencyConfig.default || 'EUR');
Currency.setCurrencies(currencyConfig.currencies);

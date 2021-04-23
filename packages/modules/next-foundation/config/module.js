import currencyConfig from '@app/config/currency';
import { Currency } from '../lib';

Currency.setDefault(currencyConfig.default || 'EUR');
Currency.setCurrencies(currencyConfig.currencies);

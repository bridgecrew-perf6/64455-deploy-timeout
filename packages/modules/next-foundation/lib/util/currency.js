import Dinero from 'dinero.js';

import { lookup } from '.';

const DEFAULT_CURRENCY = 'EUR';

const DEFAULT_CURRENCIES = {
  EUR: { name: 'Euro', rate: 1 }, // optional keys: precision, locale
};

const Currency = (options = {}) => {
  const { cents, unit, ...opts } = options;
  let precision = Dinero.defaultPrecision ?? 2;
  if (typeof unit === 'number' || typeof unit === 'string') {
    precision = typeof opts.precision === 'number' ? opts.precision : precision;
    const amount = floatMultiply(parseFloat(unit), 10 ** precision);
    return Dinero({ ...opts, amount, precision });
  }
  if (typeof cents === 'number' || typeof cents === 'string') {
    return Dinero({ ...opts, amount: parseInt(cents, 10), precision });
  }
  return Dinero(opts);
};

Currency.configure = (config) => {
  if (typeof config === 'function') {
    config(Dinero);
  } else if (typeof config === 'object') {
    Object.assign(Dinero, config);
  }
};

Currency.from = (from, options = {}) => {
  if (typeof from === 'number' || typeof from === 'string') {
    return Currency({ ...options, unit: from });
  }
  if (typeof from === 'object') {
    return Currency({ ...options, ...from });
  }
  return Currency(options);
};

Currency.convert = (money, currency, rate) => {
  if (typeof money === 'object' && typeof money.getCurrency === 'function') {
    currency = currency || money.getCurrency();
    if (money.getCurrency() === currency) return money;
    rate = typeof rate === 'number' ? rate : Currency.getRate(currency);
    const converted = money.multiply(rate);
    return Currency({ amount: converted.getAmount(), currency });
  }
  return Currency();
};

Currency.use = (currency, options = {}) => {
  // eslint-disable-next-line prefer-const
  let { locale, convert: autoConvert } = {
    locale: Currency.getLocale(),
    ...options,
  };

  const defaultCurrency = Currency.getCurrency();
  const meta = Currency.getCurrency(currency) ?? defaultCurrency;
  const precision = meta.precision ?? Dinero.defaultPrecision ?? 2;

  currency = autoConvert ? defaultCurrency.code : meta.code;
  locale = meta.locale || locale; // force locale

  const info = localizeCurrency(locale, meta);

  const create = (from, options = {}) => {
    const { to, rate, ...opts } = options;
    const defaults = { currency, precision, ...opts };
    const money = Currency.from(from, defaults);
    if (typeof to === 'string') {
      return Currency.convert(money, to, rate);
    }
    if (autoConvert && meta.code !== currency) {
      return Currency.convert(money, meta.code, rate);
    }
    return money;
  };

  const convert = (amount, to, options = {}) => {
    return create(amount, { ...options, to }).toUnit();
  };

  const format = (amount, options = {}) => {
    const { format, roundingMode, locale: lc, ...opts } = options;
    return create(amount, opts)
      .setLocale(lc || locale)
      .toFormat(format, roundingMode);
  };

  const currencies = Currency.getCurrencies(true).map((c) => ({
    ...localizeCurrency(locale, c),
    active: c.code === meta.code,
  }));

  return { ...info, locale, create, convert, format, currencies };
};

Currency.getRate = (currency = Dinero.defaultCurrency) => {
  return Currency.getCurrency(currency)?.rate ?? 1;
};

Currency.getDefaultCode = () => {
  return Dinero.defaultCurrency;
};

Currency.getDefault = () => {
  return Currency.getCurrency();
};

Currency.setDefault = (currency) => {
  Dinero.defaultCurrency = currency ?? DEFAULT_CURRENCY;
};

Currency.getLocale = () => {
  return Dinero.globalLocale || 'en-GB';
};

Currency.setLocale = (locale) => {
  Dinero.globalLocale = locale;
};

// eslint-disable-next-line consistent-return
Currency.getCurrency = (currency = Dinero.defaultCurrency) => {
  const currencies = Currency.getCurrencies();
  const meta = currencies[currency];
  if (meta) {
    const precision =
      typeof meta.precision === 'number'
        ? meta.precision
        : Dinero.defaultPrecision ?? 2;
    return { code: currency, ...meta, precision };
  }
};

Currency.isCurrency = (currency) => {
  const currencies = Currency.getCurrencies();
  return typeof currencies[currency] === 'object';
};

Currency.getCurrencies = (asArray = false) => {
  const currencies = { ...DEFAULT_CURRENCIES, ...Currency.rates };
  if (asArray) {
    return Object.entries(currencies).map(([code, v]) => ({ code, ...v }));
  }
  return currencies;
};

Currency.setCurrencies = (rates = {}) => {
  Currency.rates = { ...rates };
  Dinero.globalExchangeRatesApi = {
    endpoint: Promise.resolve(() => Currency.rates),
    propertyPath: '{{to}}.rate',
  };
};

export default Currency;

// Helpers

function localizeCurrency(locale, currency) {
  const name = lookup(currency, ['i18n', locale, 'name']) ?? currency.name;
  return { ...currency, name };
}

function floatMultiply(a, b) {
  const getFactor = (number) => 10 ** countFractionDigits(number);
  const factor = Math.max(getFactor(a), getFactor(b));
  return (Math.round(a * factor) * Math.round(b * factor)) / (factor * factor);
}

function countFractionDigits(number = 0) {
  const stringRepresentation = number.toString();
  if (stringRepresentation.indexOf('e-') > 0) {
    return parseInt(stringRepresentation.split('e-')[1], 10);
  }
  const fractionDigits = stringRepresentation.split('.')[1];
  return fractionDigits ? fractionDigits.length : 0;
}

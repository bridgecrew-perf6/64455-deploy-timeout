/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useCookie, NextCookieProvider } from 'next-universal-cookie';
import { useContextProvider } from './context';
import { usePrevious } from './hooks';
import { useRouter } from './navigation';
import Currency from './util/currency';

const Settings = {}; // singleton by ref

const SettingsContext = React.createContext(Settings);

const methods = {
  default: useSetting,
  cookie: useCookieSetting,
};

function setting(key, options = {}) {
  return methods[options.disabled ? 'default' : 'cookie'](key, options);
}

function wrapObject(object, setValue, isValid) {
  object = typeof object === 'object' ? object : {};
  return {
    get(key) {
      if (arguments.length) {
        return object[key];
      }
      return object;
    },
    has(key) {
      return typeof object[key] !== 'undefined';
    },
    set(key, value) {
      if (!isValid(value)) return;
      object[key] = value;
      setValue({ ...object });
    },
    unset(key) {
      delete object[key];
      setValue({ ...object });
    },
    toggle(key, unset = false) {
      if (typeof unset === 'object') {
        this.set(key, object[key] === unset.on ? unset.off : unset.on);
      } else if (unset) {
        object[key] ? this.unset(key) : this.set(key, true);
      } else {
        this.set(key, !object[key]);
      }
      return this.get(key);
    },
    reset() {
      setValue({});
    },
  };
}

export function useSettingsContext(options = {}) {
  const defaults = { ...options.defaults };
  const router = useRouter();

  const defaultLocale =
    router.locale ?? router.defaultLocale ?? defaults.locale;

  // Specific settings

  const [locale, setLocale, isValidLocale, previousLocale] = setting('locale', {
    value: router.locale,
    valid: router.locales,
    default: defaultLocale,
    ...options.locale,
  });

  const [currency, setCurrency, isValidCurrency] = setting('currency', {
    valid: Currency.isCurrency,
    default: Currency.getDefaultCode ?? defaults.currency,
    ...options.currency,
  });

  // Generic settings

  const [settings, setSettings] = setting('settings', {
    ...options.settings,
    transform: wrapObject,
    default: {},
    json: true,
  });

  // Change route when locale changes

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      previousLocale &&
      locale &&
      router.locale &&
      locale !== router.locale
    ) {
      router.push(
        {
          pathname: router.pathname,
          query: router.query,
        },
        router.asPath,
        { locale, scroll: false }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  Object.assign(Settings, {
    locale: router.locale ?? locale,
    setLocale,
    isValidLocale,
    currency,
    setCurrency,
    isValidCurrency,
    settings,
    setSettings,
  });

  const Context = useContextProvider(SettingsContext, Settings);

  return useMemo(() => {
    return ({ cookie, children }) => {
      return (
        <NextCookieProvider cookie={cookie}>
          <Context>{children}</Context>
        </NextCookieProvider>
      );
    };
  }, []);
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSetting(key, options = {}) {
  const [current, _setValue] = useState(() => {
    if (typeof options.initial === 'function') {
      return options.initial(key) ?? getDefault();
    }
    return getDefault();
  });

  let previous = usePrevious(current);

  function getDefault() {
    if (typeof options.default === 'function') {
      return options.default(key);
    }
    if (typeof options.default !== 'undefined') {
      return options.default;
    }
    return undefined;
  }

  function setValue(value) {
    if (isValid(value)) {
      _setValue(value);
    } else if (isValid(previous)) {
      _setValue(previous);
    } else {
      _setValue(getDefault());
    }
  }

  function isValid(value) {
    if (typeof options.valid === 'function') {
      return options.valid(value);
    }
    if (Array.isArray(options.valid) && options.valid.length > 0) {
      return options.valid.includes(value);
    }
    return true;
  }

  return useMemo(() => {
    const defaultValue = getDefault();
    const previousValue = previous;
    previous = previous ?? defaultValue;

    const initial = typeof previous === 'undefined';
    let curr = current;
    let reset = false;

    if (typeof options.get === 'function') {
      curr = options.get(curr, previous, initial);
    } else if (typeof options.check === 'function') {
      reset = !initial && options.check(curr, previous, defaultValue);
    } else if (options.resetDefault && curr === defaultValue) {
      reset = !initial;
    }

    if (isValid(curr) && !reset) {
      if (curr !== previous && typeof options.set === 'function') {
        curr = options.set(curr, previous, initial) ?? curr;
      }
    } else if (typeof options.unset === 'function') {
      curr = options.unset(curr, previous, initial) ?? curr;
    }

    if (typeof options.transform === 'function') {
      curr = options.transform(curr, setValue, isValid) ?? curr;
    }

    return [curr, setValue, isValid, previousValue];
  }, [current]);
}

export function useCookieSetting(key, options = {}) {
  const maxAge = 86400 * 365; // a year from now
  const cookieName = options.cookieName || `NEXT_${key.toUpperCase()}`;
  const cookieOpts = { path: '/', maxAge, ...options.cookieOptions };
  const [cookies, setCookie, removeCookie] = useCookie([cookieName]);

  function readValue() {
    const value = cookies[cookieName];
    if (typeof options.read === 'function') {
      return options.read(value);
    }
    if (options.json) {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e.message);
        }
      } else if (typeof value === 'object') {
        return value;
      }
    }
    return value;
  }

  function coerceValue(value) {
    if (typeof options.coerce === 'function') {
      return options.coerce(value);
    }
    if (options.json && typeof value !== 'undefined') {
      return JSON.stringify(value);
    }
    return value;
  }

  const [value, setValue, isValid, previousValue] = useSetting(key, {
    initial: options.initial ?? (options.initialRead ? readValue : () => {}),
    set: (current, previous, initial) => {
      if (!initial && typeof current === 'undefined') {
        removeCookie(cookieName);
      } else if (!initial) {
        setCookie(cookieName, coerceValue(current), cookieOpts);
      }
    },
    unset: (current, previous, initial) => {
      if (!initial) removeCookie(cookieName);
    },
    ...options,
  });

  useEffect(() => {
    setValue(options.value ?? readValue(), true);
  }, [key, cookieName]);

  return [value, setValue, isValid, previousValue];
}

export function useSettingEffect(key, fn) {
  const { settings } = useSettings();

  useEffect(() => {
    const enabled = settings.get(key);
    if (typeof enabled === 'boolean') {
      fn(enabled, false, settings);
    } else if (enabled === null) {
      fn(Boolean(enabled), true, settings);
    } else {
      settings.set(key, null);
    }
  }, [fn, key, settings]);

  return settings;
}

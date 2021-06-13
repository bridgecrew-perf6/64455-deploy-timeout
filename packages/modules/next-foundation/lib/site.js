import config from '@app/config/app';
import site from '@app/config/site';

import { useTranslated } from './translation';
import { get } from './util';

export function useSite(getter = false) {
  const data = site;
  if (getter) {
    return (...args) => {
      if (args.length === 0) {
        return data;
      } else {
        return get(data, ...args);
      }
    };
  } else {
    return data;
  }
}

export function useConfig(section, forceLocale) {
  const data = section ? get(config, section, {}) : config;
  return useTranslated(data, forceLocale);
}

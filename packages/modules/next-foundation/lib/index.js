import getT from 'next-translate/getT';
import useT from 'next-translate/useTranslation';

import i18nConfig from '@root/i18n';

export * from './analytics';
export * from './baobab';
export * from './context';
export * from './currency';
export * from './constants';
export * from './forms';
export * from './hocs';
export * from './hooks';
export * from './googlemaps';
export * from './layout';
export * from './navigation';
export * from './page';
export * from './props';
export * from './query';
export * from './router';
export * from './settings';
export * from './seo';
export * from './site';
export * from './translation';
export * from './uikit';

const ensureConfig = () => {
  const g = typeof window === 'undefined' ? global : window;
  g.i18nConfig = g.i18nConfig ?? i18nConfig;
};

export const getTranslation = (...args) => {
  ensureConfig();
  return getT(...args);
};

export const useTranslation = (...args) => {
  ensureConfig();
  return useT(...args);
};

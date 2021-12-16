import getT from 'next-translate/getT';
import useT from 'next-translate/useTranslation';

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

export const getTranslation = (...args) => getT(...args);
export const useTranslation = (...args) => useT(...args);

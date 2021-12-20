import groq from 'groq';
import config from './lib/config';

export * from './lib';
export { config, groq };
export { deduceItem } from './lib/util';

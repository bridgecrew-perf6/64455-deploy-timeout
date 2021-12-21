import configure from './src/lib/configure';
import SanityCredentials from './src/lib/credentials';
import SanityAdapter from './src/lib/adapter';
import * as queries from './src/lib/queries';

export * from './src/lib/email';
export * from './src/lib/handlers';

export { SanityCredentials, SanityAdapter, configure, queries };

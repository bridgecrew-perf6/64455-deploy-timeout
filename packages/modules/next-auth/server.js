import configure from './src/lib/configure';
import SanityCredentials from './src/lib/credentials';
import SanityAdapter from './src/lib/adapter';
import * as queries from './src/lib/queries';

export { default as NextAuth } from 'next-auth';
export { default as Providers } from 'next-auth/providers';

export * from './src/lib/user';
export * from './src/lib/email';
export * from './src/lib/handlers';

export { SanityCredentials, SanityAdapter, configure, queries };

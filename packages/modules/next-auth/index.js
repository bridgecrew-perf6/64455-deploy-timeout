export { default as NextAuth } from 'next-auth';
export { default as Providers } from 'next-auth/providers';
export * from 'next-auth/client';

export * from './src/lib/email';
export * from './src/lib/handlers';

import configure from './src/lib/configure';
import SanityCredentials from './src/lib/credentials';
import SanityAdapter from './src/lib/adapter';
import queries from './src/lib/queries';

export { SanityCredentials, SanityAdapter, configure, queries };

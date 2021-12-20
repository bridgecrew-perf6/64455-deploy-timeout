import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import configure from './src/lib/configure';
import SanityCredentials from './src/lib/credentials';
import SanityAdapter from './src/lib/adapter';
import * as queries from './src/lib/queries';

export * from './src/lib/email';
export * from './src/lib/handlers';

export {
  NextAuth,
  Providers,
  SanityCredentials,
  SanityAdapter,
  configure,
  queries,
};

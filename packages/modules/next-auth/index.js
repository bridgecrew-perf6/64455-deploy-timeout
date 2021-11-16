export { default as NextAuth } from 'next-auth';
export { default as Providers } from 'next-auth/providers';
export * from 'next-auth/client';

export { default as SanityAdapter } from './src/lib/adapter';

export * from 'next-auth-sanity/dist/credentials';

import * as queries from 'next-auth-sanity/dist/queries';
import * as schemas from 'next-auth-sanity/dist/schemas';

queries.getVerificationRequestQuery = `*[_type == 'verification-request' && identifier == $identifier && _id == $id][0]`;

export { queries, schemas };

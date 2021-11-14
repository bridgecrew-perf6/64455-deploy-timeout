import {
  NextAuth,
  SanityAdapter,
  SanityCredentials,
} from '@atelierfabien/next-auth';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

const client = getClient(true);

const options = {
  providers: [SanityCredentials(client)],
  session: {
    jwt: true,
  },
  adapter: SanityAdapter(client),
};

export default (req, res) => NextAuth(req, res, options);

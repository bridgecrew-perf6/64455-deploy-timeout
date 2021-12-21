import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import SanityCredentials from './src/lib/credentials';
import SanityAdapter from './src/lib/adapter';

export { NextAuth, Providers, SanityCredentials, SanityAdapter };

// See: https://next-auth.js.org/v3/configuration/options

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import {
  Providers,
  SanityAdapter,
  SanityCredentials,
} from '@atelierfabien/next-auth';

const client = getClient(true);

export default {
  secret: process.env.AUTH_SECRET ?? 'D1F33D82-A6C2-49EC-B7E6-29234FABC93B',
  theme: 'auto',
  debug: false,
  providers: [
    SanityCredentials(client),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: process.env.EMAIL_SERVER_PORT === '465',
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    jwt: true,
  },
  adapter: SanityAdapter(client),
  pages: {
    signIn: '/auth/credentials',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (account.type === 'email' && profile.verificationRequest) {
        return String(user.id).startsWith('user.');
      }
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
  events: {
    // async signIn(message) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },
    // async error(message) { /* error in authentication flow */ }
  },
};

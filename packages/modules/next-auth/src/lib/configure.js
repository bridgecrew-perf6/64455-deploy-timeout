// See: https://next-auth.js.org/v3/configuration/options

import { pick, isBlank } from '@atelierfabien/next-foundation/lib/util';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import Providers from 'next-auth/providers';
import SanityCredentials from './credentials';
import SanityAdapter from './adapter';
import { sendVerificationRequest } from './email';

import { defaultLocale, locales } from '@root/i18n';

const client = getClient(true);

export default (options = {}) => ({
  secret: process.env.AUTH_SECRET ?? 'D1F33D82-A6C2-49EC-B7E6-29234FABC93B',
  theme: 'auto',
  debug: false,
  ...options,
  signUp: {
    disabled: false, // will fully disable sign up
    managed: false, // will set disabled: true on all new users
    ...options.signUp,
  },
  providers: [
    SanityCredentials(client),
    Providers.Email({
      sendVerificationRequest,
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
    ...(options.providers ?? []),
  ],
  session: {
    jwt: true,
    ...options.session,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  adapter: SanityAdapter(client),
  pages: {
    signIn: '/auth/credentials',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
    ...options.pages,
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (user && account.type === 'email' && profile.verificationRequest) {
        return String(user.id).startsWith('user.') && !user.disabled;
      } else {
        return true; // or: return string with url to redirect to
      }
    },
    async jwt(token, user, _account, _profile, isNewUser) {
      if (user) {
        if (!isBlank(user.image)) token.image = user.image;
        token.id = user.id;
        token.locale = locales.includes(user.locale)
          ? user.locale
          : defaultLocale;
        token.isNewUser = Boolean(isNewUser);
      }
      return token;
    },
    async session(session, token) {
      Object.assign(session.user, pick(token, 'id', 'locale', 'isNewUser'));
      return session;
    },
    // async redirect(url, baseUrl) {
    //   return baseUrl;
    // },
    ...options.callbacks,
  },
  events: {
    // async signIn(message) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },
    // async error(message) { /* error in authentication flow */ }
    ...options.events,
  },
});

import Providers from 'next-auth/providers';

import argon2 from 'argon2';

import queries from './queries';

import { defaultLocale } from '@root/i18n';

const { getUserByEmailQuery } = queries;

export default (client) =>
  Providers.Credentials({
    name: 'Credentials',
    id: 'sanity-login',
    credentials: {
      email: {
        label: 'Email',
        type: 'text',
      },
      password: {
        label: 'Password',
        type: 'password',
      },
    },
    async authorize(credentials) {
      const user = await client.fetch(getUserByEmailQuery, {
        email: credentials.email,
      });

      if (!user) throw new Error('Email does not exist');

      if (await argon2.verify(user.password, credentials.password)) {
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          locale: user.locale ?? defaultLocale,
        };
      }

      throw new Error('Password Invalid');
    },
  });

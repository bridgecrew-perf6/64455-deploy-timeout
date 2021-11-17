import NextAuth from 'next-auth';
import { uuid } from '@sanity/uuid';

import queries from './queries';

import config from '@app/config/auth';

import { defaultLocale, locales } from '@root/i18n';

const { getUserByEmailQuery } = queries;

const detectLocale = (req) =>
  locales.includes(req.body.locale) ? req.body.locale : defaultLocale;

export const authHandler = (req, res) => {
  return NextAuth(req, res, { ...config, locale: detectLocale(req) });
};

export const signUpHandler = (client) => async (req, res) => {
  const { email, password, name, image } = req.body;
  const locale = detectLocale(req);

  const user = await client.fetch(getUserByEmailQuery, {
    email,
  });

  if (user) {
    res.json({ error: 'User already exists', signIn: true });
    return;
  }

  const newUser = await client.create({
    _id: `user.${uuid()}`,
    _type: 'user',
    email,
    password: await argon2.hash(password),
    name,
    image,
    locale,
  });

  res.json({
    email: newUser.email,
    name: newUser.name,
    image: newUser.image,
    locale: newUser.locale,
  });
};

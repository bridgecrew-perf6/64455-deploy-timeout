import { isBlank } from '@atelierfabien/next-foundation/lib/util';
import NextAuth from 'next-auth';
import argon2 from 'argon2';
import { uuid } from '@sanity/uuid';

import config from '@app/config/auth';

import { defaultLocale, locales } from '@root/i18n';
import { getUserByEmailQuery } from './queries';

const { WEBHOOK_SECRET } = process.env;

const ACTIONS = {
  purge: async client => {
    return client
      .delete({
        query: `*[_type == 'verification-request' && expires < now()]`,
      })
      .then(info => {
        return [200, { ok: true, count: info.documentIds.length }];
      })
      .catch(err => [200, { ok: false, error: err.message }]);
  },
};

const detectLocale = req =>
  locales.includes(req.body.locale) ? req.body.locale : defaultLocale;

export const authHandler = (options = {}) => {
  return (req, res) => {
    return NextAuth(req, res, {
      ...config,
      ...options,
      locale: detectLocale(req),
    });
  };
};

export const signUpHandler =
  (client, options = {}) =>
  async (req, res) => {
    const { email, password, name, image } = req.body;
    const locale = detectLocale(req);

    if (config?.signUp.disabled) {
      res.json({ error: 'Sign Up disabled' });
      return;
    }

    const user = await client.fetch(getUserByEmailQuery, {
      email,
    });

    if (user) {
      res.json({ error: 'User already exists', signIn: true });
      return;
    }

    const properties = {};

    if (config?.signUp.managed) properties.disabled = true;

    const newUser = await client.create({
      _id: `user.${uuid()}`,
      _type: 'user',
      email,
      password: await argon2.hash(password),
      name,
      image,
      locale,
      ...options,
      ...properties,
    });

    res.json({
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      image: newUser.image,
      locale: newUser.locale,
      disabled: newUser.disabled,
    });
  };

export const webhookHandler =
  (client, options = {}) =>
  async (req, res) => {
    const action = ACTIONS[req.body.action];
    if (isBlank(WEBHOOK_SECRET)) {
      return res
        .status(500)
        .json({ ok: false, error: 'Invalid webhook secret' });
    } else if (
      req.body.secret === WEBHOOK_SECRET &&
      typeof action === 'function'
    ) {
      const [status, result] = await action(client, options);
      res.status(status).json(result);
    } else {
      return res
        .status(400)
        .json({ ok: false, error: 'Invalid webhook request' });
    }
  };

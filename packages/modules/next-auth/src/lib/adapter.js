import { uuid } from '@sanity/uuid';
import argon2 from 'argon2';

import { defaultLocale } from '@root/i18n';

import {
  getUserByIdQuery,
  getUserByProviderAccountIdQuery,
  getUserByEmailQuery,
  getVerificationRequestQuery,
} from './queries';

const SanityAdapter = (client) => {
  return {
    async getAdapter({ secret, logger, ...appOptions }) {
      if (!appOptions.jwt) {
        logger.warn('this adapter only works with JWT');
      }

      const hashToken = (token) => argon2.hash(`${token}${secret}`);

      const { locale = defaultLocale } = appOptions;

      return {
        displayName: 'Sanity',

        async createUser(profile) {
          const user = await client.create({
            _id: `user.${uuid()}`,
            _type: 'user',
            email: profile.email,
            name: profile.name,
            image: profile.image,
          });

          return {
            id: user._id,
            ...user,
          };
        },

        async getUser(id) {
          const user = await client.fetch(getUserByIdQuery, {
            id,
          });

          if (!user) return null;

          return {
            id: user._id,
            ...user,
          };
        },

        async linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpires
        ) {
          await client.create({
            _id: `account.${uuid()}`,
            _type: 'account',
            providerId,
            providerType,
            providerAccountId: `${providerAccountId}`,
            refreshToken,
            accessToken,
            accessTokenExpires,
            user: {
              _type: 'reference',
              _ref: userId,
            },
          });
        },

        async getUserByProviderAccountId(providerId, providerAccountId) {
          const account = await client.fetch(getUserByProviderAccountIdQuery, {
            providerId,
            providerAccountId: String(providerAccountId),
          });

          if (!account) return null;

          return {
            id: account?.user._id,
            ...account?.user,
          };
        },

        async getUserByEmail(email) {
          if (!email) return null;

          const user = await client.fetch(getUserByEmailQuery, {
            email,
          });

          if (!user) return null;

          return {
            id: user._id,
            ...user,
          };
        },

        async createSession() {
          logger.warn('[createSession] method not implemented');

          return {};
        },

        async getSession() {
          logger.warn('[getSession] method not implemented');
          return {};
        },

        async updateSession() {
          logger.warn('[updateSession] method not implemented');
          return {};
        },

        async deleteSession() {
          logger.warn('[deleteSession] method not implemented');
        },

        async updateUser(user) {
          const { id, name, email, image } = user;

          const newUser = await client
            .patch(id)
            .set({
              name,
              email,
              image,
            })
            .commit();

          return {
            id: newUser._id,
            ...newUser,
          };
        },

        async createVerificationRequest(identifier, url, token, _, provider) {
          const id = uuid();

          await client.create({
            _id: `verification.${id}`,
            _type: 'verification-request',
            identifier,
            token: await hashToken(token),
            expires: new Date(Date.now() + provider.maxAge * 1000),
          });

          await provider.sendVerificationRequest({
            identifier,
            token: `${token}:${id}`,
            url: `${url}:${id}`,
            baseUrl: appOptions.baseUrl,
            provider,
            locale,
          });
        },

        async deleteVerificationRequest(identifier, _token) {
          const [token, id] = _token.split(':');

          const verificationRequest = await client.fetch(
            getVerificationRequestQuery,
            {
              id: `verification.${id}`,
              identifier,
            }
          );

          if (!verificationRequest) return;

          const checkToken = await argon2.verify(
            verificationRequest.token,
            `${token}${secret}`
          );

          if (!checkToken) return;

          await client.delete(verificationRequest._id);
        },

        async getVerificationRequest(identifier, _token) {
          const [token, id] = _token.split(':');

          const verificationRequest = await client.fetch(
            getVerificationRequestQuery,
            {
              id: `verification.${id}`,
              identifier,
            }
          );

          if (!verificationRequest) return null;

          const checkToken = await argon2.verify(
            verificationRequest.token,
            `${token}${secret}`
          );

          if (!checkToken) return null;

          if (verificationRequest.expires < new Date()) {
            await client.delete(verificationRequest._id);
            return null;
          }

          return {
            id: verificationRequest._id,
            ...verificationRequest,
          };
        },
      };
    },
  };
};

export default SanityAdapter;

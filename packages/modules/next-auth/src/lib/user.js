import { getClient, uuid, nanoid } from '@atelierfabien/next-sanity/lib/server';

import { getUserByEmailQuery } from './queries';

const client = getClient(true); // private cli

export const createUser = async (email, data = {}) => {
  return client.create({
    ...data,
    _id: `user.${data.id ?? uuid()}`,
    _type: 'user',
    email,
    references: [].concat(data.references ?? []),
  });
};

export const ensureUser = async (email, data = {}) => {
  let user = await client.fetch(getUserByEmailQuery, { email });
  if (user) {
    user = await client
      .patch(user._id)
      .set({ ...data, email })
      .commit();
  } else {
    user = await createUser(email, data);
  }
  user.references = Array.isArray(user.references) ? user.references : [];
  return user;
};

export const ensureUserReferences = async (user, referenceIds = []) => {
  if (referenceIds.length === 0) return [];

  if (typeof user === 'string') {
    user = await client.fetch(getUserByEmailQuery, { email: user });
  }

  if (typeof user === 'object' && typeof user._id === 'string') {
    const references = referenceIds.reduce((memo, _ref) => {
      if (!user.references.find(r => r._ref === _ref)) {
        memo.push({
          _key: nanoid(),
          _type: 'reference',
          _ref,
        });
      }
      return memo;
    }, []);

    await client
      .patch(user._id)
      .setIfMissing({ references: [] })
      .append('references', references)
      .commit();

    return references;
  } else {
    return [];
  }
};

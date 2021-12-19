import groq from 'groq';

export const getUserByIdQuery = groq`
  *[_type == 'user' && _id == $id][0]
`;

export const getUserByProviderAccountIdQuery = groq`
  *[_type == 'account' && providerId == $providerId && providerAccountId == $providerAccountId] {
    accessToken,
    accessTokenExpires,
    providerId,
    providerType,
    providerAccountId,
    user->
  }[0]
`;

export const getUserByEmailQuery = groq`
  *[_type == 'user' && email == $email][0]
`;

export const getVerificationRequestQuery = groq`
  *[_type == 'verification-request' && identifier == $identifier && _id == $id][0]
`;

export const getUserReferencesQuery = groq`
  *[_type in $types && _id in (*[_type == 'user' && _id == $userId][].references[]._ref)]{
    ...,
    ...i18n[$defaultLocale], ...i18n[$locale],
  }{
    _id, _type, _createdAt, _updatedAt, alias,
    'type': coalesce(type, kind),
    'name': coalesce(label, name, title),
    'description': coalesce(content.intro, intro, description),
    'image': coalesce(cover, images[0]),
  }|order(name, _type)
`;

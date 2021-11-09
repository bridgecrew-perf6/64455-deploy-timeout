import groq from 'groq';

import { internalReferenceProjection } from '.';

export const linkProjection = groq`
  _key,
  _type,
  item->,
  ...i18n[$defaultLocale],
  ...i18n[$locale],
  internal->{ ${internalReferenceProjection} },
  external,
  newWindow
`;

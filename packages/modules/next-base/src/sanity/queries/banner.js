import groq from 'groq';

import { linkProjection } from '.';

export const bannerProjection = groq`
  ..., 'i18n': null,
  ...i18n[$defaultLocale]{
    ..., button { ${linkProjection}, label, layout, columns, style, color }
  },
  ...i18n[$locale]{
    ..., button { ${linkProjection}, label, layout, columns, style, color }
  },
`;

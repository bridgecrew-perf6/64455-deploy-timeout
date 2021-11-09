import groq from 'groq';

import { coreProjection, linkProjection } from '.';

export const brandProjection = groq`
  ${coreProjection}, name,
  'link': link{ ${linkProjection} },
  'logoUrl': logo.asset->url
`;

import groq from 'groq';

import { coreProjection } from '.';

export const routePredicate = groq`
  _type == 'route'
`;

export const routeProjection = groq`
  ${coreProjection}, path,
  'options': coalesce(options, {})
`;

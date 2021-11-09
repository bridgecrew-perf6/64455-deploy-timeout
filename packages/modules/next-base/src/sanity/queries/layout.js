import groq from 'groq';

import { buildNodesProjection } from '@app/lib/node';

import { assetsProjection, fragmentsProjection, sectionsProjection } from '.';

export const layoutProjection = groq`
  ...,
  'identifier': alias.current,
  'assets': ${assetsProjection},
  'fragments': ${fragmentsProjection},
  'sections': ${sectionsProjection},
  'navigation': navigation->{ ${buildNodesProjection(1)} }
`;

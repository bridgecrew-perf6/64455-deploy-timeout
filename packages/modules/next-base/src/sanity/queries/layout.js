import groq from 'groq';

// import { buildNodesProjection } from '@app/lib/node';

import { assetsProjection } from '.';

// export const layoutProjection = groq`
//   ...,
//   'identifier': alias.current,
//   'assets': ${assetsProjection},
//   'fragments': ${fragmentsProjection},
//   'sections': ${sectionsProjection},
//   'navigation': navigation->{ ${buildNodesProjection(1)} }
// `;

export const layoutProjection = groq`
  ...,
  'identifier': alias.current,
  'assets': ${assetsProjection}
`;

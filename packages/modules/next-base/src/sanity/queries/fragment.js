import groq from 'groq';

import { buildNodesProjection } from '@app/lib/node';

export const fragmentProjection = groq`
  _id, _type, ...i18n[$defaultLocale], ...i18n[$locale],
  alias, hidden, code, component,
  layout, columns, style, color,
  'options': coalesce(options, {}),
  'images': coalesce(images[]{ ..., asset-> }, []),
  'navigation': navigation->{ ${buildNodesProjection(1)} },
`;

export const fragmentsProjection = groq`
  coalesce(fragments {
      header->{ ${fragmentProjection} },
      sidebar->{ ${fragmentProjection} },
      footer->{ ${fragmentProjection} },
    }, {})
`;

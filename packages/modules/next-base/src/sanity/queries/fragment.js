import groq from 'groq';

import { buildNodesProjection } from '@app/lib/node';
import { i18nProjection } from '.';

export const fragmentProjection = groq`
  _id, _type, ${i18nProjection},
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

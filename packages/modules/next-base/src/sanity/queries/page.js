import groq from 'groq';

import { buildNodesProjection } from '@app/lib/node';

import {
  coreProjection,
  baseProjection,
  assetProjection,
  fileProjection,
  fragmentsProjection,
  layoutProjection,
  linkProjection,
  sectionProjection,
} from '.';

export const pagePredicate = groq`_type == 'page' && hidden != true`;

export const pageProjection = groq`
  ${coreProjection},
  ...,
  'sections': coalesce(i18n[$locale].sections, i18n[$defaultLocale].sections, [])[]{ ${sectionProjection} },
  'social': coalesce(social, {}),
  'assets': coalesce(assets[]{ ..., asset-> { ${assetProjection} } }, []),
  'images': coalesce(images[]{ ..., asset-> { ${assetProjection} } }, []),
  'files': coalesce(files[]{ ${fileProjection} }, []),
  'links': coalesce(links[]{ ${linkProjection} }, []),
  'pages': coalesce(pages[]->{ ${baseProjection} }, []),
  'navigation': navigation->{ ${buildNodesProjection(1)} },
  'fragments': ${fragmentsProjection},
  'layout': layout->{ ${layoutProjection} },
`;

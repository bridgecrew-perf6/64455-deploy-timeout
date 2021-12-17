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
  regionProjection,
  sectionProjection,
  propertyValueProjection,
} from '.';

export const pagePredicate = groq`_type == 'page' && hidden != true`;

export const pageProjection = groq`
  ${coreProjection},
  ...,
  'sections': coalesce(i18n[$locale].sections, i18n[$defaultLocale].sections, [])[]{ ${sectionProjection} },
  'regions': coalesce(i18n[$locale].regions, i18n[$defaultLocale].regions, [])[]{ ${regionProjection} },
  'social': coalesce(social, {}),
  'assets': coalesce(assets[]{ ..., asset-> { ${assetProjection} } }, []),
  'cover': cover { ..., asset-> { ${assetProjection} } },
  'images': coalesce(images[]{ ..., asset-> { ${assetProjection} } }, []),
  'files': coalesce(files[]{ ${fileProjection} }, []),
  'links': coalesce(links[]{ ${linkProjection} }, []),
  'pages': coalesce(pages[]->{ ${baseProjection} }, []),
  'navigation': navigation->{ ${buildNodesProjection(1)} },
  'fragments': ${fragmentsProjection},
  'layout': layout->{ ${layoutProjection} },
  'tags': coalesce(tags[]->{ ${propertyValueProjection} }, [])
`;

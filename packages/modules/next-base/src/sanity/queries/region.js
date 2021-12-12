import groq from 'groq';

import { assetProjection, internalReferenceProjection } from '.';

const block = groq`
  'image': image{ ..., asset-> { ${assetProjection} } },
  'button': button { ..., internal->{ ${internalReferenceProjection} } }
`;

const slideshow = groq`
  'images': coalesce(images[]{
    ...,
    asset-> { ${assetProjection} },
    'button': button { ..., internal->{ ${internalReferenceProjection} } }
  }, []),
`;

export const regionProjection = groq`
  id, _key, _type, ...item,
  _type == 'region.block' => { ...item{ ${block} } },
  _type == 'region.slideshow' => { ...item{ ${slideshow} } }
`;

export const regionsProjection = groq`
  coalesce(regions[]{ ${regionProjection} }, [])
`;

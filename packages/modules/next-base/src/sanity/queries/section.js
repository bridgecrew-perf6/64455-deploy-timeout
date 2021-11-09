import groq from 'groq';

import {
  assetProjection,
  collectionProjection,
  fragmentProjection,
  referenceProjection,
  internalReferenceProjection,
} from '.';

export const sectionProjection = groq`
  ..., asset-> { ${assetProjection} },
  'images': coalesce(images[]{ ..., asset-> { ${assetProjection} } }, []),
  _type == 'section.component' && resolve => { 'reference': reference->{ ${referenceProjection} } },
  _type == 'section.fragment' => { 'fragment': fragment->{ ${fragmentProjection} } },
  _type == 'section.collection' => { 'collection': collection->{ ${collectionProjection} } },
  _type == 'section.cta' => {
    'button': button { ..., internal->{ ${internalReferenceProjection} } }
  }
`;

export const sectionsProjection = groq`
  coalesce(sections[]{ ${sectionProjection} }, [])
`;

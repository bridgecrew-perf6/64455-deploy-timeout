import groq from 'groq';

export const assetProjection = groq`
  ...,
  'metadata': metadata {
    ...,
    'lqip': null, 
    'palette': palette { lightVibrant }
  }
`;

export const assetsProjection = groq`
  coalesce(assets[]{
    ..., ...@-> 
  }{ ..., 'asset': file.asset-> { ${assetProjection} } }, [])`;

export const fileProjection = groq`
  _key,
  _type,
  ...i18n[$defaultLocale],
  ...i18n[$locale],
  asset-> { ${assetProjection} },
`;

import groq from 'groq';

export const regionProjection = groq`
  ...
`;

export const regionsProjection = groq`
  coalesce(regions[]{ ${regionProjection} }, [])
`;

import groq from 'groq';

import config from '@app/config/shop';

import { i18nProjection } from '.';

export const basePropertyTypeProjection = groq`
  _id, alias, variantOption, distinct, order, schemaType,
  ...options
`;

export const propertyTypeProjection = groq`
  ${basePropertyTypeProjection},
  ${i18nProjection}
`;

export const propertyValueProjection = groq`
  _id, alias, numeric, order, schemaType,
  ${i18nProjection},
  ...options,
  'property': property._ref,
  'color': display.color.hex,
  'value': value
`;

export const variantOptionsProjection = config.variantOptions
  .map(option => {
    if (typeof config?.variantOptionMapping?.[option] === 'function') {
      return `'${option}': ${option}`;
    } else {
      return `'${option}': ${option}->{ ${propertyValueProjection} }`;
    }
  })
  .join(',\n');

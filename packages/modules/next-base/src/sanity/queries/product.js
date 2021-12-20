import groq from 'groq';

import {
  i18nProjection,
  assetProjection,
  brandProjection,
  basePropertyTypeProjection,
  propertyTypeProjection,
  propertyValueProjection,
  variantOptionsProjection,
  categoryProjection,
  categoryReferenceProjection,
  productCollectionProjection,
  layoutProjection,
} from '.';

const minimalProjection = groq`id, _type, units`;

export const productPredicate = groq`
  _type == 'product' && !(defined(hidden) && hidden)
`;

export const masterProjection = groq`
  '_id': id, _type, sku,
  'units': coalesce(units, 0)
`;

export const pricingProjection = groq`
  price > 0 => { price },
  discount > 0 => { discount },  
  suggested > 0 => { suggested },
  onSale
`;

export const variantProjection = groq`
  _key, ${masterProjection}, identifier,
  customPrice => { 'pricing': pricing{ ${pricingProjection} } },
  'units': coalesce(units, 0),
  'options': coalesce(options{ ${variantOptionsProjection} }, {})
`;

export const baseProductProjection = groq`
  _id, _type, _createdAt, _updatedAt, alias, kind, ratio, requiresShipping,
  ${i18nProjection},
  'markers': { 'highlight': coalesce(markers.highlight, false), 'sale': coalesce(markers.sale, false) },
  'pricing': pricing{ ${pricingProjection} },
  'master': master{ ${masterProjection} },
  'brand': brand->{ ${brandProjection} },
  'hasVariants': defined(variantOptions) && length(variantOptions) > 0,
  'category': categories[0] { ${categoryReferenceProjection} },
  'hasDigitalGoods': defined(digitalGoods) && length(digitalGoods) > 0
`;

export const relatedProductsProjection = groq`
  coalesce(related[]->{
    ${baseProductProjection},
    'images': coalesce(images[0...1]{ ..., asset->{ ${assetProjection} } }, []),
  }, [])
`;

export const imageAttributesProjection = groq`
  'attributes': coalesce(attributes[]{ _key, _type, '_id': _ref }, [])
`;

export const productProjection = groq`
  ${baseProductProjection},
  'images': coalesce(images[]{ ..., ${imageAttributesProjection}, asset->{ ${assetProjection} } }, []),
  'attributes': coalesce(attributes[]->|order(order)|{ ${propertyValueProjection} }, []),
  'variantOptions': coalesce(variantOptions[]->{ ${propertyTypeProjection} }|order(order), []),
  'variants': coalesce(variants[]{ ${variantProjection} }, []),
  'categories': coalesce(categories[]->{ ${categoryProjection} }, []),
  'collections': *[_type == 'collection' && references(^._id)]{ ${productCollectionProjection} },
  'related': ${relatedProductsProjection},
  'social': coalesce(social, {}),
  'layout': layout->{ ${layoutProjection} },
`;

export const variantPredicate = groq`
  ${productPredicate} && ($target == master.id || $target in variants[].id)
`;

export const variantDetailsProjection = groq`
  _id, _type, _createdAt, _updatedAt, alias, requiresShipping,
  'master': master{
    ${masterProjection},
    'pricing': ^.pricing{ ${pricingProjection} },
  },
  'variant': variants[id == $target][0]{
    ${masterProjection},
    'pricing': pricing{ ${pricingProjection} },
    'color': options.color._ref
  },
  'hasVariants': defined(variantOptions) && length(variantOptions) > 0,
  'variants': coalesce(variants[].units, 0),
  'availability': coalesce(
    variants[id == $target][0].attributes[_type == 'property.availability'][0]->{
      ${basePropertyTypeProjection}
    },
    attributes[_type == 'property.availability'][0]->{
      ${basePropertyTypeProjection}
    }
  ),
  'hasDigitalGoods': defined(digitalGoods) && length(digitalGoods) > 0
`;

// Example of looking up the image url for the variant, with fallback to master
export const variantImageProjection = groq`
  coalesce(
    images[^.variants[id == $target][0].options.color._ref in attributes[]._ref][0].asset->url,
    images[0].asset->url
  )
`;

// Example of finding out of stock items
export const productUnitsPredicate = groq`
  _type == 'product' && (
    (length(variantProperties) == 0 && master.units == 0) ||
    length(variants[units == 0]) > 0
  )
`;

export const productUnitsProjection = groq`
  ${baseProductProjection},
  !defined(variants) || length(variants) == 0 => { 'matches': [master] },
  length(variants) > 0 => { 'matches': variants[units == 0] }
`;

export const inventoryQuery = groq`*[_type == 'product' && ($id == master.id || $id in variants[].id)]{
  _id, 
  !defined(variants) || length(variants) => { 'master': master{ ${minimalProjection} } },
  length(variants) > 0 => { 'variant': variants[id == $id][0]{ ${minimalProjection} } }
}`;

export const categoryProductsQuery = groq`*[_type == 'product.category' && path.current match $path]{
  _id, 'ids': *[${productPredicate} && references(^._id)]{
    _id
  }
}.ids[]._id`;

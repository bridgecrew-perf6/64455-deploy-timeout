import groq from 'groq';

export const algoliaProductProjection = groq`
  'alias': alias.current,
  'name': coalesce(i18n[$locale].name, i18n[$defaultLocale].name, ''),
  'description': pt::text(coalesce(i18n[$locale].description, i18n[$defaultLocale].description, [])),
  'keywords': coalesce(i18n[$locale].seo.keywords, i18n[$defaultLocale].seo.keywords, []),
  'kind': kind,
  'brand': brand->{
    'id': _id,
    'name': coalesce(i18n[$locale].title, i18n[$defaultLocale].title, name),
    'alias': alias.current,
    'logo': logo.asset->url
  },
  'images': images[]{
    asset, crop, hotspot,
    'attributes': attributes[]._ref,
    'palette': asset->metadata.palette.lightVibrant {
      background, foreground, title
    }
  },
  'category': *[_type == 'product.category' && _id == ^.categories[0]._ref && !(defined(hidden) && hidden)][0] {
    'id': _id,
    'path': path.current,
    ...i18n[$defaultLocale], ...i18n[$locale]
  },
  'categories': *[_type == 'product.category' && _id in ^.categories[]._ref && !(defined(hidden) && hidden)] {
    'level0': _id,
    'level1': parents[0]->_id,
    'level2': parents[0]->parents[0]->_id,
    'level3': parents[0]->parents[0]->parents[0]->_id,
    'level4': parents[0]->parents[0]->parents[0]->parents[0]->_id,
    'level5': parents[0]->parents[0]->parents[0]->parents[0]->parents[0]->_id,
    'level6': parents[0]->parents[0]->parents[0]->parents[0]->parents[0]->parents[0]->_id
  }|{
    'categories': [level6, level5, level4, level3, level2, level1, level0][defined(@)]
  }.categories,
  'collections': *[_type == 'collection' && references(^._id)] {
    _id, ...i18n[$defaultLocale], ...i18n[$locale]
  },
  'attributes': attributes[]._ref,
  'markers': markers { highlight, sale },
  'pricing': pricing,
  'master': master { id, 'sku': sku.current },
  'variants': variants[]{
    id, identifier, 'sku': sku.current, customPrice, pricing,
    'options': options { OptionsProjection }
  },
  'variantOptions': variantOptions[]._ref,
  'createdAt': _createdAt,
  'updatedAt': _updatedAt,
  'publishedAt': coalesce(publishedAt, _updatedAt)
`;

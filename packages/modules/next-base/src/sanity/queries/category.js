import groq from 'groq';

export const categoryPredicate = groq`
  _type == 'product.category' && !(defined(hidden) && hidden)
`;

export const categoryProjection = groq`
  _id, _type, path, hidden, order,
  ...i18n[$defaultLocale], ...i18n[$locale]
`;

export const categoryLevelsProjection = groq`
  'level0': { ${categoryProjection} },
  'level1': parents[0]->{ ${categoryProjection} },
  'level2': parents[0]->parents[0]->{ ${categoryProjection} },
  'level3': parents[0]->parents[0]->parents[0]->{ ${categoryProjection} },
  'level4': parents[0]->parents[0]->parents[0]->parents[0]->{ ${categoryProjection} },
  'level5': parents[0]->parents[0]->parents[0]->parents[0]->parents[0]->{ ${categoryProjection} },
  'level6': parents[0]->parents[0]->parents[0]->parents[0]->parents[0]->parents[0]->{ ${categoryProjection} }
`;

export const categoryLevelsReprojection = groq`
  'categories': [level6, level5, level4, level3, level2, level1, level0][${categoryPredicate}]
`;

export const categoryLevelsPipeline = groq`
  {
    ${categoryLevelsProjection}
  }|{
    ${categoryLevelsReprojection}
  }.categories
`;

export const categoriesProjection = groq`
  *[${categoryPredicate} && _id in ^.categories[]._ref]${categoryLevelsPipeline}
`;

export const productCollectionProjection = groq`
  _id, _type, alias, ...i18n[$defaultLocale], ...i18n[$locale]
`;

export const categoryDetailsProjection = groq`
  ... @{ ${categoryProjection} },
  'parents': coalesce(@${categoryLevelsPipeline}, [])[0...-1],
  'children': *[${categoryPredicate} && references(^._id)]|order(order)|{
    ${categoryProjection}
  }
`;

export const categoryReferenceProjection = groq`
  ... @->{ ${categoryProjection} },
  'parents': coalesce(@->${categoryLevelsPipeline}, [])[0...-1]
`;

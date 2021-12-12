import groq from 'groq';

import { categoryPredicate } from '@app/sanity/queries/category';

export const nodePredicate = groq`@->hidden != true && @->item->hidden != true`;

export const nodeItemProjection = groq`...{ ...i18n[$defaultLocale], ...i18n[$locale] }{
  label, name, title, ...content
}{
  'label': coalesce(label, name, title), title
}`;

export const nodeProjection = groq`_id, _key, _type, type, rule, ${nodeItemProjection}`;

export const nodeCoreProjection = groq`
  _id, _type, type, hidden, partial, newWindow,
  ...{ ...i18n[$defaultLocale], ...i18n[$locale] }{
    label, external,
    'path': coalesce(^.route->path.current, '') + path.current
  }
`;

export const nodeReferenceProjection = groq`
  ${nodeCoreProjection},
  item->{
    _id, _type, hidden, alias, path, ${nodeItemProjection},
    'options': coalesce(options, {}),
    'nodes': coalesce(*[${categoryPredicate} && ^._id in parents[]._ref]|order(order)|{
      _id, _type, path, ${nodeItemProjection},
      'options': coalesce(options, {}),
    }, [])
  },
  'options': coalesce(options, {})
`;

// Functions

const buildNodes = next =>
  next
    ? groq`'nodes': coalesce(nodes[${nodePredicate}]{
        ${nodeProjection}, ...@->{ ${nodeReferenceProjection}, ${next} }
      }, []),`
    : groq`'nodes': coalesce(nodes[${nodePredicate}]{
        ${nodeProjection}, ...@->{ ${nodeReferenceProjection} }
      }, []),`;

const buildQuery = (fn, levels = 2) =>
  levels > 1 ? fn(buildQuery(fn, levels - 1)) : fn();

export const buildNodesProjection = (levels = 2) => {
  const query = buildQuery(buildNodes, levels);
  return groq`
    _id, _type, alias,
    ...i18n[$defaultLocale], ...i18n[$locale],
    'options': coalesce(options, {}),
    ${query}
  `;
};

export const nodesProjection = groq`
  coalesce(nodes[${nodePredicate}]{
    ${nodeProjection}, ...@->{ ${nodeReferenceProjection} }
  }, [])
`;

// NOTE: full i18n object is required for translated path support

export const buildNodeProjection = (
  itemProjection = '...',
  projection = ''
) => {
  const extended = projection ? `, ${projection}` : '';
  return groq`
    _id, _type, _createdAt, _updatedAt, i18n,
    ...i18n[$defaultLocale], ...i18n[$locale],
    item->{ ${itemProjection} }
    ${extended}
  `;
};

import { useMemo } from 'react';

import groq from 'groq';

import { uniq, keyBy, isEmpty, omit } from '@foundation/lib/util';

import { layoutResolvers } from '@base/config/layouts';

import { regions } from '@app/config/regions';

const CORE_PROPS = ['_type', '_key', 'id'];

const Wrapper = ({ region, children, ...props }) => (
  <div data-region-id={region.id} data-region-type={region._type} {...props}>
    {children}
  </div>
);

const Default = ({ id, _type }) => {
  return (
    <strong>
      {id}:{_type}
    </strong>
  );
};

export const Region = ({ Component, ...props }) => {
  const { region, className, wrapper = true, ...properties } = props;

  const Comp = useMemo(() => {
    if (
      typeof region === 'object' &&
      typeof region.id === 'string' &&
      typeof region._type === 'string' &&
      !isEmpty(omit(region, CORE_PROPS)) &&
      !region.hidden
    ) {
      return Component ?? regions.get(region._type) ?? Default;
    }
  }, [Component, region]);

  if (Comp && wrapper) {
    return (
      <Wrapper region={region} className={className} {...properties}>
        <Comp {...region} {...properties} />
      </Wrapper>
    );
  } else if (Comp) {
    return <Comp {...region} />;
  } else {
    return null;
  }
};

const Regions = ({
  page = {},
  show = [],
  render = [],
  renderAll = false,
  children,
  ...properties
}) => {
  if (typeof show === 'string') show = [show];
  if (typeof render === 'string') render = [render];
  if ((render.length > 0 || renderAll) && typeof page.regions === 'object') {
    return (
      <>
        {(renderAll ? Object.keys(page.regions) : render).map(name => {
          const region = page.regions[name];
          return region ? (
            <Region key={region._key} region={region} {...properties} />
          ) : null;
        })}
      </>
    );
  } else if (show.filter(name => page.regions?.[name]).length > 0) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export async function resolveReferences(client, page, options) {
  const { locale, defaultLocale, map } = options;

  const basePredicate = groq`_id in $ids`;

  const ids = uniq(
    page.regions.reduce((memo, region) => {
      if (typeof region.reference?._ref === 'string') {
        memo.push(region.reference._ref);
      } else if (Array.isArray(region.references)) {
        region.references.forEach(({ _ref }) => {
          if (typeof _ref === 'string') memo.push(_ref);
        });
      }
      return memo;
    }, [])
  );

  const predicate = options.predicate
    ? groq`${options.predicate} && ${basePredicate}`
    : basePredicate;

  const projection = options.projection ?? '...';

  const references = await client.fetch(
    groq`*[${predicate}]{ ${projection} }`,
    {
      ids,
      locale,
      defaultLocale,
    }
  );

  const lookup = keyBy(
    typeof map === 'function' ? references.map(map) : references,
    '_id'
  );

  page.regions.forEach(region => {
    if (typeof region.reference?._ref === 'string') {
      const reference = lookup[region.reference._ref];
      region.reference = reference ?? null;
    } else if (Array.isArray(region.references)) {
      region.references = region.references.reduce((memo, { _ref }) => {
        if (typeof _ref === 'string' && lookup[_ref]) memo.push(lookup[_ref]);
        return memo;
      }, []);
    }
  });
}

export { layoutResolvers };

export default Regions;

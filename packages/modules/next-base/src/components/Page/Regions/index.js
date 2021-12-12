import { useMemo } from 'react';

import { regions } from '@app/config/regions';

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

export default Regions;

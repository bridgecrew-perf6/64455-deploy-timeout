import { useMemo } from 'react';

import TextRegion from '@shop/components/Page/Regions/Text';
import ImageRegion from '@shop/components/Page/Regions/Image';

// Example:
//
// import Regions, { Region } from '@shop/components/Page/Regions';
//
// <Regions page={page} show={['main', 'side']}> // optional, conditional display
//   <div className="uk-grid-small" uk-grid="true">
//     <Region className="uk-width-2-3" region={page.regions.main} />
//     <Region className="uk-width-1-3" region={page.regions.side} />
//   </div>
// </Regions>
//
// <Regions page={page} renderAll /> // render all
//
// <Regions page={page} render={['main', 'side']} /> // render named

export const regions = new Map();

regions.set('region.text', TextRegion);
regions.set('region.image', ImageRegion);

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

export const Region = props => {
  const { region, wrapper = true } = props;

  const Component = useMemo(() => {
    if (
      typeof region === 'object' &&
      typeof region.id === 'string' &&
      typeof region._type === 'string' &&
      typeof region.item === 'object' &&
      !region.item?.hidden
    ) {
      return regions.get(region._type) ?? Default;
    }
  }, [region]);

  if (Component && wrapper) {
    return (
      <Wrapper {...props}>
        <Component {...region} />
      </Wrapper>
    );
  } else if (Component) {
    return <Component {...region} />;
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
}) => {
  if (typeof show === 'string') show = [show];
  if (typeof render === 'string') render = [render];
  if ((render.length > 0 || renderAll) && typeof page.regions === 'object') {
    return (
      <>
        {(renderAll ? Object.keys(page.regions) : render).map(name => {
          const region = page.regions[name];
          return region ? <Region key={region._key} region={region} /> : null;
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

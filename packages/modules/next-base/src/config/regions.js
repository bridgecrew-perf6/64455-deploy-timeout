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

export const regionResolvers = new Map();

import { useMemo } from 'react';
import { useImages } from '@app/hooks/image';

import SingleImage from '@shop/components/Page/Parts/Image/Single';
import ImageGrid from '@shop/components/Page/Parts/Image/Grid';
import ImageSlider from '@shop/components/Page/Parts/Image/Slider';
import ImageSlideshow from '@shop/components/Page/Parts/Image/Slideshow';

import components from '@shop/components/Page/Components';

export const layouts = ['image', 'grid', 'slider', 'slideshow'];

const Wrapper = ({ children }) => <>{children}</>;

const mapping = {
  grid: 'ImageGrid',
  slider: 'ImageSlider',
  slideshow: 'ImageSlideshow',
  image: 'Image',
};

const PageImage = props => {
  const { children, type, title, component } = props;
  const layout = layouts.includes(props.layout) ? props.layout : 'grid';

  const [items, meta, componentProps] = useImages(props, layout);

  const Component = useMemo(() => {
    const name = mapping[layout];
    return components[component] ?? components[name] ?? Wrapper;
  }, [component, layout]);

  if (items.length > 1 && layout === 'grid') {
    return (
      <Component items={items} meta={meta} {...componentProps}>
        <ImageGrid
          {...componentProps}
          type={type}
          title={title}
          images={items}
          columns={meta.columns}
          ratio={meta.ratio}
        >
          {children}
        </ImageGrid>
      </Component>
    );
  } else if (items.length > 1 && layout === 'slider') {
    return (
      <Component items={items} meta={meta} {...componentProps}>
        <ImageSlider
          {...componentProps}
          type={type}
          title={title}
          images={items}
          columns={meta.columns}
          ratio={meta.ratio}
        >
          {children}
        </ImageSlider>
      </Component>
    );
  } else if (items.length > 1 && layout === 'slideshow') {
    return (
      <Component items={items} meta={meta} {...componentProps}>
        <ImageSlideshow
          {...componentProps}
          type={type}
          title={title}
          images={items}
          ratio={meta.ratio}
        >
          {children}
        </ImageSlideshow>
      </Component>
    );
  } else if (items.length === 1) {
    return (
      <Component items={items} meta={meta} {...componentProps}>
        <SingleImage
          {...componentProps}
          type={type}
          title={title}
          image={items[0]}
          ratio={meta.ratio}
        >
          {children}
        </SingleImage>
      </Component>
    );
  } else {
    return null;
  }
};

export default PageImage;

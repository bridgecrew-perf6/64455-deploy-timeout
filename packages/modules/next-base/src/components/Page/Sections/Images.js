import { useMemo } from 'react';

import PageImage from '@shop/components/Page/Parts/Image';

import components from '@shop/components/Page/Components';

const Wrapper = ({ children }) => <>{children}</>;

const ImagesSection = section => {
  const {
    _type,
    title,
    images,
    ratio,
    columns,
    className,
    style,
    color,
    nested,
    component,
    layout = 'slideshow',
    overlays = true,
  } = section;

  const Component = useMemo(() => {
    return components[component] ?? components.ImagesSection ?? Wrapper;
  }, [component]);

  return (
    <Component item={section}>
      <PageImage
        type={_type}
        title={title}
        images={images}
        ratio={ratio}
        columns={columns}
        layout={layout}
        component={component}
        className={className}
        style={style}
        color={color}
        expand={!nested}
        overlays={overlays}
        navigationOutside={overlays}
      />
    </Component>
  );
};

export default ImagesSection;

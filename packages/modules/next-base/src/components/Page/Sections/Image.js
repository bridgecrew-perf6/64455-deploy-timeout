import { useMemo } from 'react';

import { PortableText } from '@shop/components/Sanity';

import PageImage from '@shop/components/Page/Parts/Image';

import components from '@shop/components/Page/Components';

const Wrapper = ({ children }) => <>{children}</>;

const ImageSection = section => {
  const {
    _type,
    title,
    caption,
    body,
    layout,
    style,
    color,
    ratio,
    nested,
    component,
    className,
    ...image
  } = section;

  const Component = useMemo(() => {
    return components[component] ?? components.ImageSection ?? Wrapper;
  }, [component]);

  return (
    <Component item={section}>
      <PageImage
        type={_type}
        title={title}
        image={image}
        expand={!nested}
        layout={layout}
        style={style}
        color={color}
        ratio={ratio}
        className={className}
        component={component}
      >
        {caption && (
          <figcaption className="uk-text-center uk-margin-top">
            {caption}
          </figcaption>
        )}
        {body && (
          <div className="tm-section-body">
            <PortableText blocks={body} />
          </div>
        )}
      </PageImage>
    </Component>
  );
};

export default ImageSection;

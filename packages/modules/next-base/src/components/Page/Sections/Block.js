import { useMemo } from 'react';
import { get } from '@foundation/lib/util';

import Block from '@shop/components/Page/Parts/Block';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const Wrapper = ({ children }) => <>{children}</>;

const BlockSection = section => {
  const {
    _type,
    content,
    images,
    button,
    component,
    layout,
    style,
    nested,
    hidden,
    className = '',
    options = {},
  } = section;

  const { closable, noPadding } = options;

  let sectionClass = !nested && style !== 'framed' ? 'tm-expand' : 'tm-frame';

  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  const color = colors.includes(section.color) ? section.color : 'none';

  const foreground =
    color === 'none'
      ? ''
      : color === 'muted' || color === 'default'
      ? 'uk-dark'
      : 'uk-light';

  if (!noPadding && style !== 'wide') sectionClass += ' uk-padding';

  if (closable) sectionClass += ' tm-closable';

  const columns = typeof section.columns === 'number' ? section.columns : 0;

  const Component = useMemo(() => {
    return components[component] ?? components.BlockSection ?? Wrapper;
  }, [component]);

  let backgroundColor;

  if (section.color === 'image') {
    backgroundColor = get(images, [
      0,
      'asset',
      'metadata',
      'palette',
      'lightVibrant',
      'background',
    ]);
  }

  if (hidden) {
    return null;
  } else {
    return (
      <section
        className={`tm-section uk-section-${color} ${className} ${sectionClass}`}
        data-section={_type}
        style={{ backgroundColor }}
        hidden={closable?.isHidden}
        ref={closable?.ref}
      >
        <Component item={section}>
          <Block
            content={content}
            button={button}
            images={images}
            layout={layout}
            columns={columns}
            foreground={foreground}
            options={options}
          />
        </Component>
      </section>
    );
  }
};

export default BlockSection;

import { useMemo } from 'react';
import { PortableText } from '@shop/components/Sanity';

import PageHeader from '@shop/components/Page/Parts/Header';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const Wrapper = ({ children }) => <>{children}</>;

const TextSection = section => {
  const {
    main,
    _type,
    title,
    subtitle,
    intro,
    body,
    nested,
    component,
    columns = 1,
    style = 'narrow',
    className = '',
  } = section;

  const color = colors.includes(section?.color) ? section.color : 'none';

  const expand = !nested && style !== 'framed';

  let sectionClass = expand
    ? 'tm-expand'
    : color !== 'default'
    ? 'tm-frame'
    : 'tm-default';

  if (expand === false) {
    sectionClass = 'tm-default';
  } else if (style === 'narrow') {
    sectionClass = 'tm-narrow';
  } else if (style === 'wide') {
    sectionClass = 'tm-wide';
  }

  if (sectionClass === 'tm-expand' || (color !== 'none' && style !== 'wide')) {
    sectionClass += ' uk-padding';
    if (color === 'none') sectionClass += ' uk-padding-remove-vertical';
  }

  if (color !== 'none') sectionClass += ' tm-background';

  const foreground =
    color === 'none'
      ? ''
      : color === 'muted' || color === 'default'
      ? 'uk-dark'
      : 'uk-light';

  const bodyClass = columns > 1 ? `uk-column-1-${columns}@s` : '';

  const Component = useMemo(() => {
    return components[component] ?? components.TextSection ?? Wrapper;
  }, [component]);

  const hasBody = Array.isArray(body) && body.length > 0;

  return (
    <section
      className={`tm-section ${className} uk-section-${color} ${foreground} ${sectionClass}`}
      data-section={_type}
      data-columns={columns}
    >
      <Component item={section}>
        <PageHeader
          title={title}
          subtitle={subtitle}
          intro={intro}
          main={main}
        />
        {hasBody && (
          <div className={`tm-section-body ${bodyClass}`}>
            <PortableText blocks={body} />
          </div>
        )}
      </Component>
    </section>
  );
};

export default TextSection;

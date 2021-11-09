import { useMemo } from 'react';
import { PortableText } from '@shop/components/Sanity';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const ListSection = section => {
  const {
    _type,
    title,
    items,
    nested,
    layout,
    component,
    style = 'narrow',
    className = '',
  } = section;

  const color = colors.includes(section?.color) ? section.color : 'none';

  let sectionClass =
    !nested && style !== 'framed'
      ? 'tm-expand'
      : color !== 'none'
      ? 'tm-frame'
      : 'tm-none';

  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  if (color !== 'none' && style !== 'wide') sectionClass += ' uk-padding';

  const foreground =
    color === 'none'
      ? ''
      : color === 'muted' || color === 'default'
      ? 'uk-dark'
      : 'uk-light';

  const list = Array.isArray(items) ? items : [];
  const accordion = layout === 'accordion';
  const listClassName = accordion ? 'tm-accordion' : 'tm-list';

  const Component = useMemo(() => {
    return components[component] ?? components.ListSection;
  }, [component]);

  if (component && list.length > 0) {
    return (
      <section
        className={`tm-section ${className} uk-section-${color} ${foreground} ${sectionClass}`}
        data-section={_type}
      >
        <Component item={section} items={list} />
      </section>
    );
  } else if (list.length > 0) {
    return (
      <section
        className={`tm-section ${className} uk-section-${color} ${foreground} ${sectionClass}`}
        data-section={_type}
      >
        {title && <h3 className="tm-section-title">{title}</h3>}
        <ul
          className={`uk-accordion ${listClassName}`}
          uk-accordion={accordion ? 'multiple: true;' : null}
        >
          {list.map(item => (
            <li key={item._key} className={accordion ? null : 'uk-open'}>
              <a className="uk-accordion-title" href="#">
                {item.title}
              </a>
              <div className="uk-accordion-content tm-section-body">
                <PortableText blocks={item.body} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  } else {
    return null;
  }
};

export default ListSection;

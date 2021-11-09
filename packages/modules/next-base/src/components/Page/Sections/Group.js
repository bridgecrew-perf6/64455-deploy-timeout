import { useMemo } from 'react';
import { useColumns } from '@app/hooks/layout';

import components from '@shop/components/Page/Components';

import Sections from '@shop/components/Page/Sections';
import Section from '@shop/components/Page/Sections/Section';

import colors from '@shop/config/colors';

const GroupSection = section => {
  const {
    _type,
    title,
    sections,
    layout,
    style,
    component,
    nested,
    className = '',
  } = section;
  const items = useColumns(sections, section.columns);

  let sectionClass = !nested && style !== 'framed' ? 'tm-expand' : 'tm-frame';
  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  const color = colors.includes(section.color) ? section.color : 'default';
  const foreground =
    color === 'muted' || color === 'default' ? 'uk-dark' : 'uk-light';
  const hasItems = items.length > 0;

  const Component = useMemo(() => {
    return components[component] ?? components.GroupSection;
  }, [component]);

  if (hasItems && typeof Component === 'function') {
    return (
      <section
        className={`tm-section uk-section-${color} ${foreground} ${sectionClass} ${className}`}
        data-section={_type}
        data-columns={section.columns}
      >
        {title && <h3 className="tm-section-title">{title}</h3>}
        <Component item={section} items={items} nested={nested}>
          <Sections sections={items} nested />
        </Component>
      </section>
    );
  } else if (hasItems && layout === 'accordion') {
    return (
      <div
        className={`tm-section uk-section-${color} ${foreground} ${sectionClass} ${className}`}
        data-section={_type}
        data-columns={section.columns}
      >
        {title && <h3 className="tm-section-title">{title}</h3>}
        <ul className="uk-accordion" uk-accordion="multiple: true;">
          {sections.map(({ title, ...section }) => (
            <li key={section._key}>
              <a className="uk-accordion-title" href="#">
                {title}
              </a>
              <div className="uk-accordion-content">
                <Section {...section} nested />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (hasItems) {
    return (
      <section
        className={`tm-section uk-section-${color} ${foreground} ${sectionClass} ${className}`}
        data-section={_type}
        data-columns={section.columns}
      >
        {title && <h3 className="tm-section-title">{title}</h3>}
        <div className="uk-grid uk-grid-collapse" uk-grid="true">
          <Sections sections={items} nested />
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default GroupSection;

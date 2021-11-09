import { useMemo } from 'react';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const Wrapper = ({ children }) => <>{children}</>;

const ComponentSection = section => {
  const { _type, component, style, nested, className = '' } = section;

  let sectionClass = !nested && style !== 'framed' ? 'tm-expand' : 'tm-frame';
  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  const color = colors.includes(section.color) ? section.color : 'none';
  const foreground =
    color === 'muted' || color === 'default' ? 'uk-dark' : 'uk-light';

  const Component = useMemo(() => {
    return components[component] ?? components.ComponentSection ?? Wrapper;
  }, [component]);

  return (
    <section
      className={`tm-section uk-section-${color} ${foreground} ${className} ${sectionClass}`}
      data-section={_type}
    >
      <Component item={section} />
    </section>
  );
};

export default ComponentSection;

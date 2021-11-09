import { useMemo } from 'react';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const spacing = {
  spacingSmall: 'h-5',
  spacingMedium: 'h-10',
  spacingLarge: 'h-32',
};

const DividerSection = section => {
  const { _type, title, rule, component, style = 'narrow' } = section;

  const mainClass = `tm-${style} ${style === 'wide' ? 'tm-expand' : ''}`;

  const color = colors.includes(section.color) ? section.color : 'default';

  const Component = useMemo(() => {
    return components[component] ?? components.DividerSection;
  }, [component]);

  if (typeof Component === 'function') {
    return <Component item={section} />;
  } else if (spacing[style]) {
    return <div className={spacing[style]} data-section={_type} />;
  } else if (title) {
    const className = rule ? 'uk-heading-divider' : null;
    return (
      <h3
        className={`tm-divider-${color} ${className} ${mainClass}`}
        data-section={_type}
      >
        {title}
      </h3>
    );
  } else if (section.rule) {
    return (
      <hr className={`tm-divider-${color} ${mainClass}`} data-section={_type} />
    );
  } else {
    return <div className="h-5" data-section={_type} />;
  }
};

export default DividerSection;

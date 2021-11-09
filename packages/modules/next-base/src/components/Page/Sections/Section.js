import { useMemo } from 'react';

import { sections } from '@shop/components/Page/Sections';

import components from '@shop/components/Page/Components';

import ErrorSection from '@shop/components/Page/Sections/Error';

const Wrapper = ({ children }) => <>{children}</>;

const Hidden = () => null;

const Section = props => {
  const { nested, hidden } = props;

  const sectionType = props.sectionType ?? props._type;
  const Type = sections.get(sectionType) ?? ErrorSection;

  const Component = useMemo(() => {
    if (hidden) return Hidden;
    return components.Section ?? Wrapper;
  }, [hidden]);

  return (
    <Component item={props} nested={nested}>
      <Type {...props} nested={nested} />
    </Component>
  );
};

export default Section;

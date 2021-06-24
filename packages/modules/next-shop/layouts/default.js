import { useMemo } from 'react';
import { usePageOptions } from '@foundation/next';
import { get } from '@foundation/lib/util';

import CommonHeading from '@shop/components/Common/Heading';

const Noop = () => null;

const DefaultLayout = ({ children, heading }) => {
  const options = usePageOptions();

  const Heading = useMemo(() => {
    const Component = get(options, ['heading', 'component'], heading);
    return typeof Component === 'function'
      ? Component
      : Component === false
      ? Noop
      : CommonHeading;
  }, [heading, options]);

  return (
    <section
      className="uk-section uk-section-small tm-ignore-padding tm-page-viewport"
      uk-height-viewport="expand: true"
    >
      <div className="uk-container">
        <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
          <Heading />
          <section className="tm-page-container">{children}</section>
        </div>
      </div>
    </section>
  );
};

export default DefaultLayout;

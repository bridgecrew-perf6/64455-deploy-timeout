import { useMemo } from 'react';

import Link from '@shop/components/Common/Link';

const VisibleButton = ({ children, link, color, icon }) => {
  return (
    <>
      <div className="uk-padding uk-position-z-index">
        <Link
          link={link}
          icon={icon}
          className={`uk-button uk-button-large uk-button-${color} uk-text-nowrap`}
        />
      </div>
      {children}
    </>
  );
};

const HiddenButton = ({ children, link }) => {
  return (
    <div className="uk-position-z-index">
      <Link link={link} hideLabel>
        {children}
      </Link>
    </div>
  );
};

const BlockButton = ({
  children,
  media,
  className,
  ratio,
  part,
  hidden = false,
  color = 'default',
  icon = 'arrow-right',
  ...item
}) => {
  const verticalAlign = media ? 'uk-flex-bottom' : 'uk-flex-middle';

  const Component = useMemo(() => {
    return hidden ? HiddenButton : VisibleButton;
  }, [hidden]);

  return (
    <div
      className={`uk-cover-container uk-position-relative uk-flex uk-flex-center ${verticalAlign} ${className}`}
      uk-ratio={ratio}
      data-part={part}
    >
      <Component link={item} color={color} icon={icon} hidden={hidden}>
        {children}
      </Component>
    </div>
  );
};

export default BlockButton;

import { useMemo } from 'react';
import { Link } from '@foundation/next';

import { useLink } from '@app/hooks';

import SidebarDivider from '@shop/components/Page/Parts/Sidebar/Divider';

const typeMapping = {
  'navigation.divider': SidebarDivider,
};

const UIkitIcon = icon => <span uk-icon={icon} />;

const NullIcon = () => null;

const SidebarLink = ({ item, ...props }) => {
  const link = useLink(item, props.type);

  const { linkType, label, href, partial, target, badge, icon } = link;

  const Icon = useMemo(() => {
    if (typeof icon === 'function') {
      return icon;
    } else if (typeof icon === 'string') {
      return UIkitIcon;
    } else {
      return NullIcon;
    }
  }, [icon]);

  if (typeof typeMapping[linkType] === 'function') {
    const Component = typeMapping[linkType];
    return <Component {...link} {...props} Icon={Icon} />;
  } else {
    return (
      <Link as="li" href={href} partial={partial} target={target} {...props}>
        <div className="uk-flex">
          <span className="uk-flex-1 uk-text-truncate uk-margin-xsmall-right">
            {label}
          </span>
          {badge && (
            <span className="uk-badge uk-text-uppercase uk-text-xsmall">
              {badge}
            </span>
          )}
          <Icon icon={icon} />
        </div>
      </Link>
    );
  }
};

export default SidebarLink;

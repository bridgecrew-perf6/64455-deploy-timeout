import { Link, useTranslation } from '@foundation/next';

import { useNavigationNode } from '@app/hooks';

import OffcanvasItemLink from '@app/components/Offcanvas/Nav/Item/Link';

const SubMenu = props => {
  const { label, href, partial, target, options } = useNavigationNode(
    props.parent
  );
  const { t } = useTranslation();

  const { nodes, level, levels } = props;

  let className = `uk-nav-sub uk-list-divider tm-nav-level-${level}`;
  if (nodes.length > 0) className += ' uk-nav-parent-icon';

  return (
    <ul className={className} uk-nav="true">
      {nodes.map(node => (
        <OffcanvasItemLink
          key={node._key ?? node._id}
          parent={props}
          level={level}
          levels={levels}
          {...node}
        />
      ))}
      {nodes.length && options.linkTo && (
        <li className="uk-text-center">
          <Link
            className="uk-link-muted uk-text-uppercase tm-link-to-all"
            href={href}
            partial={partial}
            target={target}
          >
            <span>{`${t('app:seeAll')} ${label}`}</span>
            <span uk-icon="icon: chevron-right; ratio: .75;" />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default SubMenu;

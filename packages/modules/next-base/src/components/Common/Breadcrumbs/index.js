import { Link, useTranslation } from '@foundation/next';
import { useBreadcrumbs } from '@app/hooks';

const CommonBreadcrumbs = ({ className, items = [], prependItems = [] }) => {
  const [breadcrumbs, current] = useBreadcrumbs(items, prependItems);
  const { t } = useTranslation();

  if (Array.isArray(items) && items.length > 0) {
    return (
      <div className={className}>
        <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
          <Link href="/" as="li">
            {t('app:homepage')}
          </Link>
          {breadcrumbs.map(({ _key, label, href }) => (
            <Link key={_key} href={href} as="li" shallow>
              {label}
            </Link>
          ))}
          {current && (
            <li className="uk-text-truncate">
              <span>{current.label}</span>
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default CommonBreadcrumbs;

import { useCurrency, Link } from '@foundation/next';

import { useSnipcartStats } from '@app/hooks/cart';

import CommonNavbarMenuCartIcon from '@shop/components/Common/Navbar/Menu/Cart/Icon';

const CommonNavbarMenuCartItem = ({ withTotal = false }) => {
  const { currency, count, total, isLoading, isSandboxMode } =
    useSnipcartStats();

  const c = useCurrency(currency, { convert: false });

  const badgeClassName = isSandboxMode
    ? 'uk-badge uk-background-danger uk-animation-slide-bottom-small'
    : 'uk-badge uk-background-success uk-animation-slide-bottom-small';

  return (
    <Link
      className="uk-navbar-item uk-link-muted tm-navbar-button snipcart-checkout"
      href="#"
      onClick={e => e.preventDefault()}
    >
      {isLoading && <span uk-spinner="ratio: 0.5" />}
      {!isLoading && (
        <>
          {withTotal && count > 0 && (
            <span className="uk-margin-right uk-animation-fade uk-visible@s">
              {c.format(total)}
            </span>
          )}
          <CommonNavbarMenuCartIcon />
          {count > 0 && <span className={badgeClassName}>{count}</span>}
        </>
      )}
    </Link>
  );
};

export default CommonNavbarMenuCartItem;

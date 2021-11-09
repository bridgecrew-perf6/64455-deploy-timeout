import { withPurchaseButtonLabel } from '@app/hooks';

import SnipcartButton from '@shop/components/Snipcart/Button';

import { Add32 } from '@carbon/icons-react';

const ProductPurchaseButton = ({
  label,
  selectionLabels,
  onClick,
  status,
  isEnabled = true,
  isProcessing = false,
}) => {
  const isActive = isEnabled && !isProcessing;
  return (
    <SnipcartButton
      className="uk-button uk-button-primary uk-width-1-1 tm-product-add-button tm-shine"
      disabled={!isActive}
      onClick={onClick}
      data-status={status}
    >
      <div className="uk-flex uk-flex-middle">
        {isActive && <Add32 className="uk-icon uk-icon-left" />}
        <div className="uk-width-expand uk-text-truncate">
          <span>{label}</span>
          {selectionLabels.length > 0 && (
            <span className="uk-visible@s">
              {' '}
              - {selectionLabels.join(' / ')}
            </span>
          )}
        </div>
      </div>
    </SnipcartButton>
  );
};

export default withPurchaseButtonLabel(ProductPurchaseButton);

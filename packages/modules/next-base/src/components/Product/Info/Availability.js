import { useMemo } from 'react';
import { useTranslation } from '@foundation/next';

import {
  CheckmarkOutline24,
  DeliveryTruck24,
  WarningAlt24,
} from '@carbon/icons-react';

const iconMapping = {
  available: CheckmarkOutline24,
  unavailable: WarningAlt24,
  orderable: DeliveryTruck24,
};

const ProductInfoAvailability = ({ availability }) => {
  const { status, inStock, isLoading, isOrderable, current } = availability;

  const { t } = useTranslation();

  const [type, Icon] = useMemo(() => {
    const type =
      inStock || isLoading
        ? 'available'
        : isOrderable
        ? 'orderable'
        : 'unavailable';
    return [type, iconMapping[type]];
  }, [inStock, isLoading, isOrderable]);

  return (
    <div
      className="uk-margin"
      suppressHydrationWarning
      data-status={current.status}
    >
      <div
        className="uk-padding-small uk-background-muted uk-border-rounded tm-availability"
        data-availability={status.alias}
      >
        <div
          className="uk-grid-small uk-child-width-1-1 uk-text-small"
          uk-grid="true"
        >
          <div className="uk-position-relative" suppressHydrationWarning>
            <div className="uk-grid-collapse" uk-grid="true">
              <div
                key={type}
                className="uk-margin-xsmall-left uk-margin-right uk-flex uk-flex-middle"
                data-part="icon"
              >
                <Icon className="uk-icon" />
              </div>
              <div data-part="info">
                <div className="uk-text-bolder" data-part="info-label">
                  {t('shop:availability')}
                </div>
                <div
                  className="uk-text-small uk-text-muted"
                  data-part="info-value"
                  suppressHydrationWarning
                >
                  {isLoading ? t('shop:availabilityCheck') : status.label}
                </div>
              </div>
            </div>
            {isLoading && (
              <div
                className="uk-position-center-right uk-position-small uk-animation-fade"
                uk-spinner="ratio: 0.8"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoAvailability;

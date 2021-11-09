import { useCart } from '@app/hooks';

import CommonQuantity from '@shop/components/Common/Quantity';
import PurchaseButton from '@shop/components/Product/Purchase/Button';

const ProductPurchaseCart = props => {
  const { showQuantity = true } = props;

  const {
    quantity,
    maxQuantity,
    isDisabled,
    isProcessing,
    isProcessed,
    onChangeQuantity,
    onClickAdd,
  } = useCart(props);

  return (
    <div>
      <div className="uk-grid-small" uk-grid="true">
        {showQuantity && (
          <CommonQuantity
            target="product-1"
            value={quantity}
            max={maxQuantity}
            disabled={isDisabled}
            onChange={onChangeQuantity}
          />
        )}
        <div className="uk-width-expand">
          <PurchaseButton
            {...props}
            quantity={quantity}
            isProcessing={isProcessing}
            isProcessed={isProcessed}
            onClick={onClickAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPurchaseCart;

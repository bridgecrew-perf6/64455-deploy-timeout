import { useProductMarkers } from '@app/hooks/shop';

const ProductMediaOverlay = ({ item, variant, size = 'default' }) => {
  const markers = useProductMarkers(
    item,
    variant.pricing?.onSale ? ['sale'] : []
  );

  if (markers.length > 0) {
    return (
      <div className="uk-position-top-right uk-position-small uk-position-z-index">
        {markers.map(({ marker, label, type }) => (
          <span
            key={marker}
            className={`uk-label tm-label-${size} tm-product-label-${marker} uk-label-${type} uk-margin-xsmall-right uk-animation-fade`}
          >
            {label}
          </span>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default ProductMediaOverlay;

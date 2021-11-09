import { useProductMarkers } from '@app/hooks/shop';

const ProductCardTags = ({ item }) => {
  const markers = useProductMarkers(item);

  if (markers.length > 0) {
    return (
      <div className="tm-product-card-labels">
        {markers.map(({ marker, label, type }) => (
          <span
            key={marker}
            className={`uk-label uk-label-${type} tm-product-label-${marker}`}
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

export default ProductCardTags;

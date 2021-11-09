import { PortableText } from '@shop/components/Sanity';

const ProductInfoDescription = ({ item }) => {
  const { description } = item ?? {};

  if (Array.isArray(description) && description.length > 0) {
    return <PortableText blocks={description} />;
  } else {
    return null;
  }
};

export default ProductInfoDescription;

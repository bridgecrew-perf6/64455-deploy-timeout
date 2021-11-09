import { times } from '@foundation/lib/util';

import ProductCard from '@shop/components/Product/Card';

import { useProducts } from '@app/hooks/shop';

const fallback = times(5, i => ({
  _key: String(i),
}));

const CollectionSection = ({ result, items }) => {
  const { isSuccess, data = {} } = result;
  const { name } = data;

  const products = useProducts(isSuccess ? items : fallback);

  return (
    <section className="uk-container tm-container-expand">
      <div uk-slider="clsVisible: tm-visible;">
        <div className="uk-margin uk-margin-top">
          <div className="uk-grid-small uk-flex-middle" uk-grid="true">
            <h3 className="uk-width-expand uk-text-center uk-text-left@s">
              {name}
            </h3>
            <div className="uk-visible@s">
              <a
                className="tm-slidenav"
                href="#"
                uk-slider-item="previous"
                uk-slidenav-previous="true"
              />
              <a
                className="tm-slidenav"
                href="#"
                uk-slider-item="next"
                uk-slidenav-next="true"
              />
            </div>
          </div>
        </div>
        <div className="tm-products-grid tm-products-slider uk-margin-medium-bottom">
          <div className="uk-card uk-card-default uk-card-small">
            <div className="uk-position-relative">
              <div className="uk-slider-container">
                <div className="uk-slider-items uk-grid-collapse uk-child-width-1-3 uk-child-width-1-4@m tm-products-grid tm-products-grid-large">
                  {products.map(item => (
                    <ProductCard key={item._key} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top uk-hidden@s" />
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;

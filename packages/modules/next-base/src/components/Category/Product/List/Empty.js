import { useTranslation } from '@foundation/next';

const ProductListEmpty = ({ loaded }) => {
  const { t } = useTranslation();

  return (
    <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-width-1-1 tm-placeholder-container">
      {loaded && (
        <p className="uk-text-large uk-text-meta uk-text-uppercase">
          {t('common:errors.noResults.title')}
        </p>
      )}
    </div>
  );
};

export default ProductListEmpty;

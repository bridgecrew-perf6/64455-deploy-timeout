const ProductListMore = () => (
  <div>
    <button
      className="uk-button uk-button-default uk-button-large uk-width-1-1"
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
      type="button"
    >
      <span
        className="uk-margin-small-right"
        uk-icon="icon: plus; ratio: .75;"
      />
      <span>Load more</span>
    </button>
  </div>
);

export default ProductListMore;

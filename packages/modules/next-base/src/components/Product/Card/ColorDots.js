const ProductCardColorDots = ({ color, colors = [] }) => {
  const all = []
    .concat(color ?? [])
    .concat(colors)
    .slice(0, 10); // max 10
  if (all.length > 1) {
    return (
      <div className="tm-color-dots">
        {all.map(c => (
          <div
            key={c}
            className={`tm-color-dot ${c === color ? 'uk-active' : ''}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    );
  } else {
    return <div className="tm-color-dots" />;
  }
};

export default ProductCardColorDots;

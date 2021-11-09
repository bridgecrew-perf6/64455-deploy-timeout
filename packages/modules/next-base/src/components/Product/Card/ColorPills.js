const ProductCardColorPills = ({ color, colors = [] }) => {
  const all = []
    .concat(color ?? [])
    .concat(colors)
    .slice(0, 10); // max 10
  if (all.length > 1) {
    return (
      <div className="tm-color-pills">
        {all.map(c => (
          <div
            key={c}
            className={`tm-pill tm-variation-color tm-highlight ${
              c === color ? 'uk-active' : ''
            }`}
          >
            <div style={{ backgroundColor: c }} />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default ProductCardColorPills;

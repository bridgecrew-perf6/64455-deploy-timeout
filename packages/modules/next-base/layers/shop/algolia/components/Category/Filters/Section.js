const CategoryFiltersSection = ({
  children,
  label,
  initialOpen,
  className,
  contentClassName,
  refinementId,
}) => {
  return (
    <section
      data-id={refinementId}
      className={`uk-card-body js-accordion-section ${className ?? ''} ${
        initialOpen ? 'uk-open' : ''
      }`}
    >
      <h4 className="uk-accordion-title uk-margin-remove">{label}</h4>
      <div className={`uk-accordion-content ${contentClassName ?? ''}`}>
        {children}
      </div>
    </section>
  );
};

export default CategoryFiltersSection;

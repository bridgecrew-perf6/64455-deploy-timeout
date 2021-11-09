const Wrapper = ({ section, layout, dividers, children }) => {
  if (layout === 'split') {
    return (
      <div
        className="uk-card tm-sidebar-section uk-card-default uk-card-small tm-ignore-container"
        data-section={section}
      >
        {children}
      </div>
    );
  } else {
    const className = dividers ? 'tm-sidebar-section-divider' : '';
    return (
      <div className={`tm-sidebar-section ${className}`} data-section={section}>
        {children}
      </div>
    );
  }
};

export default Wrapper;

const PageHeader = ({ main, title, subtitle, intro, date }) => {
  const className = main ? 'tm-header tm-header-main' : 'tm-header';
  if (title) {
    const meta = subtitle || date;
    return (
      <header className={`tm-section-width ${className}`}>
        {main ? <h2>{title}</h2> : <h3>{title}</h3>}
        {meta && (
          <div className="tm-section-meta">
            {subtitle && <span>{subtitle}</span>}
            {date && <time>{date}</time>}
          </div>
        )}
        {intro && (
          <div className="tm-section-intro">
            <p className="uk-text-lead">{intro}</p>
          </div>
        )}
      </header>
    );
  } else {
    return null;
  }
};

export default PageHeader;

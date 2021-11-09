const NewsletterSubscription = ({ item }) => {
  const { options = {} } = item;
  const { title = 'Subscribe', header, info } = options;
  const className = options.className ?? 'uk-section-primary';
  return (
    <section className={`uk-section uk-section-small uk-light ${className}`}>
      <div className="uk-container">
        {(header || info) && (
          <div className="uk-text-center">
            {header && <div className="uk-h2 uk-margin-remove">{header}</div>}
            {info && <div>{info}</div>}
          </div>
        )}
        <div className="uk-margin">
          <form>
            <div className="uk-grid-small uk-flex-center" uk-grid="true">
              <div className="uk-width-1-1 uk-width-medium@s">
                <div className="uk-inline uk-width-1-1">
                  <span className="uk-form-icon" uk-icon="mail" />
                  <input
                    className="uk-input"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div>
                <button className="uk-button uk-button-primary" type="button">
                  {title}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;

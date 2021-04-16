const CommonSubscribe = () => (
  <section className="uk-section uk-section-primary uk-section-small uk-light">
    <div className="uk-container">
      <div className="uk-text-center">
        <div className="uk-h2 uk-margin-remove">Subscribe for updates</div>
        <div>Be aware of new products and special offers.</div>
      </div>
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
                subscribe
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
);

export default CommonSubscribe;

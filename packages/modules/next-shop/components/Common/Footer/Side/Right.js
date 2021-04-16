const CommonFooterSideRight = () => (
  <div>
    <form className="uk-form-stacked">
      <label>
        <div className="uk-form-label uk-text-muted">Subscribe for updates</div>
        <div className="uk-inline uk-width-1-1">
          <a
            className="uk-form-icon uk-form-icon-flip"
            href="#"
            uk-icon="mail"
          />
          <input
            className="uk-input"
            type="email"
            placeholder="Your email"
            required
          />
        </div>
      </label>
    </form>
    <div className="uk-margin uk-text-small uk-text-muted">
      Shopping Categories icons by Jaro Sigrist from Noun Project
    </div>
  </div>
);

export default CommonFooterSideRight;

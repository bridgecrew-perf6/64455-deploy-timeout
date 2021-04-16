const CommonFooterAddress = () => (
  <div>
    <ul className="uk-list uk-text-small">
      <li>
        <a className="uk-link-muted" href="#">
          <span className="uk-margin-small-right" uk-icon="receiver" />
          <span className="tm-pseudo">+32 800 799 99 99</span>
        </a>
      </li>
      <li>
        <a className="uk-link-muted" href="#">
          <span className="uk-margin-small-right" uk-icon="mail" />
          <span className="tm-pseudo">example@example.com</span>
        </a>
      </li>
      <li>
        <div className="uk-text-muted">
          <span className="uk-margin-small-right" uk-icon="location" />
          <span>Blvd. de Waterloo 59, Brussels, Belgium</span>
        </div>
      </li>
      <li>
        <div className="uk-text-muted">
          <span className="uk-margin-small-right" uk-icon="clock" />
          <span>Daily 10:00–22:00</span>
        </div>
      </li>
    </ul>
  </div>
);

export default CommonFooterAddress;

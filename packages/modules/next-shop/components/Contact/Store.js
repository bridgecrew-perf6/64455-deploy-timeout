const ContactStore = () => (
  <section>
    <h3>Store</h3>
    <ul className="uk-list">
      <li>
        <a className="uk-link-heading" href="#">
          <span className="uk-margin-small-right" uk-icon="receiver" />
          <span className="tm-pseudo">+32 800 799 99 99</span>
        </a>
      </li>
      <li>
        <a className="uk-link-heading" href="#">
          <span className="uk-margin-small-right" uk-icon="mail" />
          <span className="tm-pseudo">example@example.com</span>
        </a>
      </li>
      <li>
        <div>
          <span className="uk-margin-small-right" uk-icon="location" />
          <span>Blvd. de Waterloo 59, Brussels, Belgium</span>
        </div>
      </li>
      <li>
        <div>
          <span className="uk-margin-small-right" uk-icon="clock" />
          <span>Daily 10:00–22:00</span>
        </div>
      </li>
    </ul>
  </section>
);

export default ContactStore;

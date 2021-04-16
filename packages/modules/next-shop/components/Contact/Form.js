const ContactForm = () => (
  <section className="uk-width-1-1">
    <h2 className="uk-text-center">Contact Us</h2>
    <form>
      <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
        <div>
          <label>
            <div className="uk-form-label uk-form-label-required">Name</div>
            <input className="uk-input" type="text" required />
          </label>
        </div>
        <div>
          <label>
            <div className="uk-form-label uk-form-label-required">Email</div>
            <input className="uk-input" type="email" required />
          </label>
        </div>
        <div>
          <label>
            <div className="uk-form-label">Topic</div>
            <select className="uk-select">
              <option>Customer service</option>
              <option>Tech support</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            <div className="uk-form-label">Message</div>
            <textarea className="uk-textarea" rows={5} defaultValue="" />
          </label>
        </div>
        <div className="uk-text-center">
          <button className="uk-button uk-button-primary" type="button">
            Send
          </button>
        </div>
      </div>
    </form>
  </section>
);

export default ContactForm;

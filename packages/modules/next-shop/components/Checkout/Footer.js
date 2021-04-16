const CheckoutFooter = () => (
  <footer>
    <div className="uk-section uk-section-secondary uk-section-small uk-light">
      <div className="uk-container">
        <div className="uk-flex-middle" uk-grid="true">
          <div className="uk-width-expand">
            <div>© Company Name. All rights reserved</div>
          </div>
          <div>
            <a className="uk-link-muted" href="#">
              <span
                className="uk-margin-xsmall-right"
                uk-icon="icon: receiver; ratio: .75;"
              />
              <span className="tm-pseudo">+32 800 799 99 99</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default CheckoutFooter;

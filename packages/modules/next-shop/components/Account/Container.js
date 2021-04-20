const AccountContainer = ({ title, children }) => (
  <div className="uk-width-1-1 uk-width-expand@m">
    <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
      <header className="uk-card-header">
        <h1 className="uk-h2">{title}</h1>
      </header>
      {children}
    </div>
  </div>
);

export default AccountContainer;

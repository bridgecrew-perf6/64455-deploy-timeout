import CommonHeading from '@shop/components/Common/Heading';

const DefaultLayout = ({ children, heading }) => {
  const Heading = heading === null ? null : heading ?? CommonHeading;
  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container">
        <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
          <Heading />
          <section className="tm-page-container">{children}</section>
        </div>
      </div>
    </section>
  );
};

export default DefaultLayout;

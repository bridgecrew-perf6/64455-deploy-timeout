const development = process.env.NODE_ENV === 'development';

const ErrorSection = ({ _type }) => {
  if (development) {
    return (
      <section
        className="tm-section uk-section-danger uk-padding"
        data-section={_type}
      >
        <h3 className="tm-section-title">Invalid type: {_type}</h3>
      </section>
    );
  } else {
    return null;
  }
};

export default ErrorSection;

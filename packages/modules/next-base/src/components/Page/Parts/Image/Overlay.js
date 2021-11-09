export const RenderNull = () => null;

const baseClass =
  'uk-overlay uk-overlay-primary uk-padding-medium uk-position-bottom uk-light';

export const Overlay = ({ image, className }) => {
  if (image.overlay) {
    return (
      <div className={baseClass ? `${baseClass} ${className}` : baseClass}>
        {image.title && (
          <p className="uk-margin-remove-bottom">{image.title}</p>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const SnipcartButton = ({ children, className, disabled, ...props }) => {
  return (
    <button className={className} type="button" disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default SnipcartButton;

const BlockMedia = ({ part, className, ratio, children }) => {
  return (
    <div className={className} uk-ratio={ratio} data-part={part}>
      {children}
    </div>
  );
};

export default BlockMedia;

const Social = props => {
  const { className } = props;
  let clsName = 'uk-iconnav';
  if (typeof className === 'string') clsName += ` ${className}`;
  return (
    <ul className={clsName}>
      <li>
        <a href="#" title="Facebook" uk-icon="facebook" />
      </li>
      <li>
        <a href="#" title="Twitter" uk-icon="twitter" />
      </li>
      <li>
        <a href="#" title="YouTube" uk-icon="youtube" />
      </li>
      <li>
        <a href="#" title="Instagram" uk-icon="instagram" />
      </li>
    </ul>
  );
};

export default Social;

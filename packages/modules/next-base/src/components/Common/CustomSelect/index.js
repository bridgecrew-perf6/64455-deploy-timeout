const Wrapper = ({ children }) => <>{children}</>;

const CustomSelect = props => {
  const {
    label,
    value,
    onChange,
    children,
    items = [],
    wrapperComponent,
  } = props;

  const Component = wrapperComponent ?? Wrapper;

  return (
    <Component {...props}>
      <div uk-form-custom="target: > * > span.label">
        <select defaultValue={value} onChange={onChange}>
          {children}
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <span className="uk-text-emphasis">
          <span className="uk-text-muted uk-margin-xsmall-right">{label}</span>
          <span className="label uk-text-lowercase" />
          <span
            className="uk-margin-xsmall-left"
            uk-icon="icon: chevron-down; ratio: 0.5"
          />
        </span>
      </div>
    </Component>
  );
};

export default CustomSelect;

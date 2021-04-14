import ListItems from './Items';

export default function List({ className, activeClassName, ...props }) {
  return (
    <ul className={className || 'uk-nav uk-nav-default'} {...props}>
      <ListItems activeClassName={activeClassName} />
    </ul>
  );
}

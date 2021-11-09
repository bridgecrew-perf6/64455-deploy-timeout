import { usePage, lookup } from '@foundation/next';

const DemoComponent = ({ item }) => {
  const page = usePage();
  const { options = {} } = item;
  const title = options.title ?? 'Demo Component';
  const className = options.className ?? '';
  const referenceTitle = lookup(
    item.reference,
    ['content', 'title'],
    ['title'],
    ['name']
  );
  return (
    <div
      className={`uk-grid uk-padding uk-margin-top uk-margin-bottom uk-flex ${className}`}
      uk-grid="true"
    >
      <div className="uk-width-expand@s">
        {title} on page: {page.title}
      </div>
      {referenceTitle && (
        <div className="uk-text-warning">Referencing: {referenceTitle}</div>
      )}
    </div>
  );
};

export default DemoComponent;

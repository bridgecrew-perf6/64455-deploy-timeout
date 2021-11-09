import { useMemo } from 'react';
import { PortableText } from '@shop/components/Sanity';
import { lookup } from '@foundation/next';
import { buildImage } from '@app/hooks/image';

const CollectionSection = ({
  item,
  collection,
  result,
  items,
  options = {},
}) => {
  const { isLoading, isSuccess } = result;
  const { showBody } = options;
  const columns = item.columns > 0 ? item.columns : 1;

  const collectionItems = useMemo(() => {
    return items.map(item => {
      const images = item.images ?? [];
      const image = buildImage(images[0], { ratio: '1:1', format: 'jpg' });
      const title = lookup(item, 'label', 'title', 'name');
      const body = lookup(item, 'body', 'description', 'text');
      if (Array.isArray(body)) {
        return { _key: item._key ?? item._id, title, blocks: body, image };
      } else {
        return { _key: item._key ?? item._id, title, text: body, image };
      }
    });
  }, [items]);

  return (
    <>
      {collection?.name && (
        <h3 className="tm-section-title">{collection?.name}</h3>
      )}
      {isLoading && (
        <div
          className="uk-padding uk-background-muted uk-width-1-1 uk-flex uk-flex-center uk-border-rounded"
          uk-spinner="true"
        />
      )}
      {isSuccess && (
        <div className={`uk-grid uk-child-width-1-${columns}@s`} uk-grid="true">
          {collectionItems.map(({ _key, title, text, blocks, image }) => (
            <div key={_key}>
              <div className="uk-card uk-card-small uk-card-secondary">
                {image?.url && (
                  <div
                    className="uk-card-media-top uk-cover-container"
                    style={{ backgroundColor: image?.palette?.background }}
                    uk-ratio="1/1"
                  >
                    <img
                      src={image.url}
                      width={image.width}
                      height={image.height}
                      className="tm-image"
                      alt={title}
                      uk-cover="true"
                    />
                  </div>
                )}
                <div className="uk-card-body">
                  <h3 className="uk-card-title">{title}</h3>
                  {showBody && text && <p>{text}</p>}
                  {showBody && blocks && <PortableText blocks={blocks} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CollectionSection;

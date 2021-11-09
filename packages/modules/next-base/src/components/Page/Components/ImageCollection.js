import { useMemo } from 'react';
import { buildImage } from '@app/hooks/image';

const ImageCollection = ({ collection, result, items }) => {
  const { isLoading, isSuccess } = result;

  const images = useMemo(() => {
    return items.reduce((memo, item) => {
      if (item.url)
        memo.push(buildImage(item, { ratio: '1:1', format: 'jpg' }));
      return memo;
    }, []);
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
        <div
          className="uk-grid uk-grid-small uk-child-width-1-4@s"
          uk-grid="true"
        >
          {images.map(
            ({ _id, url, width, height, originalFilename, palette }) => (
              <div key={_id}>
                <div className="uk-card uk-card-default">
                  {url && (
                    <div style={{ backgroundColor: palette?.background }}>
                      <img
                        src={url}
                        width={width}
                        height={height}
                        className="tm-image"
                        alt={originalFilename}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default ImageCollection;

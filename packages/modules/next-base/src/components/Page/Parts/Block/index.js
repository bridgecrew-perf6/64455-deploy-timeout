import { useMemo } from 'react';
import { get } from '@foundation/next';
import { buildImage } from '@app/hooks/image';

import BlockText from '@shop/components/Page/Parts/Block/Text';
import BlockButton from '@shop/components/Page/Parts/Block/Button';
import BlockMedia from '@shop/components/Page/Parts/Block/Media';
import BlockImage from '@shop/components/Page/Parts/Block/Image';
import BlockImages from '@shop/components/Page/Parts/Block/Images';

const columnMapping = new Map();

columnMapping.set(0, 'uk-width-2-3@s');
columnMapping.set(1, 'uk-width-1-1');
columnMapping.set(2, 'uk-width-1-2@s');
columnMapping.set(3, 'uk-width-1-3@s');
columnMapping.set(4, 'uk-width-1-4@s');

// { title: 'Default', value: 'default' },
// { title: 'Left', value: 'left' },
// { title: 'Right', value: 'right' },
// { title: 'Media - Left', value: 'mediaLeft' },
// { title: 'Media - Right', value: 'mediaRight' },
// { title: 'Media - Left - Full', value: 'mediaLeftFull' },
// { title: 'Media - Right - Full', value: 'mediaRightFull' },

const mediaLayouts = [
  'mediaLeft',
  'mediaRight',
  'mediaLeftFull',
  'mediaRightFull',
];

const Block = ({
  content,
  button,
  foreground,
  hidden = false,
  layout = 'right',
  columns = 2,
  images = [],
  options = {},
}) => {
  const { closable, className = 'tm-expand' } = options;

  const [parts, mediaBlock] = useMemo(() => {
    const parts = [];

    const hasImages = Array.isArray(images) && images.length > 0;
    const media = hasImages && mediaLayouts.includes(layout);
    const fullMedia = layout === 'mediaLeftFull' || layout === 'mediaRightFull';

    const allImages = (hasImages ? images : []).map(image => {
      return buildImage(image, { ratio: image.ratio ?? '3:2' });
    });

    let minHeight = allImages.length > 0 ? 'min-h-[320px]' : '';

    let ratio = hasImages ? get(allImages, [0, 'ratio']) : null;
    if (typeof ratio === 'string') ratio = ratio.replace(':', '/');

    if (content) {
      const contentPart = {
        _key: 'content',
        Component: BlockText,
        props: { ...content, media, layout, hidden },
        className: ['uk-padding', columnMapping.get(columns), foreground]
          .filter(i => i)
          .join(' '),
      };

      if (
        layout === 'right' ||
        layout === 'mediaRight' ||
        layout === 'mediaRightFull'
      ) {
        contentPart.className += ' uk-flex-first@s';
      }

      if (fullMedia) {
        contentPart.className +=
          foreground === 'uk-light'
            ? ' uk-overlay uk-overlay-primary'
            : ' uk-overlay';
      }

      parts.push(contentPart);
    } else if (media) {
      minHeight = 'min-h-[480px]';
    }

    let mediaBlock;

    if (allImages.length > 1) {
      mediaBlock = <BlockImages images={allImages} />;
    } else if (allImages.length === 1) {
      mediaBlock = <BlockImage image={allImages[0]} />;
    }

    if (button?.internal?._id || button?.external) {
      parts.push({
        _key: 'button',
        Component: BlockButton,
        props: { ...button, media, layout, hidden, ratio },
        children: fullMedia ? null : mediaBlock,
        className: `uk-width-expand uk-position-relative tm-height-screen ${minHeight}`,
      });
    } else if (allImages.length > 0) {
      parts.push({
        _key: 'media',
        Component: BlockMedia,
        props: { media, layout, hidden, ratio },
        children: fullMedia ? null : mediaBlock,
        className: `uk-width-expand uk-position-relative tm-height-screen ${minHeight}`,
      });
    }

    return [parts.reverse(), fullMedia ? mediaBlock : null];
  }, [button, columns, content, foreground, hidden, images, layout]);

  return (
    <div className={`uk-position-relative ${className}`} data-layout={layout}>
      <div
        className="tm-block uk-grid uk-grid-collapse uk-position-relative uk-position-z-index"
        uk-grid="true"
        data-columns={columns}
        data-part="main"
      >
        {parts.map(
          ({ _key, Component, props, children, className, closable }) => (
            <Component
              key={_key}
              {...props}
              part={_key}
              className={className}
              closable={closable}
            >
              {children}
            </Component>
          )
        )}
        {closable && (
          <button
            type="button"
            className="uk-light uk-position-absolute uk-position-top-right uk-position-small"
            uk-close="true"
            onClick={closable.onClose}
          />
        )}
      </div>
      {mediaBlock}
    </div>
  );
};

export default Block;

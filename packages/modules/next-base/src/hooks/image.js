import { useMemo, useEffect, useState } from 'react';
import { transparentPixel } from '@foundation/next';

import { get, map, trim, lookup, detect, isBlank } from '@foundation/lib/util';

import { urlFor } from '@atelierfabien/next-sanity';

import config from '@app/config/shop';

export const defaultPalette = {
  foreground: '#000000',
  background: 'transparent',
};

export { urlFor };

function round(x) {
  return Math.ceil(x / 5) * 5;
}

export function parseRatio(ratio) {
  if (typeof ratio === 'number') {
    return ratio;
  } else if (typeof ratio === 'string') {
    const [a, b] = ratio.split(':').map(p => parseInt(trim(p), 10));
    return a / b;
  } else {
    return 3 / 2;
  }
}

export function calculateRatio(ratio, scale = 1) {
  const r = parseRatio(ratio);
  const a = r > 1 ? 1200 : 900;
  const b = r > 1 ? a / r : a * r;
  const width = round(scale * (r > 1 ? a : b));
  const height = round(scale * (r > 1 ? b : a));
  return [width, height, r];
}

export function ratioToString(ratio, width = 1, height = 1) {
  return typeof ratio === 'string'
    ? ratio.replace(':', '/')
    : ratio > 0
    ? `${ratio}/1`
    : `1/${1 / (width / (height || 1) || 1)}`;
}

export const isImage = image => {
  return (
    image &&
    typeof image === 'object' &&
    (!isBlank(image.url) || !isBlank(image._ref) || isImage(image.asset))
  );
};

export const buildPlaceholderImage = (ratio = 1) => {
  const [width, height] = calculateRatio(ratio);
  return {
    url: transparentPixel,
    width,
    height,
    palette: defaultPalette,
    ratio: ratioToString(ratio, width, height),
    invalid: true,
  };
};

export const getImage = (image, options = {}) => {
  const {
    format,
    ratio = 3 / 2,
    scale = 1,
    quality = 85,
    paletteType = 'lightVibrant',
  } = options;

  const invalid = !isImage(image);

  if (invalid && (options.placeholder || image?.asset === null)) {
    const p =
      options.placeholder === true || image?.asset === null
        ? buildPlaceholderImage(ratio)
        : options.placeholder;
    return [p.url, p.palette, p.width, p.height, p.ratio, true];
  }

  const [width, height] = calculateRatio(ratio, scale);

  const imageUrl = urlFor(image).width(width).height(height).auto('format');

  if (typeof format === 'string') imageUrl.format(format);

  if (typeof quality === 'number') imageUrl.quality(quality);

  const palette = lookup(
    image,
    ['asset', 'metadata', 'palette', paletteType],
    ['metadata', 'palette', paletteType]
  ) ?? {
    background: '#ffffff',
  };

  const hasAlpha = lookup(
    image,
    ['asset', 'metadata', 'hasAlpha'],
    ['metadata', 'hasAlpha']
  );

  return [
    imageUrl.url(),
    hasAlpha ? { background: 'transparent' } : palette,
    width,
    height,
    ratioToString(ratio, width, height),
    invalid,
  ];
};

export const buildImage = (image, options = {}) => {
  const [url, palette, width, height, ratio, invalid] = getImage(
    image,
    options
  );

  return {
    _key: image?._key ?? image?._id,
    overlay: Boolean(image?.title || image?.body),
    ...image,
    url,
    palette,
    width,
    height,
    invalid,
    ratio,
  };
};

export const lookupImageSettings = (scope = 'productPage', type = 'image') => {
  const ratio =
    lookup(config, [scope, type, 'ratio'], [type, 'ratio']) ?? '1:1';

  const defaultPlaceholder =
    lookup(config, [scope, type, 'placeholder'], [type, 'placeholder']) ??
    buildPlaceholderImage(ratio);

  const useItemRatio =
    lookup(config, [scope, type, 'useItemRatio'], [type, 'useItemRatio']) ??
    false;

  return { ratio, defaultPlaceholder, useItemRatio };
};

function isRatio(value) {
  return (
    (typeof value === 'string' &&
      (value.indexOf(':') > 0 || value.indexOf('/') > 0)) ||
    typeof value === 'number'
  );
}

export const useImages = (data = {}, layout = 'grid') => {
  const { image, images, ratio, columns, limit = 6, ...props } = data;

  return useMemo(() => {
    const count = Array.isArray(images) ? images?.length : 1;
    const maxImages = Math.min(limit || count, count);
    const items = Array.isArray(images)
      ? images.slice(0, maxImages)
      : [].concat(image || []);

    let _ratio = items.length > 1 ? 3 / 4 : 3 / 2;

    let customRatio = isRatio(ratio)
      ? ratio
      : detect(items, item => (isRatio(item.ratio) ? item.ratio : undefined));

    const customColumns = typeof columns === 'number' && columns > 0;

    let _columns = customColumns
      ? columns
      : items.length % 2 === 0
      ? 2
      : items.length % 3 === 0
      ? 3
      : items.length;

    if (typeof customRatio === 'number' && customRatio > 0) {
      _ratio = customRatio;
    } else if (typeof customRatio === 'string') {
      _ratio = parseRatio(customRatio);
    } else if (layout === 'grid') {
      _ratio = items.length > 2 ? 1 : _ratio;
    } else if (layout === 'slideshow') {
      _ratio = 3 / 2;
    }

    if (!customColumns && layout === 'slider') {
      _columns = items.length > 1 ? 2 : 1;
    } else if (layout === 'slideshow') {
      _columns = 1;
    }

    return [
      items.map(item => buildImage(item, { ratio: _ratio })),
      { ratio: _ratio, columns: _columns },
      props,
    ];
  }, [columns, image, images, layout, limit, props, ratio]);
};

export const useImage = (image, options = {}) => {
  const [images, meta, props] = useImages({ image, ...options });
  return [images[0], meta, props];
};

export const useImageWithPresets = (image, options = {}) => {
  const { scope, presets = [], urls = false } = options;
  const defaults = lookupImageSettings(scope);
  return useMemo(() => {
    return presets.map(preset => {
      let img;
      if (typeof preset === 'string' && preset.indexOf(':') > 0) {
        img = buildImage(image, { ...defaults, ratio: preset });
      } else if (typeof preset === 'string') {
        img = buildImage(image, lookupImageSettings(scope, preset));
      } else if (typeof preset === 'object') {
        img = buildImage(image, { ...defaults, ...preset });
      } else {
        img = buildImage(image, defaults);
      }
      return urls ? img.url : img;
    });
  }, [defaults, image, presets, scope, urls]);
};

export const useSlideshowImages = (items = [], refs = {}) => {
  const [mainImages, setImages] = useState(items);
  const [showCover, setShowCover] = useState(false);
  const mainImage = get(items, [0, '_key']);

  useEffect(() => {
    if (
      window.UIkit &&
      refs.main?.current &&
      refs.cover?.current &&
      mainImage
    ) {
      const main = window.UIkit.slideshow(refs.main.current);
      const cover = window.UIkit.slideshow(refs.cover.current);

      const coverIndex = map(mainImages, '_key').indexOf(mainImage);

      if (
        main &&
        cover &&
        coverIndex > -1 &&
        coverIndex !== cover.getIndex() &&
        !refs.cover.current.isHidden
      ) {
        setShowCover(true);
        setTimeout(() => main?.show(coverIndex), 10);
        setTimeout(() => cover?.show(coverIndex), 20);

        return UIkit.util.on(refs.cover.current, 'itemhidden', () => {
          if (refs.cover?.current) refs.cover.current.isHidden = true;
          setShowCover(false);
          setTimeout(() => setImages(items), 20);
        });
      } else {
        if (refs.cover?.current) refs.cover.current.isHidden = false;
        setShowCover(false);
        setImages(items);
      }
    }
  }, [items, refs.cover, refs.main, mainImage, mainImages]);

  useEffect(() => {
    if (
      window.UIkit &&
      refs.main?.current &&
      refs.cover?.current &&
      mainImage
    ) {
      return UIkit.util.on(refs.main.current, 'itemhidden', () => {
        const main = window.UIkit.slideshow(refs.main.current);
        const cover = window.UIkit.slideshow(refs.cover.current);
        const coverIndex = main.getIndex();
        cover.show(coverIndex);
      });
    }
  }, [mainImage, refs.cover, refs.main]);

  return [mainImages, showCover];
};

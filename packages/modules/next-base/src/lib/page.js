import { lookup, compactObject } from '@foundation/lib/util';

import layoutConfig from '@app/layouts';

export const getOpengraphImage = (item) => {
  // Use the given image, then try the social media image or the first image
  let opengraphImage = lookup(item, ['social', 'image'], ['images', 0]);

  // Try to find the first image inside a section
  if (!opengraphImage && Array.isArray(item.sections)) {
    item.sections.find((s) => {
      const image = s?.asset?.url ? s : lookup(s, ['image'], ['images', 0]);
      const isValid = image?.asset?._type === 'sanity.imageAsset';
      if (isValid) opengraphImage = image;
      return isValid;
    });
  }

  // Try to use the social media image of the layout
  if (!opengraphImage) {
    const layoutImage = lookup(item, ['layout', 'social', 'image']);
    if (layoutImage?.asset?._type === 'sanity.imageAsset') {
      opengraphImage = layoutImage;
    }
  }

  return opengraphImage;
};

export const getPageSeo = (item, image) => {
  const seo = {
    description: lookup(item, ['content', 'intro']),
    image: image ?? getOpengraphImage(item),
  };
  return compactObject(seo);
};

export const getPageLayout = (item, defaultLayout = 'pages') => {
  const identifier = lookup(
    item,
    ['layout', 'page', 'layout'], // try explicit layout
    ['layout', 'identifier'] // try implicit layout
  );
  const definition = lookup(layoutConfig, ['pageLayouts', identifier]);
  const options = lookup(item, ['layout', 'options']) ?? {};
  if (definition) {
    return { layout: identifier, ...options };
  } else {
    return { layout: defaultLayout, ...options };
  }
};

export const getPageType = (item, defaultType = 'default') =>
  lookup(item, ['type'], ['layout', 'page', 'type']) ?? defaultType;

export const getPageNavigation = (item) =>
  item.navigation ?? item.layout?.navigation ?? null;

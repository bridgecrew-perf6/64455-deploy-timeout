import { urlFor } from '@atelierfabien/next-sanity';

const seoImageOptions = {
  width: 1200,
  height: 628,
};

export const resolveSeoImage = image => {
  const { width, height } = seoImageOptions;
  const url = urlFor(image).width(width).height(height).url();
  return { url, ...seoImageOptions };
};

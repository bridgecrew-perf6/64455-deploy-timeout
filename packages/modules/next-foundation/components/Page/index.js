import { PageSeo } from '../../lib';
import { pick } from '../../lib/util';

const SEO_PROPS = [
  'title',
  'noindex',
  'nofollow',
  'robotsProps',
  'description',
  'canonical',
  'openGraph',
  'facebook',
  'twitter',
  'additionalMetaTags',
  'titleTemplate',
  'mobileAlternate',
  'languageAlternates',
  'additionalLinkTags',
];

const Page = ({ children, ...props }) => {
  const seo = pick(props, SEO_PROPS);
  return (
    <>
      <PageSeo {...seo} />
      {children}
    </>
  );
};

export default Page;

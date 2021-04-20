import { usePage, PageSeo } from '../../lib';
import { pick } from '../../lib/util';

const PAGE_PROPS = ['title', 'description'];

const SEO_PROPS = [
  'title',
  'description',
  'noindex',
  'nofollow',
  'robotsProps',
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
  usePage(pick(props, PAGE_PROPS));
  const seo = pick(props, SEO_PROPS);
  return (
    <>
      <PageSeo {...seo} />
      {children}
    </>
  );
};

export default Page;

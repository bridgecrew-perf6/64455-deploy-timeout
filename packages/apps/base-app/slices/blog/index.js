import { useTranslation, defineDataHook, Link } from '@foundation/next';
import Page from '@foundation/components/Page';

import getBlogPosts from './lib/get-blog-posts';

export const useBlogPosts = defineDataHook('blogPosts', async () => {
  const blogPosts = await getBlogPosts();
  return blogPosts.map(({ title, slug }) => ({ title, slug }));
});

function BlogPostIndex() {
  const { t } = useTranslation();
  const blogPosts = useBlogPosts();

  return (
    <Page>
      <Link href="/">
        <a className="hover:no-underline">← {t('app:pages.home')}</a>
      </Link>
      <div className="uk-margin-top">
        <ul className="text-4xl space-y-4 uk-nav uk-nav-default">
          {blogPosts.map(({ title, slug }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

BlogPostIndex.dataHooks = [useBlogPosts];

export default BlogPostIndex;

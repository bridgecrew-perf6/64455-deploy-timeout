import {
  useTranslation,
  createDataHook,
  Link,
  PageSeo,
} from '@foundation/next';
import getBlogPosts from './lib/get-blog-posts';

const useBlogPostIndex = createDataHook('BlogPostIndex', async () => {
  const blogPosts = await getBlogPosts();
  return blogPosts.map(({ title, slug }) => ({ title, slug }));
});

function BlogPostIndex() {
  const { t, lang } = useTranslation();
  const blogPostIndex = useBlogPostIndex();

  return (
    <>
      <PageSeo title={`${t('app:pages.blog')} | ${t('app:blog.overview')}`} />
      <Link href="/">
        <a className="hover:no-underline">← {t('app:pages.home')}</a>
      </Link>
      <div className="uk-margin-top">
        <ul className="text-4xl space-y-4 uk-nav-default">
          {blogPostIndex.map(({ title, slug }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

BlogPostIndex.dataHooks = [useBlogPostIndex];

export default BlogPostIndex;

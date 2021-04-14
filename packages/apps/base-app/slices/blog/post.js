import {
  createDataHook,
  useTranslation,
  Link,
  PageSeo,
} from '@foundation/next';
import getBlogPosts from './lib/get-blog-posts';

const useBlogPost = createDataHook('BlogPost', async context => {
  const slug = context.params?.slug;
  const blogPosts = await getBlogPosts();
  const blogPost = blogPosts.find(post => post.slug === slug);
  return blogPost;
});

function BlogPost() {
  const { t } = useTranslation();
  const { title, content } = useBlogPost();

  return (
    <>
      <PageSeo title={`${t('app:pages.blog')} | ${title}`} />
      <Link href="/blog">
        <a className="hover:no-underline">← {t('app:blog.overview')}</a>
      </Link>
      <div className="space-y-4 uk-margin-top">
        <h2 className="text-4xl">{title}</h2>
        <p>{content}</p>
      </div>
    </>
  );
}

BlogPost.dataHooks = [useBlogPost];

export default BlogPost;

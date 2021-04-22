import {
  getTranslation,
  localePaths,
  getPageProps,
  dataHookProps,
} from '@foundation/next';

import BlogPost from '@slices/blog/post';
import getBlogPosts from '@slices/blog/lib/get-blog-posts';

export const getStaticPaths = async ({ locales }) => {
  const blogPosts = await getBlogPosts();
  const entries = blogPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: localePaths(entries, locales),
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const t = await getTranslation(context.locale, 'app');

  const props = await getPageProps({
    context,
    dataHooks: BlogPost.dataHooks,
    page: ({ blogPost }) => ({
      title: `${t('pages.blog')} | ${blogPost.title}`,
    }),
  });

  const special = !!dataHookProps('blogPost', props)?.special;

  return {
    props: {
      ...props,
      pageLayout: { layout: 'blog', special }, // dynamic layout
    },
  };
};

export default function Post(props) {
  return (
    <div className="uk-container uk-margin-top">
      <BlogPost {...props} />
    </div>
  );
}

// Post.pageLayout = 'blog'; // implicit main layout

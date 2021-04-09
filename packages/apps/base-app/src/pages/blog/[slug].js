import { getDataHooksProps } from 'next-data-hooks';
import { localePaths } from '@mono/next';
import BlogPost from '@slices/blog/post';
import getBlogPosts from '@slices/blog/lib/get-blog-posts';

export const getStaticPaths = async ({ locales }) => {
  const blogPosts = await getBlogPosts();
  const entries = blogPosts.map(({ slug }) => ({ params:  { slug } }));

  return {
    paths: localePaths(entries, locales),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const dataHooksProps = await getDataHooksProps({
    context,
    dataHooks: BlogPost.dataHooks,
  });

  return {
    props: { ...dataHooksProps },
  };
};

export default function Post(props) {
  return (
    <div className="uk-container uk-margin-top">
      <BlogPost {...props} />
    </div>
  )
};

Post.layout = 'blog'; // implicit main layout
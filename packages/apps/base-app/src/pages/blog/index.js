import { getDataHooksProps } from 'next-data-hooks';
import BlogPostIndex from '@slices/blog';

export const getStaticProps = async (context) => {
  const dataHooksProps = await getDataHooksProps({
    context,
    dataHooks: BlogPostIndex.dataHooks,
  });

  return {
    props: { ...dataHooksProps },
  };
};

export default function Blog(props) {
  return (
    <div className="uk-container uk-margin-top">
      <BlogPostIndex {...props} />
    </div>
  )
};

Blog.pageLayout = ['main', 'blog']; // explicit hierarchy
import { getPageProps, getTranslation } from '@foundation/next';
import BlogPostIndex from '@slices/blog';

export const getStaticProps = async context => {
  const t = await getTranslation(context.locale, 'app');

  const props = await getPageProps({
    context,
    dataHooks: BlogPostIndex.dataHooks,
    page: {
      title: `${t('pages.blog')} | ${t('app:blog.overview')}`,
    },
  });

  return {
    props,
  };
};

export default function Blog(props) {
  return (
    <div className="uk-container uk-margin-top">
      <BlogPostIndex {...props} />
    </div>
  );
}

Blog.pageLayout = ['main', 'blog']; // explicit hierarchy

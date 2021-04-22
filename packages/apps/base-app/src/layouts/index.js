import { defaultPageProps } from '@foundation/next';
import MainLayout from '@app/layouts/main';
import BlogLayout from '@slices/blog/layouts/main';

// Contrived example of default page props:

defaultPageProps('main', () => ({ main: true }));

export default {
  appLayout: 'main',
  pageLayouts: {
    main: MainLayout,
    blog: BlogLayout,
  },
};

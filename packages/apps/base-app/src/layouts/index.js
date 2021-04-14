import MainLayout from '@app/layouts/main';
import BlogLayout from '@slices/blog/layouts/main';

export default {
  appLayout: 'main',
  pageLayouts: {
    main: MainLayout,
    blog: BlogLayout,
  },
};

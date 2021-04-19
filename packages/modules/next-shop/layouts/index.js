import MainLayout from '@shop/layouts/main';

import AccountLayout from '@shop/layouts/account';
import CommonLayout from '@shop/layouts/common';
import DefaultLayout from '@shop/layouts/default';
import PagesLayout from '@shop/layouts/pages';

export default {
  appLayout: 'default',
  pageLayouts: {
    root: [MainLayout],
    main: [MainLayout, CommonLayout],
    default: ['main', DefaultLayout],
    account: ['main', AccountLayout],
    pages: ['default', PagesLayout],
  },
};

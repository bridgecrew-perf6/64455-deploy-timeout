import MainLayout from '@shop/layouts/main';

import AccountLayout from '@shop/layouts/account';
import ArticleLayout from '@shop/layouts/article';
import CheckoutLayout from '@shop/layouts/checkout';
import DefaultLayout from '@shop/layouts/default';
import InfoLayout from '@shop/layouts/info';
import PagesLayout from '@shop/layouts/pages';

export default {
  appLayout: 'main',
  pageLayouts: {
    main: MainLayout,
    account: AccountLayout,
    article: ArticleLayout,
    checkout: CheckoutLayout,
    default: DefaultLayout,
    info: InfoLayout,
    pages: PagesLayout,
  },
};

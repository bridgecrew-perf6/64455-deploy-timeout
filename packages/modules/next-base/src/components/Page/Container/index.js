import { usePageOptions } from '@foundation/next';
import Page from '@shop/components/Page';

import Template from '@shop/components/Page/Container/Template';

const Container = ({ children, pageType, ...props }) => {
  const options = usePageOptions();
  return (
    <Page>
      <Template type={pageType ?? options.pageType} {...props}>
        {children}
      </Template>
    </Page>
  );
};

export default Container;

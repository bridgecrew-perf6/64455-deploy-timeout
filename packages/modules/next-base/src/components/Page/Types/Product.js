import { usePropsOrPage, usePageFragments } from '@foundation/next';

import { withPageWithLayout } from '@shop/hooks';

import Sections, { Section } from '@shop/components/Page/Sections';
import Regions from '@shop/components/Page/Regions';

const ProductPage = ({ page, children, inheritFragments = 'layout' }) => {
  const { sections } = usePropsOrPage(page);
  const { header, footer } = usePageFragments(page, inheritFragments);

  return (
    <div className="main-container">
      {header && (
        <Section sectionType="section.fragment" fragment={header} main />
      )}
      {children}
      <div
        className="uk-margin-medium-top uk-margin-medium-bottom"
        data-part="sections"
      >
        <Sections sections={sections} />
        <Regions page={page} render={['image', 'main', 'body']} />
      </div>
      {footer && (
        <Section sectionType="section.fragment" fragment={footer} main />
      )}
    </div>
  );
};

export default withPageWithLayout('product', ProductPage);

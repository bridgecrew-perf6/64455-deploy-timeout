import { get, usePropsOrPage, usePageFragments } from '@foundation/next';

import { withPageWithLayout } from '@shop/hooks';

import Sections, { Section } from '@shop/components/Page/Sections';
import Regions from '@shop/components/Page/Regions';

const DefaultPage = ({ page, children, inheritFragments = 'all' }) => {
  const { content, sections, images, layout } = usePropsOrPage(page);
  const imageOptions = get(layout, ['options', 'images'], {});
  const { header, footer } = usePageFragments(page, inheritFragments);

  return (
    <div className="main-container">
      <section>
        {header && (
          <Section sectionType="section.fragment" fragment={header} main />
        )}
        <article
          className="uk-card uk-card-default uk-card-body uk-article tm-sections tm-ignore-container"
          data-part="sections"
        >
          <Section
            sectionType="section.images"
            images={images}
            layout="grid"
            limit={6}
            {...imageOptions}
          />
          {content && <Section {...content} main />}
          {children}
          <Sections sections={sections} />
          <Regions page={page} render={['image', 'main', 'body']} />
        </article>
        {footer && (
          <Section sectionType="section.fragment" fragment={footer} main />
        )}
      </section>
    </div>
  );
};

export default withPageWithLayout('default', DefaultPage);

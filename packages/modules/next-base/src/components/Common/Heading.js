import { usePagePart, useGlobalContext } from '@foundation/next';

import CommonBreadcrumbs from '@shop/components/Common/Breadcrumbs';

// Example in getStaticProps:

// return getPageProps(context, {
//   page: page,
//   heading: {
//     title: page.title,
//     subtitle: page.subtitle,
//     breadcrumbs
//   },
// });

// To set heading.component to a component, use a beforeRender hook:

// beforeRender((page, { options }) => {
//   if (page._type === 'product') {
//     options.set(['heading', 'component'], () => <h1>Component</h1>);
//   }
// });

const CommonHeading = props => {
  const heading = usePagePart('heading', props);
  const global = useGlobalContext();

  const breadcrumbs = global.breadcrumbs ?? heading?.breadcrumbs ?? [];

  if (heading || breadcrumbs.length > 0) {
    return (
      <div className="tm-page-heading uk-flex uk-flex-column">
        <CommonBreadcrumbs
          items={breadcrumbs}
          className="uk-flex uk-flex-center uk-flex-left@s"
        />
        {heading?.title && (
          <h1 className="uk-margin-small-top uk-margin-remove-bottom uk-flex uk-flex-center uk-flex-left@s">
            {heading.title}
          </h1>
        )}
        {heading?.subtitle && (
          <div className="uk-text-meta uk-margin-xsmall-top uk-flex uk-flex-center uk-flex-left@s">
            {heading.subtitle}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default CommonHeading;

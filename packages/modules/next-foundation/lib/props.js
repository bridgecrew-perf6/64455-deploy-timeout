// Setup @app/lib/with-app-props.js:
//
// export default withCommonProps({
//   props: {
//     globalTitle: 'Hello World!'
//   }
// }, { revalidate: 60 * 60 });
//
// Usage @app/pages/example.js:
//
// import withAppProps from '@app/lib/with-app-props';
//
// export const getStaticProps = withAppProps((ctx) => {
//   return {
//     props: {
//       title: 'Example Page'
//     },
//   }
// });

export function withCommonProps(commonProps, defaults = {}) {
  return async pageProps => {
    return async ctx => {
      let commonData = {};
      if (typeof commonProps === 'function') {
        commonData = (await commonProps(ctx)) ?? { props: {} };
      } else if (typeof commonProps === 'object') {
        commonData = { props: {}, ...commonProps };
      }
      let pageData = {};
      if (typeof pageProps === 'function') {
        pageData = (await pageProps(ctx)) ?? { props: {} };
      } else if (typeof pageProps === 'object') {
        pageData = { props: {}, ...pageProps };
      }
      return {
        ...defaults,
        ...commonData,
        ...pageData,
        props: {
          ...defaults.props,
          ...commonData.props,
          ...pageData.props,
        },
      };
    };
  };
}

export function dataHookProps(key, dataHooksProps = {}) {
  return dataHooksProps?.nextDataHooks?.[key];
}

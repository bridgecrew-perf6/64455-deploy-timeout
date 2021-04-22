import { createDataHook, getDataHooksProps } from 'next-data-hooks';

const definedHooks = {};
const defaultPageHooks = [];

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

export function getDataHook(key) {
  return definedHooks[key];
}

export function defineDataHook(key, getData) {
  definedHooks[key] = createDataHook(key, getData);
  return definedHooks[key];
}

export function dataHookProps(key, dataHooksProps = {}) {
  return dataHooksProps?.nextDataHooks?.[key];
}

export function defaultPageProps(key, data) {
  if (typeof data === 'function') {
    defaultPageHooks.push(createDataHook(`__page__${key}`, data));
  } else if (typeof data === 'object') {
    defaultPageHooks.push(
      createDataHook(`__page__${key}`, () => ({ ...data }))
    );
  }
}

export async function getPageProps({ page, context, dataHooks }) {
  dataHooks = defaultPageHooks.concat(dataHooks || []).reduce((hooks, hook) => {
    if (typeof hook === 'function') return hooks.concat(hook);
    if (typeof hook === 'string' && typeof definedHooks[hook] === 'function') {
      return hooks.concat(definedHooks[hook]);
    } else {
      return hooks;
    }
  }, []);

  const props = await getDataHooksProps({ dataHooks, context });

  props.currentPageProps = defaultPageHooks.reduce((memo, { key }) => {
    return { ...memo, ...dataHookProps(key, props) };
  }, {});

  if (typeof page === 'function') {
    const pageProps = await page({ context, ...props.nextDataHooks });
    if (typeof pageProps === 'object') {
      props.currentPageProps = { ...props.currentPageProps, ...pageProps };
    }
  } else if (typeof page === 'object') {
    props.currentPageProps = { ...props.currentPageProps, ...page };
  }

  return props;
}

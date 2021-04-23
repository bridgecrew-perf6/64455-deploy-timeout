import { createDataHook, getDataHooksProps } from 'next-data-hooks';

const definedHooks = {};

const beforeHooks = [];
const afterHooks = [];

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

export function beforePageHooks(key, data) {
  if (typeof data === 'function') {
    beforeHooks.push(
      createDataHook(`__before__${key}`, async context => {
        return { ...(await data(context)) };
      })
    );
  } else if (typeof data === 'object') {
    beforeHooks.push(createDataHook(`__before__${key}`, () => ({ ...data })));
  }
}

export function afterPageHooks(key, data) {
  if (typeof data === 'function') {
    afterHooks.push(
      createDataHook(`__after__${key}`, async context => {
        return { ...(await data(context)) };
      })
    );
  } else if (typeof data === 'object') {
    afterHooks.push(createDataHook(`__after__${key}`, () => ({ ...data })));
  }
}

export async function getPageProps(context, { page, dataHooks, ...options }) {
  dataHooks = beforeHooks
    .concat(dataHooks || [])
    .concat(afterHooks)
    .reduce((hooks, hook) => {
      if (typeof hook === 'function') return hooks.concat(hook);
      if (
        typeof hook === 'string' &&
        typeof definedHooks[hook] === 'function'
      ) {
        return hooks.concat(definedHooks[hook]);
      } else {
        return hooks;
      }
    }, []);

  context.page = page;
  context.options = options ?? {};

  const props = await getDataHooksProps({ dataHooks, context });

  props.currentPageProps = beforeHooks
    .concat(afterHooks)
    .reduce((memo, { key }) => {
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

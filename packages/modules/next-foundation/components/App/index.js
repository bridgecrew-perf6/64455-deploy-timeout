import { useRef } from 'react';
import { Hydrate } from 'react-query/hydration';
import layoutConfig from '@app/layouts';
import {
  useSettingsProvider,
  withAppLayout,
  LayoutProvider,
  NextDataHooksProvider,
  PageProvider,
  QueryClientProvider,
  QueryClient,
} from '../../lib';

import Head from '../Head';

import '../../config/module';

const withLayout = withAppLayout(layoutConfig);

export default function App({ Component, pageProps, settings }) {
  const { cookie, currentPageProps, currentPageOptions, ...props } = pageProps;
  const Settings = useSettingsProvider(settings);

  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <PageProvider
          Component={Component}
          props={props}
          data={currentPageProps}
          options={currentPageOptions}
        >
          <Head />
          <Settings cookie={cookie}>
            <NextDataHooksProvider {...props}>
              <LayoutProvider
                Component={withLayout(Component, props, currentPageOptions)}
                pageProps={pageProps}
              />
            </NextDataHooksProvider>
          </Settings>
        </PageProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

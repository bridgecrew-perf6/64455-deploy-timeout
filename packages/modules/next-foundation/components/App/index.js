import React, { useRef } from 'react';
import { Hydrate } from 'react-query/hydration';
import layoutConfig from '@app/layouts';
import {
  useSettingsProvider,
  buildLayout,
  LayoutProvider,
  NextDataHooksProvider,
  GlobalContextProvider,
  PageProvider,
  QueryClientProvider,
  QueryClient,
} from '../../lib';

import Head from '../Head';

import '../../config/module';

const useAppLayout = buildLayout(layoutConfig);

function AppLayout({ Component, pageProps }) {
  const LayoutComponent = useAppLayout(Component, pageProps);
  return <LayoutProvider Component={LayoutComponent} pageProps={pageProps} />;
}

function App({ Component, pageProps, settings }) {
  const { cookie, currentPageProps, currentPageOptions, ...props } = pageProps;
  const Settings = useSettingsProvider(settings);

  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <GlobalContextProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <NextDataHooksProvider {...props}>
            <Settings cookie={cookie}>
              <PageProvider
                Component={Component}
                props={props}
                data={currentPageProps}
                options={currentPageOptions}
              >
                <Head />
                <AppLayout Component={Component} pageProps={pageProps} />
              </PageProvider>
            </Settings>
          </NextDataHooksProvider>
        </Hydrate>
      </QueryClientProvider>
    </GlobalContextProvider>
  );
}

export default App;

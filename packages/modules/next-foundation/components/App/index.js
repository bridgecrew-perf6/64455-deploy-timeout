import layoutConfig from '@app/layouts';
import {
  useSettingsProvider,
  withAppLayout,
  LayoutProvider,
  NextDataHooksProvider,
  PageProvider,
} from '../../lib';
import Head from '../Head';

import '../../config/module';

const withLayout = withAppLayout(layoutConfig);

export default function App({ Component, pageProps, settings }) {
  const { cookie, currentPageProps, ...props } = pageProps;
  const Settings = useSettingsProvider(settings);

  return (
    <PageProvider data={currentPageProps}>
      <Head />
      <Settings cookie={cookie}>
        <NextDataHooksProvider {...props}>
          <LayoutProvider
            Component={withLayout(Component, props)}
            pageProps={pageProps}
          />
        </NextDataHooksProvider>
      </Settings>
    </PageProvider>
  );
}

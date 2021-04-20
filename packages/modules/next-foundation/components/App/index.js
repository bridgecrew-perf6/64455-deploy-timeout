import layoutConfig from '@app/layouts';
import {
  useSettingsProvider,
  withAppLayout,
  LayoutTree,
  NextDataHooksProvider,
  PageProvider,
} from '../../lib';
import Head from '../Head';

const withLayout = withAppLayout(layoutConfig);

export default function App({ Component, pageProps, settings }) {
  const { _children, cookie, ...props } = pageProps;
  const Settings = useSettingsProvider(settings);

  return (
    <PageProvider>
      <Head />
      <Settings cookie={cookie}>
        <NextDataHooksProvider {...props}>
          <LayoutTree
            Component={withLayout(Component, props)}
            pageProps={pageProps}
          />
        </NextDataHooksProvider>
      </Settings>
    </PageProvider>
  );
}

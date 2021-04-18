import layoutConfig from '@app/layouts';
import {
  useSettingsContext,
  withAppLayout,
  LayoutTree,
  NextDataHooksProvider,
} from '../../lib';
import Head from '../Head';

const withLayout = withAppLayout(layoutConfig);

export default function App({ Component, pageProps, settings }) {
  const { _children, cookie, ...props } = pageProps;
  const Settings = useSettingsContext(settings);

  return (
    <>
      <Head />
      <Settings cookie={cookie}>
        <NextDataHooksProvider {...props}>
          <LayoutTree
            Component={withLayout(Component, props)}
            pageProps={pageProps}
          />
        </NextDataHooksProvider>
      </Settings>
    </>
  );
}

import { useRouterProgress } from '@foundation/next';

import App from '@shop/components/App';
import GoogleFont from '@foundation/components/GoogleFont';

import { SnipcartHead } from '@shop/components/Snipcart';

import appConfig from '@app/config/app';

const defaultFont = appConfig.defaultFont ?? 'Roboto';

export default function Application(props) {
  const { font = defaultFont } = props;

  useRouterProgress();

  return (
    <>
      <GoogleFont
        href={`https://fonts.googleapis.com/css2?family=${font}&display=swap`}
      />
      <SnipcartHead />
      <App {...props} />
    </>
  );
}

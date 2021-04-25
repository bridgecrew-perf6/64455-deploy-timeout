import {
  beforeRender,
  beforePageHooks,
  afterPageHooks,
} from '@foundation/next';

import App from '@foundation/components/App';

// Global scss
import '@app/styles/main.scss';
import '@foundation/styles/reset.scss';
import '@foundation/styles/tailwind.scss';

// Called on server through getPageProps (in getStaticProps, getServerSideProps):

beforePageHooks('main', async () => ({ main: false }));

afterPageHooks('main', async () => ({ main: true }));

// Will be called on client and server, before a page component is rendered:

beforeRender((data, { Component, props }) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Rendering: %s', Component.name, data, props.pageLayout ?? {});
  }
});

export default App;

import App from '@mono/components/App';
import { Link } from '@mono/next';

// Link settings
Link.defaults.activeClassName = 'uk-active';
Link.defaults.matchClassName = 'uk-active-match';

// Global scss
import '@app/styles/uikit.scss';
import '@app/styles/global.scss';

export default App;

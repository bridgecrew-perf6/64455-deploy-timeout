import { useConfig } from '@foundation/next';

const CommonToolbarMenuAddon = () => {
  const config = useConfig('base');

  return (
    <li>
      <div className="uk-navbar-item">
        {config('tagline') ?? config('title')}
      </div>
    </li>
  );
};

export default CommonToolbarMenuAddon;

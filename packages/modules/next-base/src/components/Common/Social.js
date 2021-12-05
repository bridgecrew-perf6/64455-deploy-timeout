import { get, useConfig } from '@foundation/next';

export const types = [
  { title: 'Website', value: 'website' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'Twitter', value: 'twitter' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'Medium', value: 'medium' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'Pinterest', value: 'pinterest' },
  { title: 'Snapchat', value: 'snapchat' },
  { title: 'TikTok', value: 'tiktok' },
].reduce((memo, type) => {
  memo[type.value] = type;
  return memo;
}, {});

const Social = props => {
  const social = useConfig('shop')('social');

  const { className } = props;
  let clsName = 'uk-iconnav';
  if (typeof className === 'string') clsName += ` ${className}`;

  if (Array.isArray(social) && social.length > 0) {
    return (
      <ul className={clsName}>
        {social
          .filter(s => s.value)
          .map(s => (
            <li key={s.value}>
              <a
                href={s.value}
                title={get(types, [s.type, 'title'])}
                uk-icon={s.type}
              />
            </li>
          ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default Social;

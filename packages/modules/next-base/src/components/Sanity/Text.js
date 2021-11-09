import { PortableText } from '@shop/components/Sanity';

const Text = ({ content, className }) => {
  if (Array.isArray(content)) {
    return (
      <div className={className ?? 'tm-text'}>
        <PortableText blocks={content} />
      </div>
    );
  } else if (typeof content === 'string') {
    return (
      <div className={className ?? 'tm-text'}>
        <p>{content}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Text;

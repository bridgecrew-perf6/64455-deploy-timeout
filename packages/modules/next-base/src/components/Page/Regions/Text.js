import { PortableText } from '@shop/components/Sanity';

const TextRegion = ({ title, subtitle, body }) => {
  return (
    <>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <div>
        <PortableText blocks={body} />
      </div>
    </>
  );
};

export default TextRegion;

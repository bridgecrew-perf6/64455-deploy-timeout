import { createPortableTextComponent } from '@atelierfabien/next-sanity';

import { Link } from '@foundation/next';

import { buildLink } from '@shop/hooks/navigation';

const PortableText = createPortableTextComponent({
  serializers: {
    marks: {
      internalLink: ({ mark, children }) => {
        const { label, href, linkType, valid } = buildLink(mark.reference);
        if (valid) {
          return (
            <Link
              href={href}
              title={label}
              data-link={linkType}
              className="tm-link-content tm-link-internal"
            >
              {children}
            </Link>
          );
        } else {
          return (
            <Link href="#" className="tm-link-content tm-link-invalid">
              {children}
            </Link>
          );
        }
      },
      externalLink: ({ mark, children }) => {
        const { newWindow, href } = mark;
        return newWindow ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="tm-link-content tm-link-external"
          >
            {children}
          </Link>
        ) : (
          <Link href={href} className="tm-link-content tm-link-external">
            {children}
          </Link>
        );
      },
    },
  },
});

export default PortableText;

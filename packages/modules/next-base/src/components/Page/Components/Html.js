import CodeInsertion from '@foundation/components/Code/Insertion';

import { useColumns } from '@app/hooks/layout';

function isHtml({ source }) {
  return source?.language === 'html';
}

const HtmlComponent = ({ item = {} }) => {
  const { _id, code, columns, options = {} } = item;
  const { className } = options;

  const codeSnippets = Array.isArray(code) ? code : [];
  const htmlSnippets = codeSnippets.filter(isHtml);
  const otherSnippets = codeSnippets.filter(c => !isHtml(c));

  const items = useColumns(htmlSnippets, columns);

  if (htmlSnippets.length > 0) {
    return (
      <>
        {otherSnippets.map(code => (
          <CodeInsertion
            key={code._key}
            id={`${_id}-${code._key}`}
            source={code.source}
          />
        ))}

        <div className={`uk-grid uk-grid-collapse ${className}`} uk-grid="true">
          {items.map(code => (
            <CodeInsertion
              key={code._key}
              id={`${_id}-${code._key}`}
              source={code.source}
              className={code.className}
            />
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default HtmlComponent;

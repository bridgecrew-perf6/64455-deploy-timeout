import { useMemo } from 'react';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const Wrapper = ({ children }) => <>{children}</>;

const TableSection = section => {
  const {
    _type,
    title,
    table,
    nested,
    component,
    layout = {},
    style = 'narrow',
    className = '',
  } = section;

  const color = colors.includes(section?.color) ? section.color : 'none';

  let sectionClass =
    !nested && style !== 'framed'
      ? 'tm-expand'
      : color !== 'none'
      ? 'tm-frame'
      : 'tm-none';

  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  if (color !== 'none' && style !== 'wide') sectionClass += ' uk-padding';

  const foreground =
    color === 'none'
      ? ''
      : color === 'muted' || color === 'default'
      ? 'uk-dark'
      : 'uk-light';

  const rows = useMemo(
    () => (Array.isArray(table?.rows) ? table.rows : []),
    [table.rows]
  );

  const header = useMemo(() => {
    if (layout.header && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  }, [rows, layout]);

  const body = useMemo(() => {
    let allRows = [];
    if (rows.length > 0) allRows = layout.header ? rows.slice(1) : rows;
    return allRows.map(row => ({ ...row, cells: row.cells ?? [] }));
  }, [rows, layout]);

  const Component = useMemo(
    () => components[component] ?? components.TableSection ?? Wrapper,
    [component]
  );

  return (
    <section
      className={`tm-section ${className} uk-section-${color} ${foreground} ${sectionClass}`}
      data-section={_type}
    >
      <Component item={section} items={rows} header={header} rows={body}>
        {title && <h3 className="tm-section-title">{title}</h3>}
        <div className="tm-section-body">
          <table className="uk-table uk-table-small uk-table-middle uk-table-divider uk-table-justify uk-table-responsive">
            {header && (
              <thead>
                <tr>
                  {header.cells.map((cell, i) => (
                    <th key={i}>{cell}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, r) => (
                <tr key={r}>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className={
                        i === 0 && layout.sidebar ? 'tm-table-sidebar' : null
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Component>
    </section>
  );
};

export default TableSection;

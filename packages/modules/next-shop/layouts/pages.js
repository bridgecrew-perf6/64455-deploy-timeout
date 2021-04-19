import CommonSidebar from '@shop/components/Common/Sidebar';

const PagesLayout = ({ children }) => (
  <div className="uk-grid-medium" uk-grid="true">
    {/* Content */}
    <section className="uk-width-1-1 uk-width-expand@m">{children}</section>
    {/* Navigation */}
    <CommonSidebar />
  </div>
);

export default PagesLayout;

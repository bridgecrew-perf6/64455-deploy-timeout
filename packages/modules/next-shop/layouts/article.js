import CommonHeader from '@shop/components/Common/Header';
import Advantages from '@shop/components/Advantages';
import ArticleHeader from '@shop/components/Article/Header';
import CommonFooter from '@shop/components/Common/Footer';
import OffcanvasNav from '@shop/components/Offcanvas/Nav';
import OffcanvasCart from '@shop/components/Offcanvas/Cart';

const ArticleLayout = ({ children }) => (
  <div className="tm-page">
    <CommonHeader></CommonHeader>
    <main className="tm-page-main">
      <section className="uk-section uk-section-small">
        <div className="uk-container">
          <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
            <ArticleHeader></ArticleHeader>
            <section className="tm-page-container">{children}</section>
          </div>
        </div>
      </section>
      <Advantages></Advantages>
    </main>
    <CommonFooter></CommonFooter>
    <OffcanvasNav></OffcanvasNav>
    <OffcanvasCart></OffcanvasCart>
  </div>
);

export default ArticleLayout;

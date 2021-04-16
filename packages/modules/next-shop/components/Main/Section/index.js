import MainSectionAbout from '@shop/components/Main/Section/About';
import MainSectionNews from '@shop/components/Main/Section/News';

const MainSection = () => (
  <section className="uk-section uk-section-default uk-section-small">
    <div className="uk-container">
      <div
        className="uk-grid-medium uk-child-width-1-1 uk-child-width-1-2@s"
        uk-grid="true"
      >
        {/* About */}
        <MainSectionAbout />
        {/* News */}
        <MainSectionNews />
      </div>
    </div>
  </section>
);

export default MainSection;

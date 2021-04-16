import CommonFooterMainLeft from '@shop/components/Common/Footer/Main/Left';
import CommonFooterMainRight from '@shop/components/Common/Footer/Main/Right';

const CommonFooterMain = () => (
  <div>
    <nav className="uk-grid-small uk-child-width-1-2" uk-grid="true">
      <CommonFooterMainLeft />
      <CommonFooterMainRight />
    </nav>
  </div>
);

export default CommonFooterMain;

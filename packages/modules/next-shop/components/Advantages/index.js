import AdvantagesItem from '@shop/components/Advantages/Item';

const Advantages = () => (
  <section className="uk-section uk-section-default uk-section-small">
    <div className="uk-container">
      <div uk-slider="true">
        <ul className="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-5@m uk-grid">
          <li>
            <AdvantagesItem />
          </li>
          <li>
            <AdvantagesItem />
          </li>
          <li>
            <AdvantagesItem />
          </li>
          <li>
            <AdvantagesItem />
          </li>
          <li>
            <AdvantagesItem />
          </li>
        </ul>
        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-medium-top" />
      </div>
    </div>
  </section>
);

export default Advantages;

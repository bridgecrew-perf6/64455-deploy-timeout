import BrandsSectionItem from '@shop/components/Brands/Section/Item';

const BrandsSection = () => (
  <section className="uk-card-body" id="A">
    <div uk-grid="true">
      <div className="uk-width-1-1 uk-width-1-6@m">
        <h2 className="uk-text-center">A</h2>
      </div>
      <div className="uk-width-1-1 uk-width-expand@m">
        <ul
          className="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-5@m"
          uk-grid="true"
        >
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
          <li>
            <BrandsSectionItem />
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default BrandsSection;

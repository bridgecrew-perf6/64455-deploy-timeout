import FaqItem from '@shop/components/Faq/Item';

const FaqItems = () => (
  <ul className="uk-list-divider uk-list-large" uk-accordion="multiple: true">
    <FaqItem />
    <FaqItem />
    <FaqItem />
    <FaqItem />
    <FaqItem />
  </ul>
);

export default FaqItems;

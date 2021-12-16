import ProductQuestionsItem from '@shop/components/Product/Questions/Item';

const ProductQuestions = () => (
  <section>
    <ul className="uk-list-divider uk-list-large" uk-accordion="multiple: true">
      <ProductQuestionsItem />
      <ProductQuestionsItem />
      <ProductQuestionsItem />
      <ProductQuestionsItem />
      <ProductQuestionsItem />
    </ul>
  </section>
);

export default ProductQuestions;

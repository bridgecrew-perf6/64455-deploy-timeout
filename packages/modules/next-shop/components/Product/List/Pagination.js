const ProductListPagination = () => (
  <div>
    <ul className="uk-pagination uk-flex-center">
      <li className="uk-active">
        <span>1</span>
      </li>
      <li>
        <a href="#">2</a>
      </li>
      <li>
        <a href="#">3</a>
      </li>
      <li>
        <a href="#">4</a>
      </li>
      <li>
        <a href="#">5</a>
      </li>
      <li className="uk-disabled">
        <span>…</span>
      </li>
      <li>
        <a href="#">20</a>
      </li>
      <li>
        <a href="#">
          <span uk-pagination-next="true" />
        </a>
      </li>
    </ul>
  </div>
);

export default ProductListPagination;

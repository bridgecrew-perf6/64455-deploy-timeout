const CommonSlideshowItem = () => (
  <li
    style={{
      backgroundColor: '#0b0a12',
    }}
  >
    <a href="#">
      <figure className="uk-container uk-height-1-1">
        <img
          src="/images/promo/macbook-new.jpg"
          alt="New Macbook"
          width={1200}
          height={600}
          uk-cover="true"
        />
      </figure>
    </a>
  </li>
);

export default CommonSlideshowItem;

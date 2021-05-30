import CommonAddress from '@shop/components/Common/Address';
import CommonMap from '@shop/components/Common/Map';

const DeliveryPage = () => (
  <article className="uk-card uk-card-default uk-card-small uk-card-body uk-article tm-ignore-container">
    <h2>Pickup from store in Brussels</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet
      venenatis est. Phasellus vitae mauris imperdiet, condimentum eros vel,
      ullamcorper turpis. Maecenas sed libero quis orci egestas vehicula
      fermentum id diam.
    </p>
    <CommonAddress className="uk-margin-bottom" />
    <div className="tm-wrapper">
      <CommonMap className="tm-ratio tm-ratio-16-9" />
    </div>
    <h2>Delivery in Brussels</h2>
    <p>
      Nullam massa sem, mollis ut luctus at, tincidunt a lorem. Aliquam sed
      dictum elit, quis consequat metus. Proin in mauris finibus urna lacinia
      laoreet sed id orci. Pellentesque volutpat tellus sit amet enim rutrum,
      vel eleifend metus consectetur. Sed lacinia urna a neque maximus placerat.
      Praesent blandit hendrerit dui non placerat.
    </p>
    <ul>
      <li>
        Fusce eget lorem ex. Vivamus nisl eros, condimentum at mollis id, tempor
        a risus. Integer pellentesque bibendum est, dapibus lacinia lacus.
      </li>
      <li>
        Vivamus tellus nibh, mattis at aliquam et, vestibulum aliquet leo. Nunc
        cursus lectus ex, laoreet commodo ligula posuere nec.
      </li>
      <li>
        Suspendisse potenti. Vivamus fermentum vitae lacus ut vulputate. Mauris
        sed consectetur nibh.
      </li>
    </ul>
    <h2>Regional Delivery</h2>
    <p>
      Aliquam erat volutpat. Pellentesque sit amet risus odio. Vestibulum id
      porta libero, non interdum libero. Integer pretium tempus viverra. Nulla
      iaculis sed tellus vel luctus. Curabitur maximus quis nibh mattis
      pulvinar. Mauris convallis dapibus justo, at fringilla erat porta at.
      Vivamus at ante nec augue convallis consectetur at vitae orci.
    </p>
    <p>
      Sed a rhoncus felis, quis efficitur orci. Maecenas imperdiet non sapien a
      sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia Curae; Fusce pretium ipsum posuere, congue leo sit amet,
      finibus sem. Morbi aliquam pellentesque egestas. Curabitur sit amet
      commodo ipsum.
    </p>
  </article>
);

export default DeliveryPage;

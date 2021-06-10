import AboutTeam from '@shop/components/About/Team';
import AboutStats from '@shop/components/About/Stats';
import CommonAddress from '@shop/components/Common/Address';
import CommonMap from '@shop/components/Common/Map';

const AboutBody = () => (
  <div className="uk-article-body">
    <p className="uk-text-lead uk-text-center">
      Urabitur justo diam, auctor vitae ornare sit amet, accumsan sed neque.
      Curabitur efficitur lacinia euismod. Nunc dictum sagittis lacus. Etiam
      ultrices nulla orci, in ultrices risus.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac
      tortor sit amet nisi malesuada commodo. Phasellus et tempus justo. Sed
      iaculis dignissim lacinia. Nulla id felis vel ligula tempus sodales vel a
      ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
      quis neque ac elit lacinia laoreet. Sed dolor sem, rutrum ac egestas non,
      tempor nec eros. Etiam lobortis porta viverra. Etiam ut suscipit sem, a
      volutpat mi. Maecenas euismod a lectus ut dapibus. Nulla mattis diam et
      leo lacinia dignissim.
    </p>
    <h2 className="uk-text-center">Our principles</h2>
    <ul className="uk-list uk-list-bullet">
      <li>
        Vestibulum ut mollis est. Fusce iaculis mauris ut tortor convallis
        sollicitudin. Suspendisse porta nulla nibh, id lacinia lacus tempus ut.
        Morbi non arcu aliquam, placerat sapien a, luctus diam. Etiam mattis
        cursus sem, eu maximus nisi bibendum nec. Vivamus ut turpis augue.
        Phasellus vehicula risus sit amet mi luctus malesuada.
      </li>
      <li>
        Curabitur justo diam, auctor vitae ornare sit amet, accumsan sed neque.
        Curabitur efficitur lacinia euismod. Nunc dictum sagittis lacus. Etiam
        ultrices nulla orci, in ultrices risus tincidunt ac. Cras et maximus
        mauris. Morbi aliquam efficitur maximus. Aenean orci diam, auctor a
        mattis eu, consectetur id urna.
      </li>
      <li>
        Morbi faucibus mattis ante. Donec varius neque sem, nec convallis mi
        dictum ut. Duis sit amet massa ac eros luctus egestas. Proin hendrerit
        aliquam metus, ac tincidunt risus viverra at. In viverra, ligula in
        facilisis interdum, dui arcu varius purus, eu blandit mi mi ut diam.
        Phasellus finibus metus sit amet lobortis dapibus. Nunc fringilla ac
        erat vitae elementum. Donec sagittis odio non mi vestibulum accumsan.
      </li>
    </ul>
    <h2 className="uk-text-center">Our team</h2>
    <AboutTeam></AboutTeam>
    <h2 className="uk-text-center">Some stats</h2>
    <AboutStats></AboutStats>
    <h2 className="uk-text-center">Store</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet
      venenatis est. Phasellus vitae mauris imperdiet, condimentum eros vel,
      ullamcorper turpis. Maecenas sed libero quis orci egestas vehicula
      fermentum id diam.
    </p>
    <CommonAddress></CommonAddress>
    <div className="tm-expand">
      <CommonMap className="tm-ratio tm-ratio-16-9" />
    </div>
  </div>
);

export default AboutBody;

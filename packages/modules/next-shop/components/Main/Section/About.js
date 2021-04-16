import { Link } from '@foundation/next';

const MainSectionAbout = () => (
  <section>
    <h2 className="uk-text-center uk-text-left@s">About</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at neque
      vulputate, vestibulum magna in, accumsan urna. Nulla feugiat ipsum ex,
      molestie porttitor nibh faucibus at. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam hendrerit lorem ut finibus semper.
      Donec ac vehicula erat, nec consequat massa.
    </p>
    <p>
      Quisque rhoncus fermentum sapien id congue. Nam at rutrum turpis. Aliquam
      sagittis imperdiet tortor vel dignissim. Ut ipsum nunc, egestas et odio
      id, vestibulum posuere orci. Orci varius natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus.
    </p>
    <div className="uk-text-center uk-text-left@s">
      <Link
        className="uk-link-muted uk-text-uppercase tm-link-to-all"
        href="/about"
      >
        <span>read more</span>
        <span uk-icon="icon: chevron-right; ratio: .75;" />
      </Link>
    </div>
  </section>
);

export default MainSectionAbout;

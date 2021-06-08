import { Link } from '@foundation/next';

const ProductOverview = () => (
  <section>
    <article className="uk-article">
      <div className="uk-article-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod nisl nunc, a dictum magna laoreet eget. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia Curae.
        </p>
        <div className="tm-expand uk-text-center">
          <figure>
            <Link href="/images/articles/macbook-photo.jpg">
              <img src="/images/articles/macbook-photo.jpg" alt="MacBook Pro" />
            </Link>
            <figcaption>MacBook Pro</figcaption>
          </figure>
        </div>
        <p>
          Sed sit amet ante eget nunc dictum auctor sagittis in libero. Aliquam
          ultricies tincidunt nisi, a vestibulum nisi tempor vitae. Praesent
          fermentum sem semper fermentum ultrices. Duis eleifend vel sapien
          dignissim auctor. Vestibulum at commodo leo. In vitae eros ut sapien
          egestas venenatis non sit amet elit. In gravida vitae ante a rutrum.
        </p>
        <h2>Touch Bar</h2>
        <p>
          Vivamus ornare tortor elit, sed rutrum felis iaculis in. Nunc ut
          molestie neque. Aenean vitae elementum arcu, at rutrum ligula.
          Pellentesque fringilla dictum viverra. Vestibulum eu ipsum nec risus
          pharetra iaculis. Donec quis nulla orci. Suspendisse eget dictum
          augue, et lobortis justo. Suspendisse velit dui, sollicitudin quis
          velit nec, tincidunt consequat arcu.
        </p>
        <h2>Retina Display</h2>
        <p>
          Pellentesque dictum imperdiet rutrum. Vestibulum egestas quam eget
          maximus rutrum. Etiam blandit a dolor laoreet vulputate. Nulla
          ullamcorper ipsum et libero finibus, vitae vestibulum odio feugiat.
        </p>
        <figure className="uk-text-center">
          <Link href="/images/articles/macbook-promo-4.jpg">
            <img src="/images/articles/macbook-promo-4.jpg" alt="MacBook Pro" />
          </Link>
        </figure>
        <h2>Force Touch Trackpad</h2>
        <p>
          Vivamus ornare tortor elit, sed rutrum felis iaculis in. Nunc ut
          molestie neque. Aenean vitae elementum arcu, at rutrum ligula.
          Pellentesque fringilla dictum viverra. Vestibulum eu ipsum nec risus
          pharetra iaculis. Donec quis nulla orci. Suspendisse eget dictum
          augue, et lobortis justo. Suspendisse velit dui, sollicitudin quis
          velit nec, tincidunt consequat arcu.
        </p>
        <div className="tm-expand">
          <figure className="tm-ratio tm-ratio-16-9">
            <iframe
              src="https://www.youtube.com/embed/ysRigNyavF4"
              frameBorder={0}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </figure>
        </div>
        <p>
          Ut arcu lacus, tempus bibendum purus sed, iaculis sollicitudin sapien.
          Donec quis imperdiet arcu. Ut sagittis ipsum diam, nec tempor ex
          fermentum a. Nam ac vehicula erat. Curabitur id congue risus, vel
          iaculis enim. Donec tristique lacinia velit eu fringilla. Mauris
          lectus enim, aliquet eu dolor sed, porta vehicula lacus. Etiam luctus
          egestas scelerisque. Sed sit amet metus ante. Cras pulvinar
          sollicitudin nisl nec egestas. Maecenas vitae velit ut urna vestibulum
          venenatis ut vel ex. Quisque sit amet mattis ante. Duis blandit nisl
          non commodo rutrum. Nulla in velit ut arcu efficitur laoreet ut eu
          mauris. Duis condimentum vulputate consequat. Vestibulum aliquet
          suscipit purus.
        </p>
        <figure uk-slideshow="true">
          <div className="uk-position-relative uk-visible-toggle uk-light">
            <ul className="uk-slideshow-items">
              <li>
                <img
                  src="/images/articles/macbook-promo-1.jpg"
                  alt="MacBook Pro"
                  uk-cover="true"
                />
              </li>
              <li>
                <img
                  src="/images/articles/macbook-promo-2.jpg"
                  alt="MacBook Pro"
                  uk-cover="true"
                />
              </li>
            </ul>
            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-previous="true"
              uk-slideshow-item="previous"
            />
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-next="true"
              uk-slideshow-item="next"
            />
          </div>
          <ul className="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin" />
        </figure>
        <p>
          Mauris dignissim non nulla quis sollicitudin. Maecenas quis orci dui.
          Suspendisse pharetra facilisis metus, at venenatis nisl convallis et.
          Curabitur vulputate eget nisl sed dignissim. Sed eget metus ut orci
          volutpat gravida.
        </p>
        <blockquote className="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">
            Mophie's latest battery pack is powerful enough to charge your
            15-inch MacBook Pro{' '}
            <a href="https://t.co/jN4RzcxOyG">https://t.co/jN4RzcxOyG</a>{' '}
            <a href="https://t.co/5oJBKZRVBx">pic.twitter.com/5oJBKZRVBx</a>
          </p>
          — The Verge (@verge){' '}
          <a href="https://twitter.com/verge/status/948539601265872896?ref_src=twsrc%5Etfw">
            January 3, 2018
          </a>
        </blockquote>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sem
          urna, accumsan nec velit et, convallis tincidunt enim. Proin
          sollicitudin, metus at interdum tempus, velit mi posuere nisl, nec
          viverra ligula lorem sit amet felis. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <table className="uk-table uk-table-large uk-table-middle uk-table-divider uk-table-justify uk-table-responsive">
          <thead>
            <tr>
              <th />
              <th className="uk-width-1-4 uk-text-center">MacBook Pro 13"</th>
              <th className="uk-width-1-4 uk-text-center">
                MacBook Pro 13" with Touch Bar
              </th>
              <th className="uk-width-1-4 uk-text-center">
                MacBook Pro 15" with Touch Bar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Dimensions</th>
              <td>0.59 × 11.97 × 8.36 inches</td>
              <td>0.59 × 11.97 × 8.36 inches</td>
              <td>0.61 × 13.75 × 9.48 inches</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>3.02 pounds</td>
              <td>3.02 pounds</td>
              <td>4.02 pounds</td>
            </tr>
            <tr>
              <th>Display</th>
              <td>
                13.3" 2560×1600,
                <br />
                60Hz Retina Display
              </td>
              <td>
                13.3" 2560×1600,
                <br />
                60Hz Retina Display
              </td>
              <td>
                15.4" 2880×1800,
                <br />
                60Hz Retina Display
              </td>
            </tr>
            <tr>
              <th>Inputs</th>
              <td>
                2 × USB-C Ports,
                <br />1 × 3.5mm Headphone Jack
              </td>
              <td>
                4 × USB-C Ports,
                <br />1 × 3.5mm Headphone Jack
              </td>
              <td>
                4 × USB-C Ports,
                <br />1 × 3.5mm Headphone Jack
              </td>
            </tr>
            <tr>
              <th>Battery Life</th>
              <td>Approximately 10 hours</td>
              <td>Approximately 10 hours</td>
              <td>Approximately 10 hours</td>
            </tr>
          </tbody>
        </table>
        <p>
          Sed at diam aliquet, fringilla turpis ac, consequat ante. Duis id
          maximus purus. Cras rutrum erat non nibh accumsan, vitae maximus
          sapien elementum. Maecenas tellus libero, vulputate vitae mi eu,
          volutpat ornare felis. Nulla malesuada nunc urna, quis rutrum massa
          consequat id. Pellentesque elit diam, dignissim a lorem eu, tincidunt
          mollis erat.
        </p>
        <div className="tm-expand">
          <figure className="uk-text-center">
            <Link href="/images/articles/macbook-promo-3.jpg">
              <img
                src="/images/articles/macbook-promo-3.jpg"
                alt="MacBook Pro"
              />
            </Link>
            <figcaption>13-inch and 15-inch</figcaption>
          </figure>
        </div>
        <p>
          Sed at diam aliquet, fringilla turpis ac, consequat ante. Duis id
          maximus purus. Cras rutrum erat non nibh accumsan, vitae maximus
          sapien elementum. Maecenas tellus libero, vulputate vitae mi eu,
          volutpat ornare felis. Nulla malesuada nunc urna, quis rutrum massa
          consequat id. Pellentesque elit diam, dignissim a lorem eu, tincidunt
          mollis erat.
        </p>
        <blockquote cite="#">
          <p className="uk-margin-small-bottom">
            You can converge a toaster and refrigerator, but these things are
            probably not going to be pleasing to the user.
          </p>
          <footer>Tim Cook</footer>
        </blockquote>
      </div>
    </article>
  </section>
);

export default ProductOverview;

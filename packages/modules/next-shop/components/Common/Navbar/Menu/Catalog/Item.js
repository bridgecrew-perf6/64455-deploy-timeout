import { Link } from '@foundation/next';
import CommonNavbarMenuCatalogDropdown from '@shop/components/Common/Navbar/Menu/Catalog/Dropdown';

const CommonNavbarMenuCatalogItem = () => (
  <li>
    <Link href="/catalog">
      Catalog
      <span
        className="uk-margin-xsmall-left"
        uk-icon="icon: chevron-down; ratio: .75;"
      />
    </Link>
    <CommonNavbarMenuCatalogDropdown></CommonNavbarMenuCatalogDropdown>
  </li>
);

export default CommonNavbarMenuCatalogItem;

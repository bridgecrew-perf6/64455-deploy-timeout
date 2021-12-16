import { Link } from '@foundation/next';
import CommonNavbarMenuCatalogDropdown from '@shop/components/Common/Navbar/Menu/Catalog/Dropdown';

const CommonNavbarMenuCatalogItem = () => (
  <>
    <Link as="li" href="/catalog" partial>
      Catalog
      <span
        className="uk-margin-xsmall-left"
        uk-icon="icon: chevron-down; ratio: .75;"
      />
    </Link>
    <CommonNavbarMenuCatalogDropdown />
  </>
);

export default CommonNavbarMenuCatalogItem;

import { Link } from '@foundation/next';
import CommonNavbarMenuBrandsDropdown from '@shop/components/Common/Navbar/Menu/Brands/Dropdown';

const CommonNavbarMenuBrandsItem = () => (
  <>
    <Link as="li" href="/brands" partial>
      Brands
      <span
        className="uk-margin-xsmall-left"
        uk-icon="icon: chevron-down; ratio: .75;"
      />
    </Link>
    <CommonNavbarMenuBrandsDropdown />
  </>
);

export default CommonNavbarMenuBrandsItem;

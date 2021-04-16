import { Link } from '@foundation/next';
import CommonNavbarMenuBrandsDropdown from '@shop/components/Common/Navbar/Menu/Brands/Dropdown';

const CommonNavbarMenuBrandsItem = () => (
  <li>
    <Link href="/brands">
      Brands
      <span
        className="uk-margin-xsmall-left"
        uk-icon="icon: chevron-down; ratio: .75;"
      />
    </Link>
    <CommonNavbarMenuBrandsDropdown></CommonNavbarMenuBrandsDropdown>
  </li>
);

export default CommonNavbarMenuBrandsItem;

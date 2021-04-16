import CategoryFiltersPrice from '@shop/components/Category/Filters/Price';
import CategoryFiltersBrand from '@shop/components/Category/Filters/Brand';
import CategoryFiltersType from '@shop/components/Category/Filters/Type';
import CategoryFiltersScreenSize from '@shop/components/Category/Filters/Screen/Size';
import CategoryFiltersScreenResolution from '@shop/components/Category/Filters/Screen/Resolution';
import CategoryFiltersProcessor from '@shop/components/Category/Filters/Processor';
import CategoryFiltersMemory from '@shop/components/Category/Filters/Memory';
import CategoryFiltersReset from '@shop/components/Category/Filters/Reset';

const SubcategoryFiltersAccordion = () => (
  <div
    className="uk-margin-remove uk-flex-1 uk-overflow-auto"
    uk-accordion="multiple: true; targets: > .js-accordion-section"
    style={{
      flexBasis: 'auto',
    }}
  >
    {/* Prices */}
    <CategoryFiltersPrice></CategoryFiltersPrice>
    {/* Properties */}
    <CategoryFiltersBrand></CategoryFiltersBrand>
    <CategoryFiltersType></CategoryFiltersType>
    <CategoryFiltersScreenSize></CategoryFiltersScreenSize>
    <CategoryFiltersScreenResolution></CategoryFiltersScreenResolution>
    <CategoryFiltersProcessor></CategoryFiltersProcessor>
    <CategoryFiltersMemory></CategoryFiltersMemory>
    <CategoryFiltersReset></CategoryFiltersReset>
  </div>
);

export default SubcategoryFiltersAccordion;

import Banner from "@components/Banner/Banner";
import BrandCategory from "@components/Category/BrandCategory";
import FeaturedCategory from "@components/Category/FeaturedCategory";
import HotSaleProduct from "@components/Category/HotSaleProduct";
import ProductCategory from "@components/Category/ProductCategory";
import TrendProduct from "@components/Category/TrendProduct";

const HomePageOld = () => {
  return (
    <div className="">
      <div className="container px-8 py-10">
        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-3">
          <Banner className="h-80" images={[]} />
        </div>
        <div className="mt-5">
          <FeaturedCategory />
        </div>
        <div className="mt-5">
          <TrendProduct />
        </div>
      </div>
      <div>
        <HotSaleProduct />
      </div>
      <div className="pt-20">
        <ProductCategory />
      </div>
      <div className="pt-20">
        <ProductCategory />
      </div>
      <div className="pt-20">
        <BrandCategory />
      </div>
    </div>
  );
};

export default HomePageOld;

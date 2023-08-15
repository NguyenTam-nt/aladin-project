import CategoryCard from "@components/Card/CategoryCard";

const FeaturedCategory = () => {
  return (
    <div className="featured-category__background rounded-lg">
      <div className="py-12 px-16">
        <h1 className="text-normal2 text-main font-medium uppercase">
          Danh mục nổi bật
        </h1>
        <div className="py-5 grid grid-cols-6 gap-5">
          {[1, 2, 3, 4, 5, 6].map((it, idx) => (
            <CategoryCard key={idx} src="/category.png" label="Máy tính" />
          ))}
        </div>
      </div>

      <div className="px-16 py-4 bg-main rounded-md">
        <p className="text-center text-normal1 font-medium text-white">
          Mua ngay trong tuần để được giao hàng miễn phí!
        </p>
      </div>
    </div>
  );
};

export default FeaturedCategory;

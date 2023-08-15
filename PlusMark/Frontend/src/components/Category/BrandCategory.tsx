import Banner from "@components/Banner/Banner";
import TopicFlag from "@components/Flag/TopicFlag";

const BrandCategory = () => {
  return (
    <div className="py-2 pb-10">
      <TopicFlag color="icon" title="Chuyên trang thương hiệu" />
      <div className="py-10 container grid grid-cols-3 gap-5">
        {[1, 2, 3].map((it, idx) => (
          <Banner className="h-52" />
        ))}
      </div>
      <div className="container bg-white rounded-md">
        <Banner className="h-52 border" />
      </div>
    </div>
  );
};

export default BrandCategory;

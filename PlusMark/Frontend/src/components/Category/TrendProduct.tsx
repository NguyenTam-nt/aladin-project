import Banner from "@components/Banner/Banner";
import TrendCard from "@components/Card/TrendCard";
const data = {
  src: "/category.png",
  title: "Sắm ti vi to",
  description: "Giảm đến 35%",
};

const TrendProduct = () => {
  return (
    <div>
      <h1 className="text-main text-normal2 font-medium uppercase px-16 py-4">
        Xu hướng mua sắm
      </h1>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid grid-cols-2 gap-5 px-10 py-7 rounded-md shadow bg-white h-fit">
          {[1, 2, 3, 4].map((it, idx) => (
            <TrendCard key={idx} data={data} />
          ))}
        </div>
        <div className="grid grid-rows-2 gap-5">
          <Banner className="" />
          <Banner className="" />
        </div>
      </div>
    </div>
  );
};

export default TrendProduct;

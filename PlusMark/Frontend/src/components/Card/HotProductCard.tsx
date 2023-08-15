import Banner from "@components/Banner/Banner";

const HotProductCard = () => {
  return (
    <div
      className="pb-2"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #00000000 60%, var(--main-background) 60%, var(--main-background) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="container hot-product-card__background py-10">
        <div className="grid grid-cols-2 gap-10">
          <Banner className="h-auto" />
          <div className="py-3">
            <h1 className="text-title font-medium text-main">
              XIAOMI 13 series
            </h1>
            <p className="text-normal1 font-bold text-icon py-7">
              Số lượng có hạn, mua ngay để nhận ưu đãi tốt nhất!
            </p>
            <button className="btn bg-button text-normal1 text-main">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProductCard;

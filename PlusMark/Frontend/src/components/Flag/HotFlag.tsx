const HotFlag = () => {
  return (
    <div
      className="h-10 w-11 bg-icon py-2"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 10px), 0 100%)" }}
    >
      <p className="text-center text-white text-wap-regular1">Hot</p>
    </div>
  );
};

export default HotFlag;

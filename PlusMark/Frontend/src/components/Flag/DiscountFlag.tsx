interface Props {
  value?: string | number;
}
const DiscountFlag = (props: Props) => {
  return (
    <div
      className="h-10 w-28 px-3 flex items-center bg-main text-normal1 font-semibold text-white"
      style={{
        clipPath: "polygon(0 0,100% 0, calc(100% - 20px) 50%, 100% 100%, 0 100%)",
      }}
    >{`-${props.value}%`}</div>
  );
};

export default DiscountFlag;

interface Props {
  value?: string | number;
}
const HotDiscountFlag = (props: Props) => {
  return (
    <div
      className="py-2  px-3 flex items-center bg-main text-normal2 font-semibold text-white rounded-tl-lg rounded-br-lg"
    >{`-${props.value}%`}</div>
  );
};

export default HotDiscountFlag;

interface Props {
  label?: string;
  src?: string;
}
const CategoryCard = (props: Props) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <img
        className="w-full h-20 object-contain"
        src={props.src}
        alt="category"
      />
      <p className="text-center text-main text-wap-regular1 pt-4">{props.label}</p>
    </div>
  );
};

export default CategoryCard;

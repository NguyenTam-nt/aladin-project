import { CircleArrowRightIcon } from "@assets/icons";
import HotFlag from "@components/Flag/HotFlag";
import { Link } from "react-router-dom";

interface Data {
  [key: string]: any;
}
interface Props {
  data: Data;
}

const TrendCard = (props: Props) => {
  const { data } = props;
  return (
    <div className="w-full h-full px-5 py-3 relative">
      <img className="w-full h-32 object-contain" src={data.src} alt="trend" />
      <div className="py-3 flex items-end justify-between">
        <div>
          <h1 className="text-wap-regular2 text-main py-2">{data.title}</h1>
          <p className="text-wap-regular1 text-icon">{data.description}</p>
        </div>
        <Link to="/">
          <CircleArrowRightIcon />
        </Link>
      </div>
      {!data.isHot && (
        <div className="absolute z-1 top-0 left-0">
          <HotFlag />
        </div>
      )}
    </div>
  );
};

export default TrendCard;

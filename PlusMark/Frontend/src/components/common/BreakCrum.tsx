import { NextArrowIcon } from "@assets/icons";
import { ROUTES } from "@utility/constants";
import { Link } from "react-router-dom";

interface Props {
  data: { [key: string]: any }[];
}

const fakeArr = [1, 2, 3, 4];
const data = fakeArr.map((it, idx) => {
  return {
    label: "label",
    src: "/",
    type: idx == fakeArr.length - 1 ? "product" : "category",
  };
});
const BreakCrum = () => {
  return (
    <div className="flex items-center gap-3 text-wap-regular2 text-main py-4">
      <Link className="" to={ROUTES.homepage}>
        Trang chủ
      </Link>
      {data.map((it, idx) => (
        <div className="flex items-center">
          <NextArrowIcon className="w-2 fill-background-100 mr-3" />
          <Link
            className={`${data.length - 1 == idx ? "text-icon" : ""}`}
            to={it.src}
          >
            {it.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BreakCrum;

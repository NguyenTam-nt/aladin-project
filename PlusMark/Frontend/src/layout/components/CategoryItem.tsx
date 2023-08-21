import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdow";
import useFocusOut from "@hooks/useFocusOut";
import { some } from "@utility/helper";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { ROUTES } from "@utility/constants";
import { CategoryHeader } from "./Header";

interface Props {
  data: CategoryHeader;
}

const CategoryItem = ({ data }: Props) => {
  const { hoverShow, setHoverShow, ref: dropdownRef } = useFocusOut();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [navbarParam, setNavbarParam] = useState<string>("");

  useEffect(() => {
    setNavbarParam(searchParams.get("navbar") || "");
  }, [searchParams]);

  const handleClickParrent = () => {
    navigate(`${ROUTES.search.filter}?navbar=` + data.text);
  };

  return (
    <div
      className={clsx(
        "py-3 flex items-center text-normal1 hover:text-main border-b-2 hover:border-b-main cursor-pointer",
        {
          "text-main border-b-main": navbarParam == data.text,
          "border-b-transparent": navbarParam != data.text,
        }
      )}
      ref={(ref) => (dropdownRef.current = ref)}
    >
      <p className="uppercase font-semibold " onClick={handleClickParrent}>
        {data.text}
      </p>
      {hoverShow && <CategoryDropdown items={data.items} navbar={data.text} />}
    </div>
  );
};

export default CategoryItem;

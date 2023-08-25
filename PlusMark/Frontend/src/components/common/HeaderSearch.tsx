import { SearchIcon } from "@assets/icons";
import useFocusOut from "@hooks/useFocusOut";
import useI18n from "@hooks/useI18n";
import SearchDropdown from "@layout/components/SearchDropDown";
import { ROUTES } from "@utility/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

// interface Props {
//   className?: string;
//   placeHolder?: string;
//   value: string;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
// }

const HeaderSearch = () => {
  const { t } = useI18n();
  const { clickShow, setClickShow, ref: searchRef } = useFocusOut();
  const [keyword, setkeyword] = useState("");

  return (
    <div className="relative flex justify-end" ref={searchRef}>
      {clickShow && (
        <SearchDropdown keyword={keyword} close={() => setClickShow(false)} />
      )}
      <div className={`relative`}>
        <input
          value={keyword}
          onChange={(e: any) => setkeyword(e.target.value)}
          className={`w-full  hidden h-8 rounded-full outline-none border-main focus:border text-wap-regular2 pl-5 pr-20`}
          placeholder={t("placeholder.key_search") as string}
          onFocus={() => setClickShow(true)}
        />
        <Link
          to={`${ROUTES.search.index}?keyword=${keyword}`}
          className="flex justify-center items-center top-0 h-full xl:absolute right-0 pl-5 sc480:pr-5 pr-0 bg-transparent"
        >
          {/* <SearchIcon className="" stroke={"var(--main-color) "} /> */}
          <SearchIcon className="" stroke={"white"} />
        </Link>
      </div>
    </div>
  );
};

export default HeaderSearch;

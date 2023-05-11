import { Ilanguage, TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import { useContext } from "react";

export const HeaderItemFlag = ({text, image, isWhite = true, type}:{text: string; image: string, isWhite?: boolean, type:Ilanguage}) => {
    const { t, setLanguage } = useContext(TranslateContext);
    const handleChangeLang = () => {
      setLanguage(type)
    }
    return (
      <div onClick={handleChangeLang} className="flex items-center">
        <div >
          <img src={image} className="h-[24px] object-cover" alt="vn flag" />
        </div>
        <span className={clsx("text-[14px] block w-7 font-normal mx-[8px]", {
          "text-text_white": isWhite,
          "text-text_black": !isWhite
        })}>
          {t(text)}
        </span>
      </div>
    );
  };
  
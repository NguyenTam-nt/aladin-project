import { TranslateContext } from "@contexts/Translation";
import { useContext } from "react";

export const HeaderItemFlag = ({text, image}:{text: string; image: string}) => {
    const { t } = useContext(TranslateContext);
    return (
      <>
        <div>
          <img src={image} className="h-[24px] object-cover" alt="vn flag" />
        </div>
        <span className="text-[14px] font-normal mx-[8px]">
          {t(text)}
        </span>
      </>
    );
  };
  
import clsx from "clsx";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  forId?: string;
  isRequired?: boolean;
  name: string;
  isNormal?: boolean;
};

const TitleInput = ({
  forId,
  isRequired = true,
  isNormal = false,
  name,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "flex items-center  font-NunitoSans leading-[22px] text-black-bl0 mb-2",
        {
          "text-sm font-normal": isNormal,
          "text-normal1 font-semibold": !isNormal,
        }
      )}
    >
      <label htmlFor={forId}>{t(name)}</label>
      {isRequired ? <span className="text-red-r03 ml-1">*</span> : null}
    </div>
  );
};

export default TitleInput;

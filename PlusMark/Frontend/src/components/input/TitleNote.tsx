import clsx from "clsx";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  forId?: string;
  name: string;
  isNormal?: boolean;
  option?: any;
};

const TitleNote = ({
  forId,
  isNormal = false,
  name,
  option,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "flex items-center font-NunitoSans leading-[22px] text-grey-A1A0A3 mb-2",
        {
          "text-sm font-normal": isNormal,
          "text-normal1 font-semibold": !isNormal,
        }
      )}
    >
      <label htmlFor={forId}>{t(name, { number: option })}</label>
    </div>
  );
};

export default TitleNote;

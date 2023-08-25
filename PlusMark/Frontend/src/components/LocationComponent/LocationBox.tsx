import CloseIconElm from "@assets/iconElements/CloseIconElm";
import DynamicButton from "@components/Buttons/DynamicButton";
import CricleButton from "@components/Buttons/CricleButton";
import useI18n from "@hooks/useI18n";
import CardItem from "@components/Card/CardItem";
import province_data from "../../utility/province_date.json";
import { useEffect, useState } from "react";
import Item from "antd/es/list/Item";
import clsx from "clsx";
import React from "react";
// "proxy": "http://192.168.1.123:8888",

interface Props {
  onClose?: () => void;
  closeRef?: any;
}
const LocationBox = React.forwardRef(({ onClose, closeRef }: Props) => {
  const { t } = useI18n();
  const [provinces, setProvince] = useState<{ Id: string; name: string }[]>([]);
  const [idProvince, setIdProvince] = useState<string>();
  useEffect(() => {
    setProvince(
      province_data.map((items) => {
        return {
          Id: items.Id,
          name: items.Name.includes("Tỉnh")
            ? items.Name.slice(4)
            : items.Name.slice(9),
        };
      })
    );
  }, []);
  return (
    <div className="w-full shadow">
      <div className="p-spc14 bg-aqua-aq02">
        <div className="flex items-center justify-between">
          <p className="text_base text-white max-w-3/4">
            {t("text.title.get_location")}
          </p>
          <div ref={closeRef}>
            <CricleButton className="!border-white " icon={<CloseIconElm />} />
          </div>
        </div>
        <div className="mt-6">
          <input
            className="w-full rounded-full px-3 h-8 text-xs placeholder:text-text-disable"
            placeholder={t("placeholder.search_location")}
          />
        </div>
      </div>

      <div className="bg-white">
        <p className="text-base font-bold text-center text-text-disable py-3">
          {t("text.title.chose_city_or_province")}
        </p>
        <div className="h-[500px] overflow-y-auto aqua_scroll">
          <div className="grid grid-cols-2 border-t ">
            {provinces.map((provin, index) => {
              return (
                <div
                  key={provin.Id}
                  className={clsx(
                    "sc-480:text-base text-sm font-normal pl-3 pr-5 h-spc50 ",
                    {
                      "border-none": index + 1 == provinces.length,
                      "border-b": index + 1 != provinces.length,
                    }
                  )}
                >
                  <div
                    onClick={() => setIdProvince(provin.Id)}
                    className={clsx(
                      "px-2 h-full w-full text-text-main flex items-center",
                      {
                        "rounded-lg bg-aqua-aq03 ": provin.Id == idProvince,
                      }
                    )}
                  >
                    {provin.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default LocationBox;

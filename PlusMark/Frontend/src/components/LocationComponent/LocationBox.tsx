import CloseIconElm from "@assets/iconElements/CloseIconElm";
import DynamicButton from "@components/Buttons/DynamicButton";
import CricleButton from "@components/Buttons/CricleButton";
import useI18n from "@hooks/useI18n";
import CardItem from "@components/Card/CardItem";
// "proxy": "http://192.168.1.123:8888",

interface Props {
  onClose?: () => void;
}
const LocationBox = ({ onClose }: Props) => {
  const { t } = useI18n();
  return (
    <div className="w-[510px] ">
      <div className="p-spc14 bg-aqua-aq02">
        <div className="flex items-center justify-between">
          <p className="text_base text-white max-w-3/4">
            {t("text.title.get_location")}
          </p>
          <CricleButton className="!border-white " icon={<CloseIconElm />} />
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
        <div className="h-[500px] overflow-y-auto">
          <div className="grid grid-cols-2">
            <div className="h-spc50 text-black-bl0 flex items-center justify-center border-t">
              adsf
            </div>
            <div className="h-spc50 text-black-bl0 flex items-center justify-center border-t">
              adsfasd
            </div>
            <div className="h-spc50 text-black-bl0 flex items-center justify-center border-t">
              adsf
            </div>
            <div className="h-spc50  text-black-bl0 flex items-center justify-center border-t">
              adsfasd
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBox;

import KakaoTalkIcon from "@assets/iconElements/KakaoTalkIcon";
import ZaloIcon from "@assets/iconElements/ZaloIcon";
import {
  CricleContactSvg,
  ImgHomeContact,
  MessageContact,
} from "@assets/icons";
import useI18n from "@hooks/useI18n";
import React from "react";

const ContactSession = () => {
  const { t } = useI18n();
  return (
    <div className="grid md:grid-cols-7 h-auto">
      <div className="md:col-span-3 col-span-1 h-full">
        <img
          src={ImgHomeContact}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="md:col-span-4 xl:block flex justify-center items-end col-span-1 bg-aqua-aq02 relative xl:pt-spc60 pt-9 pb-5 2xl:pl-[30%] xl:pl-[20%]">
        <CricleContactSvg className="absolute xl:right-[12%] right-2 xl:top-4 bottom-0 xl:w-auto xl:h-auto w-[170px] h-[170px]" />
        <div className="md:w-[403px] w-[289px] md:min-h-spc300 min-h-spc280 relative p-3 pb-14">
          <div className="relative w-full h-auto border border-dashed rounded-lg border-white z-10 p-[14px]">
            <p className="md:text-2xl text-xl text-center font-bold uppercase mb-2 w-3/4 mx-auto">
              {t("text.constact.help")}
            </p>
            <p className="md:text-xs text-[10px] text-center font-normal mb-[22px]">
              {t("text.constact.already")}
            </p>
            <div className="flex items-center justify-center gap-spc45">
              <div>
                <div className="rounded-md bg-btn md:w-spc77 w-spc50 md:h-spc77 h-spc50 flex items-center justify-center mb-2">
                  <KakaoTalkIcon width={38} height={38} />
                </div>
                <p className="text-sm font-bold text-center">
                  {t("global.kakaotalk")}
                </p>
              </div>
              <div>
                <div className="rounded-md bg-btn md:w-spc77 w-spc50 md:h-spc77 h-spc50 flex items-center justify-center mb-2">
                  <ZaloIcon
                    //  width={56} height={25}
                    width={40}
                    height={18}
                  />
                </div>
                <p className="text-sm font-bold text-center">
                  {t("global.zalo")}
                </p>
              </div>
            </div>
          </div>
          <img
            src={MessageContact}
            className="absolute bottom-0 w-full h-full left-0 top-0"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSession;

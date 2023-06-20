import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICHotline } from "@assets/icons/ICHotline";
import { ICLogin } from "@assets/icons/ICLogin";
import { ICPhone } from "@assets/icons/ICPhone";
import { ICYoutubeContact } from "@assets/icons/ICYoutubeContact";
import { ICZalo } from "@assets/icons/ICZalo";
import { GotoTop } from "@components/GotoTop";
import { MenusRight } from "@components/MenusRight";
import { Colors } from "@constants/color";
import {
  prefixRootRoute,
  windownSizeWidth,
  withResponsive,
} from "@constants/index";
import { TopicPlaceItemBase } from "@features/home/components/TopicPlace/TopicPlaceItem";
import clsx from "clsx";
import React, { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/auth";
import { pathsAdmin } from "@constants/routerManager";

const data = [
  {
    title: "Cơ sở số 1",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
  {
    title: "Cơ sở số 2",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
  {
    title: "Cơ sở số 3",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
  {
    title: "Cơ sở số 4",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
];

type Props = {
  children: ReactNode;
};

export const ContactProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const {isLogin, doLogin} = useAuthContext()
  const widthBreak = useMemo(() => {
    return windownSizeWidth > withResponsive._1024;
  }, []);

  const isAdmin = useMemo(() => {
    return pathname.includes(prefixRootRoute.admin);
  }, [pathname]);

  const navigate = useNavigate()

  const handleLogin = () => {
    if(isLogin) {
      navigate(`${prefixRootRoute.admin}/${pathsAdmin.home.prefix}`)
    }else {
      doLogin()
    }
  }

  return (
    <>
      <div
        className={clsx(
          "fixed bottom-[calc(20%_+_56px)] 2xl:bottom-[calc(20%_+_78px)] [&>button]:rounded-[8px_0_8px_0]  2xl:[&>button]:rounded-[16px_0_16px_0] [&>button]:w-[40px] [&>button]:h-[40px] 2xl:[&>button]:w-[54px] 2xl:[&>button]:h-[54px] z-[11] gap-y-[16px] 2xl:gap-y-[24px] group-contact right-0 flex flex-col",
          {
            " opacity-0 z-[-2]": isAdmin,
          }
        )}
      >
        <MenusRight />

        <button className="relative flex items-center justify-center  bg-bg_01A63E">
          <span>
            <ICPhone
              width={widthBreak ? 20 : 15}
              height={widthBreak ? 20 : 15}
            />
          </span>
          <div className="popup-with-arrow absolute top-0 right-[100%]">
            <div className="flex-1 shadow-lg overflow-x-hidden px-[16px] rounded-[16px_0_16px_0] absolute h-auto max-h-[328px] w-[220px] bg-white top-0 right-[15px] overflow-y-auto list-facilities">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="py-[16px] border-b border-br_E6E6E6"
                  >
                    <p className="text-_14 text-left font-semibold text-GreyPrimary ">
                      {item.title}
                    </p>
                    <div className="flex items-center mt-1 gap-x-[6px]">
                      <div>
                        <ICHotline />
                      </div>
                      <p className="text-_14  text-text_secondary ">
                        {item.phone}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </button>

        <button onClick={handleLogin} className=" flex items-center justify-center bg-primary">
          <span>
            <ICLogin width={widthBreak ? 24 : 24} height={widthBreak ? 24 : 24} />
          </span>
        </button>

        <button className=" flex items-center justify-center bg-bg_2196F3">
          <span>
            <ICZalo width={widthBreak ? 32 : 24} height={widthBreak ? 12 : 9} />
          </span>
        </button>

        <button className="flex items-center justify-center bg-text_red">
          <span>
            <ICYoutubeContact
              width={widthBreak ? 29 : 20}
              height={widthBreak ? 20 : 14}
            />
          </span>
        </button>
        <button className="flex items-center justify-center bg-bg_0068FF">
          <span>
            <ICFacebook
              width={widthBreak ? 11 : 8}
              height={widthBreak ? 20 : 14}
              color={Colors.text_white}
            />
          </span>
        </button>
      </div>
      {children}
    </>
  );
};

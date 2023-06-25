import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICHotline } from "@assets/icons/ICHotline";
import { ICLogin } from "@assets/icons/ICLogin";
import { ICPhone } from "@assets/icons/ICPhone";
import { ICYoutubeContact } from "@assets/icons/ICYoutubeContact";
import { ICZalo } from "@assets/icons/ICZalo";
import { Colors } from "@constants/color";
import {
  prefixRootRoute,
  windownSizeWidth,
  withResponsive,
} from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useAuthContext } from "@contexts/hooks/auth";
import { useGetPlace } from "@features/dashboard/product/components/useGetPlace";
import React, { memo, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { GotoTop } from "./GotoTop";

export const ContactSilde = memo(() => {
  const { categories, fechData } = useGetPlace();
  const widthBreak = useMemo(() => {
    return windownSizeWidth > withResponsive._1024;
  }, []);
  const { isLogin, doLogin, loading } = useAuthContext();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!loading) {
      if (isLogin) {
        navigate(`${prefixRootRoute.admin}/${pathsAdmin.home.prefix}`);
      } else {
        doLogin();
      }
    }
  };
  return (
    <>
      <button className="relative flex items-center justify-center  bg-bg_01A63E">
        <span>
          <ICPhone width={widthBreak ? 20 : 15} height={widthBreak ? 20 : 15} />
        </span>
        <div className="popup-with-arrow absolute top-0 right-[100%]">
          <div
            id="contact-context-id"
            className="flex-1 shadow-lg overflow-x-hidden px-[16px] rounded-[16px_0_16px_0] absolute h-auto max-h-[328px] w-[220px] bg-white top-0 right-[15px] overflow-y-auto list-facilities"
          >
            <InfiniteScroll
              next={fechData}
              dataLength={categories.length}
              hasMore
              loader={<></>}
              scrollableTarget="contact-context-id"
            >
              {categories.map((item, index) => {
                return (
                  <a
                    key={index}
                    target="blank"
                    href={`tel:${item.phone}`}
                    className="py-[16px] border-b border-br_E6E6E6"
                  >
                    <p className="text-_14 text-left font-semibold text-GreyPrimary ">
                      {item.name}
                    </p>
                    <div className="flex items-center mt-1 gap-x-[6px]">
                      <div>
                        <ICHotline />
                      </div>
                      <p className="text-_14  text-text_secondary ">
                        {item.phone}
                      </p>
                    </div>
                  </a>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </button>

      <button
        onClick={handleLogin}
        className=" text-_12 text-white flex items-center justify-center bg-primary"
      >
        {loading ? (
          "..."
        ) : (
          <span>
            <ICLogin
              width={widthBreak ? 24 : 24}
              height={widthBreak ? 24 : 24}
            />
          </span>
        )}
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
    </>
  );
});

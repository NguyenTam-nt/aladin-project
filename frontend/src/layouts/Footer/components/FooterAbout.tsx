import { TranslateContext } from "@contexts/Translation";
import Logo from "@assets/images/logo.jpg";
import React, { useContext, useEffect, useState } from "react";
import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICInSocial } from "@assets/icons/ICInSocial";
import { Link } from "react-router-dom";
import { Colors } from "@constants/color";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import clsx from "clsx";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";
import { FooterInfoType, IFooter, IFooterInfo } from "@typeRules/footer";
import { footerService } from "@services/footer";
import { paths } from "@constants/router";
import { ICYoutube } from "@assets/icons/ICYoutube";

export const FooterAbout = () => {
  const { t } = useContext(TranslateContext);
  const [footers, setFooters] = useState<IFooter[]>([]);
  const [footerInfo, setFooterInfos] = useState<IFooterInfo[]>([])
  useEffect(() => {
    footerService.get().then((data) => {
      setFooters(data);
    });

    footerService.getFooterInfo().then((data) => {
      setFooterInfos(data.data);
    });

 
  }, []);
  return (
    <div className=" bg-secondary py-[27px] xl:py-[50px] xl:border-b-[1px] xl:border-br_E9ECEF xl:border-solid  text-text_white">
      <div className="w-rp  grid grid-cols-1 m992:grid-cols-3 xl:!grid-cols-6 gap-x-[24px]">
        <div className="m992:col-span-3 mb-[24px] xl:mb-0">
          <div className="flex items-center">
            <>
              <img
                src={Logo}
                alt="logo"
                className="w-[27px] h-[32px] md:w-auto md:h-auto object-cover"
              />
            </>
            <div className="ml-[16px]">
              <h3 className=" w-[80%]  text-_9 md:text-[18px] font-bold">
                {t("home.header.subTitle")}
              </h3>
            </div>
          </div>
          <div className="text-[14px] mt-[35px] ">
            <p>{t("home.footer.address1")}</p>
            <p className="mt-[8]">{t("home.footer.address2")}</p>
          </div>
          <div className="flex items-center gap-x-[16px] mt-[24px] mb-0 m992:mb-[24px] xl:mb-0">
            {footerInfo.map((item, index) => {
              return (
                <a key={index} href={item?.link} target="blank">
                  {item.type === FooterInfoType.fb && (
                    <ICFacebook color={Colors.text_white} />
                  )}
                  {item.type === FooterInfoType.yt && (
                    <ICYoutube color={Colors.text_white} />
                  )}
                  {item.type === FooterInfoType.lk && (
                    <ICInSocial color={Colors.text_white} />
                  )}
                </a>
              );
            })}
          </div>
        </div>
        {footers.map((item, index) => {
          return (
            <div className="col-span-1" key={index}>
              <FooterAboutGroup data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FooterAboutGroup = ({ data }: { data: IFooter }) => {
  const { isVn } = useContext(TranslateContext);
  const [isShow, setIsShow] = useState(true);
  const { width } = useWindowResize();
  const handleShow = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    if (width >= withResponsive._1280) {
      setIsShow(true);
    }
  }, [width]);

  return (
    <>
      <div className="flex items-center justify-between mt-[12px] m992:mt-0">
        <h3 className="text-_18 font-semibold xl:text-[24px] xl:font-bold">
          {isVn ? data?.name : data?.nameKo}
        </h3>
        <button className="m992:hidden" onClick={handleShow}>
          <ICArrowDown color={Colors.text_white} />
        </button>
      </div>
      <ul
        className={clsx("mt-[16px] overflow-hidden h-0 ease-in duration-300", {
          "footer-animation-list": isShow,
        })}
        style={{
          ["--footer-size" as string]: data?.items?.length ?? 0,
          ["--height-li" as string]: "32px",
        }}
      >
        {data?.items?.length &&
          data?.items.map((item, index) => {
            return (
              <li key={index} className="h-[32px] items-center">
                <Link
                  to={`${paths.news.prefix}?type=${item?.path}`}
                  className="h-[24px] flex items-center text-[14px] hover:text-primary duration-300"
                >
                  {isVn ? item?.name : item?.nameKo}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

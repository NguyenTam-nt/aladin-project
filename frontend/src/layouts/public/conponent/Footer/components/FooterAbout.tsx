import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import footerImage from "@assets/images/home/footer_image.png";
import { ICLogoFooter } from "@assets/icons/LogoFooter";
import { paths, routersPublic } from "@constants/routerPublic";
import { useTranslation } from "react-i18next";
import { Colors } from "@constants/color";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { windownSizeWidth, withResponsive } from "@constants/index";
import type { INews } from "@typeRules/index";
import { policyService } from "@services/policy";
import { ICPolicyNoticeFooter } from "@assets/icons/ICPolicyNoticeFooter";


export const FooterAbout = () => {
  const { t } = useTranslation();
  return (
    <div className=" bg-secondary py-[27px] xl:py-[48px]  text-text_white">
      <div className="w-rp  grid grid-cols-1 m992:grid-cols-3 xl:!grid-cols-5   xl:gap-x-[50px]">
        <div className="m992:col-span-3 mb-[24px] xl:mb-0">
          <div>
            <>
              <ICLogoFooter
                width={windownSizeWidth > withResponsive._992 ? 102 : 33}
                height={windownSizeWidth > withResponsive._992 ? 94 : 31}
              />
            </>
            <div className="mt-[24px]">
              <h3 className="text-_14 lg:w-[80%]">{t("home.footer.title")}</h3>
            </div>
          </div>
          <div className="text-_14 mt-[16px] lg:w-[80%]">
            <p>{t("home.footer.sub_title")}</p>
          </div>
          <div className="flex items-center gap-x-[16px] mt-[16px] mb-0 m992:mb-[24px] xl:mb-0">
            {
              windownSizeWidth > withResponsive._992 ? (
                <ICPolicyNoticeFooter width={windownSizeWidth > withResponsive._992 ? 125 : 62} height={windownSizeWidth > withResponsive._992 ? 48 : 24} />
              ) : <img className="w-[62px] h-[24px] object-cover" src={footerImage} alt="" />
            }
           
          </div>
        </div>
        <div className="col-span-1">
          <FooterAboutGroup
            title="Về Giang Mỹ"
            data={routersPublic.filter((item) => !item.isHiden)}
          />
        </div>

        <div className="col-span-1">
          <FooterAboutGroupPolicy />
        </div>
      </div>
    </div>
  );
};

const FooterAboutGroup = ({
  data,
  title,
}: {
  data: { name: string; path: string }[];
  title: string;
}) => {
  const [isShow, setIsShow] = useState(true);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-between mt-[12px] m992:mt-0">
        <h3 className="text-_16 font-semibold xl:text-[16px]">{title}</h3>
        <button className="m992:hidden" onClick={handleShow}>
          <ICArowDown color={Colors.text_white} />
        </button>
      </div>
      <ul
        className={clsx("mt-[16px] overflow-hidden h-0 ease-in duration-300", {
          "footer-animation-list": isShow,
        })}
        style={{
          ["--footer-size" as string]: data.length,
          ["--height-li" as string]: "32px",
        }}
      >
        {data.map((item: any, index: number) => {
          return (
            <li key={index} className="h-[32px] items-center">
              <Link
                to={item.path}
                className="h-[24px] flex items-center text-text_white text-_14 hover:text-primary duration-300"
              >
                {t(item.name)}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const FooterAboutGroupPolicy = () => {
  const [isShow, setIsShow] = useState(true);
  const [policy, setPolicy] = useState<INews[]>([]);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  const { t } = useTranslation();

  useEffect(() => {
    policyService
      .getPolicy({ page: 0, size: 12, sort: "id,desc" })
      .then((data) => {
        setPolicy(data.list);
      });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mt-[12px] m992:mt-0">
        <h3 className="text-_16 font-semibold xl:text-[16px]">Hỗ trợ</h3>
        <button className="m992:hidden" onClick={handleShow}>
          <ICArowDown color={Colors.text_white} />
        </button>
      </div>
      <ul
        className={clsx("mt-[16px] overflow-hidden h-0 ease-in duration-300", {
          "footer-animation-list": isShow,
        })}
        style={{
          ["--footer-size" as string]: policy.length + 3,
          ["--height-li" as string]: "32px",
        }}
      >
        {policy.map((item, index) => {
          return (
            <li key={index} className="h-[32px] items-center">
              <Link
                to={`/policy/${item.id}`}
                className="line-clamp-1 text-text_white text-_14 hover:text-primary duration-300"
              >
                {t(item.title)}
              </Link>
            </li>
          );
        })}

        <li className="h-[32px] items-center">
          <p
            // target="blank"
            // href="tel:1900636465"
            className="h-[24px] flex items-center text-text_white text-_14 hover:text-primary duration-300"
          >
            CSKH: 1900636465
          </p>
        </li>
        <li className="h-[32px] items-center">
          <p
            // target="blank"
            // href="tel:1900636465"
            className="h-[24px] flex items-center text-text_white text-_14 hover:text-primary duration-300"
          >
            Hỗ trợ dịch vụ: 1900636465
          </p>
        </li>
        <li className="h-[32px] items-center">
          <p
            // href="mailto:giangmyhotpot@gmail.com"
            className="h-[24px] flex items-center text-text_white text-_14 hover:text-primary duration-300"
          >
            Email: giangmyhotpot@gmail.com
          </p>
        </li>
      </ul>
    </>
  );
};

import { TranslateContext } from "@contexts/Translation";
import Logo from "@assets/images/logo.jpg";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICInSocial } from "@assets/icons/ICInSocial";
import { ICInstagram } from "@assets/icons/ICInstagram";
import { Link } from "react-router-dom";
import { InfomationFields, StudentFields, TrainFields } from "@constants/footer";
import { Colors } from "@constants/color";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import clsx from "clsx";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";

export const FooterAbout = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div className=" bg-secondary py-[27px] xl:py-[50px] xl:border-b-[1px] xl:border-br_E9ECEF xl:border-solid  text-text_white">
      <div className="w-rp  grid grid-cols-1 m992:grid-cols-3 xl:!grid-cols-6 gap-x-[24px]">
        <div className="m992:col-span-3 mb-[24px] xl:mb-0">
          <div className="flex items-center">
            <>
              <img src={Logo} alt="logo" className="w-[27px] h-[32px] md:w-auto md:h-auto object-cover" />
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
          <div className="my-[25px] flex flex-col md:flex-row md:items-center">
            <div className=" w-full md:w-[210px]">
              <Input placeholder="home.footer.emailinput" />
            </div>
            <div className="md:ml-[25px] w-[140px]">
              <Button color="empty" className="mt-[6px] md:mt-0 bg-transparent text-text_white md:bg-white md:text-secondary" text="home.footer.follow_btn" />
            </div>
          </div>
          <div className="flex items-center mb-0 m992:mb-[24px] xl:mb-0">
            <a href="#">
              <ICFacebook color={Colors.text_white} />
            </a>
            <a href="#" className="mx-[21px]">
              <ICInstagram color={Colors.text_white} />
            </a>
            <a href="#">
              <ICInSocial color={Colors.text_white} />
            </a>
          </div>
        </div>
        <div className="col-span-1">
            <FooterAboutGroup title="home.footer.train.title" data={TrainFields} />
        </div>
        <div className="col-span-1">
        <FooterAboutGroup title="home.footer.information.title" data={InfomationFields} />
        </div>
        <div className="col-span-1">
        <FooterAboutGroup title="home.footer.student.title" data={StudentFields} />
        </div>
      </div>
    </div>
  );
};

const FooterAboutGroup = ({
  title,
  data,
}: {
  title: string;
  data: { text: string; to: string }[];
}) => {
  const { t } = useContext(TranslateContext);
  const [isShow, setIsShow] = useState(true)
  const {width} = useWindowResize()
  const handleShow = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    if(width >= withResponsive._1280) {
      setIsShow(true)
    }
  }, [width])

  return (
    <>
    <div className="flex items-center justify-between mt-[12px] m992:mt-0">
      <h3 className="text-_18 font-semibold xl:text-[24px] xl:font-bold">{t(title)}</h3>
      <button className="m992:hidden" onClick={handleShow}>
        <ICArrowDown color={Colors.text_white} />
      </button>
    </div>
      <ul className={clsx("mt-[16px] overflow-hidden h-0 ease-in duration-300", {"footer-animation-list": isShow})}
        style={{
          ["--footer-size" as string]: data.length,
          ["--height-li" as string]: "32px",
        }}
      >
        {data.map((item, index) => {
          return (
            <li key={index} className="h-[32px] items-center">
              <Link
                to={item.to}
                className="h-[24px] flex items-center text-[14px] hover:text-primary duration-300"
              >
                {t(item.text)}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

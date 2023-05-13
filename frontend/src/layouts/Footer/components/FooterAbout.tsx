import { TranslateContext } from "@contexts/Translation";
import Logo from "@assets/images/logo.jpg";
import React, { useContext } from "react";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICInSocial } from "@assets/icons/ICInSocial";
import { ICInstagram } from "@assets/icons/ICInstagram";
import { Link } from "react-router-dom";
import { InfomationFields, StudentFields, TrainFields } from "@constants/footer";
import { Colors } from "@constants/color";

export const FooterAbout = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div className=" bg-secondary py-[50px] border-b-[1px] border-br_E9ECEF border-solid  text-text_white">
      <div className="w-rp grid grid-cols-6 gap-x-[24px]">
        <div className=" col-span-3">
          <div className="flex items-center">
            <>
              <img src={Logo} alt="logo" className="object-cover" />
            </>
            <div className="ml-[16px]">
              <h3 className="text-[18px] font-bold">
                {t("home.header.subTitle")}
              </h3>
            </div>
          </div>
          <div className="text-[14px] mt-[35px] ">
            <p>{t("home.footer.address1")}</p>
            <p className="mt-[8]">{t("home.footer.address2")}</p>
          </div>
          <div className="my-[25px] flex items-center">
            <div className="w-[210px]">
              <Input placeholder="home.footer.emailinput" />
            </div>
            <div className="ml-[25px] w-[140px]">
              <Button color="empty" text="home.footer.follow_btn" size={16} />
            </div>
          </div>
          <div className="flex items-center">
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
  return (
    <>
      <h3 className="text-[24px] font-bold">{t(title)}</h3>
      <ul className="mt-[16px]">
        {data.map((item, index) => {
          return (
            <li key={index} className="mb-[16px]">
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

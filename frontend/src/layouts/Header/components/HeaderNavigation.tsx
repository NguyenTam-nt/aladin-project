import React, { useContext } from "react";
import { TranslateContext } from "@contexts/Translation";
import { Link } from "react-router-dom";
import { ICArrowDown } from "@assets/icons/ICArrowDown";

export const HeaderNavigation = () => {
  return (
    <div className="w-rp h-[60px] flex justify-between items-center">
        <HeaderNavigationLink to="#" text="home.header.navigation.home" />
      <div className="header-subnav">
          <HeaderNavigationLink to="#" text="home.header.navigation.about" withArrow  />
          {/* <div className="header-subnav-child">
                <ul>
                    <li><HeaderSubNavigationLink to="#" text="Đào tạo" /></li>
                    <li> <HeaderSubNavigationLink to="#" text="Nghiên cứu khoa học" /></li>
                    <li><HeaderSubNavigationLink to="#" text="Học bổng" /></li>
                    <li><HeaderSubNavigationLink to="#" text="Sinh viên" /></li>
                    <li><HeaderSubNavigationLink to="#" text="Sự kiện" /></li>
                    <li><HeaderSubNavigationLink to="#" text="Tuyển sinh" /></li>
                    <li><HeaderSubNavigationLink to="#" text="Cơ hội nghề nghiệp" /></li>
                    <li><HeaderSubNavigationLink to="#" text="Thông báo" /></li>
                </ul>
          </div> */}
      </div>
      <div className="header-subnav">
      <HeaderNavigationLink to="#" text="home.header.navigation.news" withArrow  />
      </div>
      <HeaderNavigationLink to="#" text="home.header.navigation.admissions" />
      <HeaderNavigationLink to="#" text="home.header.navigation.documents" />
      <HeaderNavigationLink to="#" text="home.header.navigation.cadres" />
      <HeaderNavigationLink to="#" text="home.header.navigation.subject" />
      <HeaderNavigationLink to="#" text="home.header.navigation.library_image" />
      <HeaderNavigationLink to="#" text="home.header.navigation.video" withSlash={false} />
      <div className="header-bg-subnav" /> 
    </div>
  );
};

const HeaderNavigationLink = ({
  withArrow = false,
  text,
  to,
  withSlash = true,
}: {
  withArrow?: boolean;
  text: string;
  to: string;
  withSlash?: boolean;
}) => {
  const { t } = useContext(TranslateContext);
  return (
    <>
      <div className="flex items-center">
        <Link className=" leter" to={to}>{t(text)}</Link>
        {withArrow && (
          <div className="ml-1">
            <ICArrowDown />
          </div>
        )}
      {withSlash && <div className="w-[1px] h-[16px] bg-br_E9ECEF mx-[31px]" />}
      </div>
    </>
  );
};

const HeaderSubNavigationLink = ({
    text,
    to,
  }: {
    withArrow?: boolean;
    text: string;
    to: string;
    withSlash?: boolean;
  }) => {
    const { t } = useContext(TranslateContext);
    return (
      <>
       <Link className=" text-text_link hover:text-text_primary duration-300 py-2" to={to}>{t(text)}</Link>
      </>
    );
  };
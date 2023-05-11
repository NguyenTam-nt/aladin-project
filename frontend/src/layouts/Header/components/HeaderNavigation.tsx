import React, { useContext } from "react";
import { TranslateContext } from "@contexts/Translation";
import { Link } from "react-router-dom";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { ICMenu } from "@assets/icons/ICMenu";

export const HeaderNavigation = () => {
  return (
    <div className="h-[60px] flex justify-between items-center">
      <HeaderNavigationLink to="#" text="home.header.navigation.home" />
      <div className="header-subnav">
        <HeaderNavigationLink
          to="#"
          text="home.header.navigation.about"
          withArrow
        />
        <div
          className="header-subnav-child"
          style={{
            ["--length-subnav" as string]: 4,
          }}
        >
          <ul>
            <li>
              <HeaderSubNavigationLink to="#" text="Tổng quan" />
            </li>
            <li>
              {" "}
              <HeaderSubNavigationLink to="#" text="Thương hiệu" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Cơ cấu tổ chức nhân sự" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Broucher" />
            </li>
          </ul>
        </div>
      </div>
      <div className="header-subnav">
        <HeaderNavigationLink
          to="#"
          text="home.header.navigation.news"
          withArrow
        />
         <div
          className="header-subnav-child"
          style={{
            ["--length-subnav" as string]: 6,
          }}
        >
          <ul>
            <li>
              <HeaderSubNavigationLink to="#" text="Đào tạo" />
            </li>
            <li>
              {" "}
              <HeaderSubNavigationLink to="#" text="Nghiên cứu khoa học" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Học bổng" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Sinh viên" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Sự kiện" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Cơ hội nghề nghiệp" />
            </li>
          </ul>
        </div>
      </div>
      <HeaderNavigationLink to="#" text="home.header.navigation.admissions" />
      <HeaderNavigationLink to="#" text="home.header.navigation.documents" />
      {/* <HeaderNavigationLink to="#" text="home.header.navigation.cadres" />
      <HeaderNavigationLink to="#" text="home.header.navigation.subject" />
      <HeaderNavigationLink to="#" text="home.header.navigation.library_image" />
      <HeaderNavigationLink to="#" text="home.header.navigation.video" withSlash={false} /> */}
      <div className="header-subnav cursor-pointer">
        <ICMenu />
        <div
          className="header-subnav-child mw-1920:right-0"
          style={{
            ["--length-subnav" as string]: 4,
          }}
        >
          <ul>
            <li>
              <HeaderSubNavigationLink to="#" text="Cán bộ" />
            </li>
            <li>
              {" "}
              <HeaderSubNavigationLink to="#" text="Bộ môn" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Thử viện ảnh" />
            </li>
            <li>
              <HeaderSubNavigationLink to="#" text="Video" />
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="header-bg-subnav" /> */}
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
        <Link className="text-[16px] text-text_secondary" to={to}>
          {t(text)}
        </Link>
        {withArrow && (
          <div className="ml-1">
            <ICArrowDown />
          </div>
        )}
        {/* {withSlash && <div className="w-[1px] h-[16px] bg-br_E9ECEF mx-[31px]" />} */}
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
      <Link
        className="text-text_primary leading-[28px] h-[60px] p-[16px] text-_16 font-semibold duration-300 py-2  relative z-[1] w-full flex items-center"
        to={to}
      >
        {t(text)}
      </Link>
    </>
  );
};

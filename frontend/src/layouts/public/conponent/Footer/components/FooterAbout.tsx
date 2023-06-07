import React, {  useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import footerImage from "@assets/images/home/footer_image.png"
import { ICLogoFooter } from "@assets/icons/LogoFooter";
import { routersPublic } from "@constants/routerPublic";
import { useTranslation } from "react-i18next";

// path: paths.home.prefix,
// element: HomePage,
// name: "",
// isHiden: true,

const data = [
  {
    title: "Về Giang Mỹ",
    items: routersPublic.filter(item => !item.isHiden)
  },
  {
    title: "Hỗ trợ",
    items: [
      {
        name: "Hướng dẫn đặt bàn",
        path: "#"
      },
      {
        name: "Chính sách bảo mật",
        path: "#"
      },
      {
        name: "Câu hỏi thường gặp",
        path: "#"
      }, 
      {
        name: "CSKH: 1900636465",
        path: "#"
      },
      {
        name: "Hỗ trợ dịch vụ: 1900636465",
        path: "#"
      },
      {
        name: "Email: giangmyhotpot@gmail.com",
        path: "#"
      }

    ]
  },
]

export const FooterAbout = () => {
  return (
    <div className=" bg-secondary py-[27px] xl:py-[48px]  text-text_white">
      <div className="w-rp  grid grid-cols-1 m992:grid-cols-3 xl:!grid-cols-5   xl:gap-x-[50px]">
        <div className="m992:col-span-3 mb-[24px] xl:mb-0">
          <div>
            <>
              <ICLogoFooter />
            </>
            <div className="mt-[24px]">
              <h3 className="text-_9 md:text-_14 w-[80%]">
              Giang Mỹ Hotpot là nhà hàng ngon, uy tín và chất lương, Giúp khách hàng đặt bàn dễ dàng. Giải pháp dột phá mới cho câu chuyện ăn gì, ở đâu.
              </h3>
            </div>
          </div>
          <div className="text-_14 mt-[16px] w-[80%]">
            <p>Giấy phép ĐKKD số 0123456789 do Phòng Tài chính kế hoạch - UBND quận Hai Bà Trưng cấp ngay 01/01/2020.</p>
          </div>
          <div className="flex items-center gap-x-[16px] mt-[16px] mb-0 m992:mb-[24px] xl:mb-0">
            <img src={footerImage} alt="footer-image" className=" object-cover" />
          </div>
        </div>
        {data.map((item, index) => {
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

const FooterAboutGroup = ({data}:{data:any}) => {
  const [isShow, setIsShow] = useState(true);
  const {t} = useTranslation()
  return (
    <>
      <div className="flex items-center justify-between mt-[12px] m992:mt-0">
        <h3 className="text-_16 font-semibold xl:text-[16px]">
           { data.title}
        </h3>
        {/* <button className="m992:hidden" onClick={handleShow}>
          <ICArrowDown color={Colors.text_white} />
        </button> */}
      </div>
      <ul
        className={clsx("mt-[16px] overflow-hidden h-0 ease-in duration-300", {
          "footer-animation-list": isShow,
        })}
        style={{
          ["--footer-size" as string]: data.items.length,
          ["--height-li" as string]: "32px",
        }}
      >
        {data.items.map((item:any, index:number) => {
          return (
            <li key={index} className="h-[32px] items-center">
              <Link
                to={"#"}
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

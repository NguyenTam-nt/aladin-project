import {
  ArrowForward,
  FaceRound,
  FacebookFilledIcon,
  HotlineIcon,
  InstagramOutlineIcon,
  LocationIcon,
  Logo,
  MailOutlineIcon,
  PhoneOutlineIcon,
  SendIcon,
  TikTokIcon,
  WebsiteOutlineIcon,
  WhiteLogo,
  YoutubeOutlineIcon,
  YtbRound,
} from "@assets/icons";
import ContactFooterForm from "@components/Form/ContactFooterForm";
import useI18n from "@hooks/useI18n";
import FooterServices, {
  ContentFooter,
  ResponseFooter,
} from "@services/FooterService";
import PolicyServices from "@services/PolicyServices";
import { ROUTES } from "@utility/constants";
import { firstUpper } from "@utility/helper";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {}
interface SubProps {
  description: string;
  typeBox: "face" | "yt" | "req";
  counts?: number;
  onClickForWard: () => void;
}
const SubFooterBox = memo(
  ({ description, typeBox, counts, onClickForWard }: SubProps) => {
    const { t } = useI18n();
    return (
      <div>
        <p className="text-small text-white font-normal mb-[18px]">
          {t(description)}
        </p>
        <div className="w-full rounded-[30px] h-10 bg-white px-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {typeBox == "face" && <img src={FaceRound} alt="" />}
            {typeBox == "yt" && <img src={YtbRound} alt="" />}

            {typeBox == "face" && (
              <p className={clsx("text-small text-blue-b01")}>
                {t("fanpage")} :{counts}&nbsp;
                {t("like")}
              </p>
            )}
            {typeBox == "yt" && (
              <p className={clsx("text-small text-red-r01")}>
                {t("subcribe")} :{counts} &nbsp;
                {t("register")}
              </p>
            )}
            {typeBox == "req" && (
              <p className={clsx("text-small text-orange-or01 font-bold px-2")}>
                {t("free-consultation")}
              </p>
            )}
          </div>
          <div className="cursor-pointer" onClick={onClickForWard}>
            {typeBox == "face" || typeBox == "yt" ? (
              <ArrowForward />
            ) : (
              <SendIcon />
            )}
          </div>
        </div>
      </div>
    );
  }
);

const listContentFooter = [
  {
    name: "Market Moa",
    contents: [
      "Giới thiệu về Moa",
      "Văn hóa doanh nghiệp",
      "Nhà máy sản xuất",
      "Trung tâm bảo hành",
      "Bảo hành điện tử",
      "Hệ thống cửa hàng",
      "Liên Hệ Chúng Tôi",
    ],
  },
  {
    name: "Hỗ trợ khách hàng",
    contents: [
      "Chính sách & quy định chung",
      "Chính sách mua hàng & thanh toán",
      "Chính sách vận chuyển & giao nhận",
      "Chính sách bảo hành",
      "Chính sách đổi trả",
      "Chính sách bảo mật thông tin",
      "Báo giá NPP & Đại lý",
    ],
  },
  {
    name: "Tin tức",
    contents: [
      "Điện gia dụng",
      "Máy lọc nước",
      "Thiết bị nhà bếp",
      "Đồ gia dụng",
      "Điều hòa - Máy lạnh",
    ],
  },
  {
    name: "Sản phẩm nổi bật",
    contents: [
      "Điện gia dụng",
      "Máy lọc nước",
      "Thiết bị nhà bếp",
      "Đồ gia dụng",
      "Điều hòa - Máy lạnh",
    ],
  },
];
const listAddress: {
  name: string;
  address?: string;
  phoneNumber?: string;
  hotline?: string;
  email?: string;
  type: "address" | "hotline";
}[] = [
  {
    name: "Văn phòng giao dịch",
    address: "Số 18/TT5.2 KĐT Ao Sào, Thịnh Liệt, Hoàng Mai, Hà Nội",
    phoneNumber: "Điện thoại: 0989.86.86.87",
    type: "address",
  },
  {
    name: "Nhà máy sản xuất",
    address: "Số 18/TT5.2 KĐT Ao Sào, Thịnh Liệt, Hoàng Mai, Hà Nội",
    phoneNumber: "Điện thoại: 0989.86.86.87",
    type: "address",
  },
  {
    name: "Trụ sở tại Nhật Bản",
    address: "Số 18/TT5.2 KĐT Ao Sào, Thịnh Liệt, Hoàng Mai, Hà Nội",
    type: "address",
  },
  {
    name: "Thông tin liên hệ",
    hotline: "19001999",
    email: "congty@gmail.com",
    type: "hotline",
  },
];
const Footer = (props: Props) => {
  const { t } = useI18n();
  const [policy, setPolicy] = useState([]);
  const [footerInfo, setFooterInfo] = useState<ContentFooter>();

  const routeAboutus = [
    {
      name: t("about_us.introduce_title"),
      link: "/about-us",
    },
    {
      name: t("about_us.news_title"),
      link: "/about-us/news",
    },
    {
      name: t("about_us.contact_title"),
      link: "/about-us/contact",
    },
  ];

  useEffect(() => {
    try {
      fetchData().then((data) => {
        setPolicy(data.data.data);
      });

      FooterServices.get().then((data) => {
        setFooterInfo(data);
      });
    } catch (error) {}
  }, []);

  const fetchData = async () => {
    return await PolicyServices.get({ page: 1, limit: 10 });
  };

  const handleForward = () => {
    console.log("akdf");
  };
  return (
    <div className="bg-footer">
      <div className="pl-[103px] pt-8">
        {/* <div className="pl-[103px] lg:px-8 pt-8 pb-4"> */}
        <div className="pr-[5%] pb-6 flex">
          <Link to={ROUTES["homepage"]} className="md:mr-[51px] mr-8">
            <Logo className="" fill="white" width={114} height={106} />
          </Link>
          <div className="grid grid-cols-3 gap-[170px]">
            <SubFooterBox
              onClickForWard={handleForward}
              counts={1200}
              description={
                "Like và truy cập Faceook MARKET MOA để cập nhật những thông tin mới nhất!"
              }
              typeBox={"face"}
            />
            <SubFooterBox
              onClickForWard={handleForward}
              counts={500000}
              description={
                "Like và truy cập Faceook MARKET MOA để cập nhật những thông tin mới nhất!"
              }
              typeBox={"yt"}
            />
            <SubFooterBox
              onClickForWard={handleForward}
              description={
                "Like và truy cập Faceook MARKET MOA để cập nhật những thông tin mới nhất!"
              }
              typeBox={"req"}
            />
          </div>
        </div>

        <div className="rounded-tl-[100px] bg-aqua-aq01 pl-[165px] pr-[5%] pt-11 py-2">
          <div className="grid grid-cols-4 gap-[26px] mb-8">
            {listContentFooter.map((item, index) => {
              return (
                <div key={index} className="h-full">
                  <h5 className="text-base font-bold text-white mb-3">
                    {item.name}
                  </h5>
                  <div>
                    {item.contents.map((itemContent, index) => {
                      return (
                        <p
                          key={index}
                          className="text-small font-normal text-white"
                        >
                          {itemContent}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-[26px]">
            {listAddress.map((item, index) => {
              return (
                <div key={index}>
                  <h5 className="text-base font-bold text-white mb-3">
                    <span className="w-6 mr-1 inline-block align-middle">
                      {item.type == "address" ? (
                        <LocationIcon />
                      ) : (
                        <HotlineIcon />
                      )}
                    </span>
                    {item.name}
                  </h5>
                  <p className="text-small font-normal text-white">
                    {item.address}
                  </p>
                  <p className="text-small font-normal text-white">
                    {item.phoneNumber}
                  </p>
                  <p className="text-small font-normal text-white">
                    {item.hotline}
                  </p>
                  <p className="text-small font-normal text-white">
                    {item.email}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <p className="text-center text-white text-wap-regular2 mt-6 lg:mt-0">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2 xl:gap-10">
          <div>
            <WhiteLogo className="w-48 xl:w-56" />
            <div className="pt-4 lg:pt-6 text-wap-regular2 text-white">
              <p className="">{footerInfo?.comanyName}</p>
              <div className="pt-4">
                {footerInfo?.address.map((a, i) => {
                  return (
                    <p className="mt-1" key={i}>
                      {a}
                    </p>
                  );
                })}
              </div>
              <p className="pt-5">
                <span className="font-semibold">{t("footer.phone")} </span>
                {footerInfo?.phoneNumber.map((p, i) => {
                  if (i < footerInfo?.phoneNumber.length - 1) p += " / ";
                  return (
                    <a
                      key={i}
                      href={`tel:${p.replace(/\s/g, "").replace("/", "")}`}
                      className=""
                    >
                      {p}
                    </a>
                  );
                })}
              </p>
              <div className="pt-6 flex items-center gap-5">
                {footerInfo?.email && footerInfo?.email.length > 0 && (
                  <a href={`mailto:${footerInfo?.email}`}>
                    <MailOutlineIcon />
                  </a>
                )}

                {footerInfo?.facebook && footerInfo?.facebook.length > 0 && (
                  <a target="_blank" href={`${footerInfo?.facebook}`}>
                    <FacebookFilledIcon />
                  </a>
                )}

                {footerInfo?.youtube && footerInfo?.youtube.length > 0 && (
                  <a target="_blank" href={`${footerInfo?.youtube}`}>
                    <YoutubeOutlineIcon />
                  </a>
                )}

                {footerInfo?.instagram && footerInfo?.instagram.length > 0 && (
                  <a target="_blank" href={`${footerInfo?.instagram}`}>
                    <InstagramOutlineIcon />
                  </a>
                )}

                {footerInfo?.tiktok && footerInfo?.tiktok.length > 0 && (
                  <a target="_blank" href={`${footerInfo?.tiktok}`}>
                    <TikTokIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="pt-6 lg:pt-0">
            <h1 className="text-normal1 font-semibold text-white">
              {t("footer.about")}
            </h1>
            <div className="pt-6">
              {routeAboutus.map((it, idx) => (
                <Link to={it.link} key={idx}>
                  <p className="pb-5 text-wap-regular2 text-white font-semibold">
                    {it.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-normal1 font-semibold text-white">
              {t("footer.policy")}
            </h1>
            <div className="pt-6">
              {policy.map((it: any, idx: any) => (
                <Link to={`/about-us/policy/${it.id}`} key={idx}>
                  <p className="pb-5 text-wap-regular2 text-white font-semibold">
                    {firstUpper(it.title)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <ContactFooterForm />
          </div>
        </div> */}
        {/* <div>
          <p className="text-center text-white text-wap-regular2 mt-6 lg:mt-0">
            {t("footer.copyright")}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;

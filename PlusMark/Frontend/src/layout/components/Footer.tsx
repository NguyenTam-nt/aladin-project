import {
  ArrowForward,
  Bct,
  // BocongthuonIcon,
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
  typeBox: "face" | "instar" | "shopee";
  counts?: number;
  onClickForWard: () => void;
}
const SubFooterBox = memo(({ typeBox, counts, onClickForWard }: SubProps) => {
  const { t } = useI18n();
  return (
    <div>
      <p className="text-small text-white font-normal mb-[18px]">
        {t(
          typeBox == "face"
            ? "global.footer.faceb_message"
            : typeBox == "instar"
            ? "global.footer.instar_message"
            : "global.footer.shopee_message"
        )}
      </p>
      <div className="w-full rounded-[30px] h-10 bg-white px-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {typeBox == "face" && <img src={FaceRound} alt="" />}
          {typeBox == "instar" && <img src={YtbRound} alt="" />}

          {typeBox == "face" && (
            <p className={clsx("text-small text-blue-b01")}>
              {t("fanpage")} :{counts}&nbsp;
              {t("like")}
            </p>
          )}
          {typeBox == "instar" && (
            <p className={clsx("text-small text-red-r01")}>
              {t("subcribe")} :{counts} &nbsp;
              {t("register")}
            </p>
          )}
          {typeBox == "shopee" && (
            <p className={clsx("text-small text-main1 font-bold px-2")}>
              {t("free-consultation")}
            </p>
          )}
        </div>
        <div className="cursor-pointer" onClick={onClickForWard}>
          {typeBox == "face" || typeBox == "instar" ? (
            <ArrowForward />
          ) : (
            <SendIcon />
          )}
        </div>
      </div>
    </div>
  );
});

const listContentFooter = [
  {
    name: "global.footer.market_moa.name",
    contents: [
      "global.footer.market_moa.intro",
      "global.footer.market_moa.culture",
      "global.footer.market_moa.factory",
      "global.footer.market_moa.service_center",
      "global.footer.market_moa.electronic_warranly",
      "global.footer.market_moa.shop_system",
      "global.footer.market_moa.contact_us",
    ],
  },
  {
    name: "global.footer.support_customer.name",
    contents: [
      "global.footer.support_customer.regulation",
      "global.footer.support_customer.buy&pay",
      "global.footer.support_customer.ship",
      "global.footer.support_customer.guarantee",
      "global.footer.support_customer.lie",
      "global.footer.support_customer.sercurity",
      "global.footer.support_customer.quoutes&agents",
    ],
  },
  {
    name: "global.footer.new.name",
    contents: [
      "global.footer.new.new",
      "global.footer.new.meeting",
      "global.footer.new.kitchen",
      "global.footer.new.scret",
      "global.footer.new.recruit",
      "global.footer.new.sociely",
    ],
  },
  {
    name: "global.footer.produc_special.name",
    contents: [
      "global.footer.produc_special.name",
      "global.footer.produc_special.electric_appliances",
      "global.footer.produc_special.water_purifier",
      "global.footer.produc_special.houseware",
      "global.footer.produc_special.kitchen_equiment",
      "global.footer.produc_special.air_conditioner",
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
    name: "global.footer.subfooter.office.name",
    address: "global.footer.subfooter.office.address",
    phoneNumber: "global.footer.subfooter.office.phone_number",
    type: "address",
  },
  {
    name: "global.footer.subfooter.factory.name",
    address: "global.footer.subfooter.factory.address",
    phoneNumber: "global.footer.subfooter.factory.phone_number",
    type: "address",
  },
  {
    name: "global.footer.subfooter.head_quater.name",
    address: "global.footer.subfooter.head_quater.address",
    type: "address",
  },
  {
    name: "global.footer.subfooter.infocontact.name",
    hotline: "global.footer.subfooter.infocontact.hotline",
    email: "global.footer.subfooter.infocontact.email",
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
              typeBox={"instar"}
            />
            <SubFooterBox
              onClickForWard={handleForward}
              counts={500000}
              typeBox={"face"}
            />
            <SubFooterBox onClickForWard={handleForward} typeBox={"shopee"} />
          </div>
        </div>

        <div className="rounded-tl-[100px] bg-aqua-aq01 pl-[165px] pr-[5%] pt-11 py-2">
          <div className="grid grid-cols-4 gap-[26px] mb-8">
            {listContentFooter.map((item, index) => {
              return (
                <div key={index} className="h-full">
                  <h5 className="text-base font-bold text-white mb-3">
                    {t(item.name)}
                  </h5>
                  <div>
                    {item.contents.map((itemContent, index) => {
                      return (
                        <p
                          key={index}
                          className="text-small font-normal text-white"
                        >
                          {t(itemContent)}
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
                    {t(item.name || "")}
                  </h5>
                  <p className="text-small font-normal text-white">
                    {t(item.address || "")}
                  </p>
                  <p className="text-small font-normal text-white">
                    {t(item.phoneNumber || "")}
                  </p>
                  <p className="text-small font-normal text-white">
                    {t(item.hotline || "")}
                  </p>
                  <p className="text-small font-normal text-white">
                    {t(item.email || "")}
                  </p>
                </div>
              );
            })}
          </div>
          {/* <div className="mt-10">
            <p className="text-center text-white text-wap-regular2 mt-6 lg:mt-0">
              {t("footer.copyright")}
            </p>
          </div> */}
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
      <div className="pl-[265px] pr-[5%] flex items-center justify-between h-spc60 bg-white">
        <div>
          <p className="text_base">
            {t("global.footer.subfooter.rigistration_license.company_name")}
          </p>
          <p className="text_base">
            {t("global.footer.subfooter.rigistration_license.license")}
          </p>
        </div>
        <img src={Bct} alt="" />
      </div>
    </div>
  );
};

export default Footer;

import KakaoTalkIcon from "@assets/iconElements/KakaoTalkIcon";
import ZaloIcon from "@assets/iconElements/ZaloIcon";
import {
  UtilHome1Icon,
  UtilHome2Icon,
  UtilHome3Icon,
  UtilHome4Icon,
} from "@assets/icons";
import Banner from "@components/Banner/Banner";
import DynamicButton from "@components/Buttons/DynamicButton";
import CartISlideImage from "@components/Card/CartISlideImage";
import HotSaleProductNew from "@components/Category/HotSaleProductNew";
import ContactSession from "@components/Home/ContactSession";
import DistributorSession from "@components/Home/DistributorSession";
import NewsItemHome from "@components/News/Item/NewsItemHome";
import TitleSession from "@components/common/TitleSession";
import ProductNew from "@components/product/ProductNew";
import ProductSale from "@components/product/ProductSale";
import ProductSpecial from "@components/product/ProductSpecial";
import SlideProductPaginate from "@components/product/SlideProductPaginate";
import SlideProducts from "@components/product/SlideProducts";
import OneSpecialProduct from "@components/product/list/OneSpecialProduct";
import useI18n from "@hooks/useI18n";
import useViewport from "@hooks/useViewPort";
import BannerServices from "@services/BannerServices";
import HomeServices from "@services/HomeServices";
import NewsServices from "@services/NewsServices";
import ProductServices, { ProductItem } from "@services/ProductServices";
import { BANNERS } from "@utility/constants";
import { some } from "@utility/helper";
import clsx from "clsx";
import { PaginationCompt } from "commons/Paginnation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const utilShopsFix: some[] = [
  {
    id: 1,
    // title: "GIAO HÀNG MIỄN PHÍ",
    // content: "Áp dụng cho đơn hàng > 1,000,000VND",
    icon: <UtilHome1Icon className="w-full h-auto fill-main" />,
  },
  {
    id: 2,
    // title: "DỄ DÀNG ĐỔI TRẢ",
    // content: "Đổi hàng nhanh chóng trong vòng 30 ngày",
    icon: <UtilHome2Icon className="w-full h-auto fill-main" />,
  },
  {
    id: 3,
    // title: "CAM KẾT CHÍNH HÃNG",
    // content: "Sản phẩm được bán trực tiếp từ hàng chính hãng",
    icon: <UtilHome3Icon className="w-full h-auto fill-main" />,
  },
  {
    id: 4,
    // title: "CSKH BẢO HÀNH",
    // content: "Hotline: 0905 38 69 68 (8:00 - 17:00)",
    icon: <UtilHome4Icon className="w-full h-auto fill-main" />,
  },
];
const bannerImages = [
  "https://daotaodigitalmarketing.vn/wp-content/uploads/2021/09/cong-cu-tao-banner-shopee.jpg",
  "https://atpsoftware.vn/wp-content/uploads//2022/03/banner-shopee-0.png",
  "https://treobangron.com.vn/wp-content/uploads/2023/01/banner-shopee-12.jpg",
];
function HomePage() {
  const { t } = useI18n();
  const { width } = useViewport();
  const [utilShops, setUtilShops] = useState(utilShopsFix);
  const [newsData, setNewsData] = useState<some>([]);
  const [newProducts, setNewProducts] = useState<ProductItem[]>([]);
  const [hotSold, setHotSold] = useState<ProductItem[]>([]);
  // const [bannerHomepage, setbannerHomepage] = useState<string[]>([]);
  const [bannerRecentlyHomepage, setbannerRecentlyHomepage] = useState<
    string[]
  >([]);
  const [bannerHotsoldHomepage, setbannerHotsoldHomepage] = useState<string[]>(
    []
  );

  useEffect(() => {
    try {
      // BannerServices.getBanner(BANNERS.RECENTLY_HOMEPAGE).then((data) => {
      //   setbannerRecentlyHomepage(data?.images);
      // });
      BannerServices.getBanner(BANNERS.HOTSOLD_HOMEPAGE).then((data) => {
        setbannerHotsoldHomepage(data?.images);
      });

      HomeServices.getUtil().then((data) => {
        setUtilShops((pre) => {
          let utilData = data.data.data;
          if (utilData) {
            for (let i = 0; i < pre.length; i++) {
              pre[i].id = utilData[i]?.id;
              pre[i].title = utilData[i]?.title;
              pre[i].content = utilData[i]?.content;
            }
          }
          return [...pre];
        });
      });

      ProductServices.getHotSold().then((data) => {
        setHotSold(data.data);
        if (width > 1280) {
          setHotSold([...data.data.slice(0, 10)]);
        } else if (width > 1023) {
          setHotSold([...data.data.slice(0, 7)]);
        } else {
          setHotSold([...data.data.slice(0, 6)]);
        }
      });

      ProductServices.getProductNew().then((data) => {
        setNewProducts(data.data);
        if (width > 1280) {
          setNewProducts([...data.data.slice(0, 10)]);
        } else if (width > 1023) {
          setNewProducts([...data.data.slice(0, 7)]);
        } else {
          setNewProducts([...data.data.slice(0, 6)]);
        }
      });

      NewsServices.get({ page: 0, limit: 4 }).then((data) => {
        setNewsData(data.data.data);
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    sliceProdcutList();
  }, [width]);

  const sliceProdcutList = () => {
    if (width > 1280) {
      setNewProducts([...newProducts.slice(0, 10)]);
      setHotSold([...hotSold.slice(0, 10)]);
    } else if (width > 1023) {
      setNewProducts([...newProducts.slice(0, 7)]);
      setHotSold([...hotSold.slice(0, 7)]);
    } else {
      setNewProducts([...newProducts.slice(0, 6)]);
      setHotSold([...hotSold.slice(0, 6)]);
    }
  };

  // console.log(newProducts);

  return (
    <div className="">
      <Banner
        className="h-spc230 lg:min-h-[490px] sm:h-[50vh]"
        images={bannerImages}
      />
      <ProductSale />
      <ProductSpecial isbg={false} />
      <ProductNew />
      <ContactSession />
      <DistributorSession />
    </div>
  );
}

export default HomePage;

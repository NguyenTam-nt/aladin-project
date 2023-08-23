import {
  ArrowDownIcon,
  CartIcon,
  CircleFilledIcon,
  GiftOutlineIcon,
  NextArrowIcon,
  PrevArrowIcon,
} from "@assets/icons";
import { PrevIcon } from "@assets/icons/plust-mark/PrevIcon";
import { SaleIcon } from "@assets/icons/plust-mark/SaleIcon";
import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import ProductCarousel from "@components/Carousel/ProductCarousel";
import ColorPicker from "@components/ColorPicker/ColorPicker";
import LoadingPage from "@components/LoadingPage";
import GalleryProductModal from "@components/Modal/GalleryProductModal";
import SizeParametersModal from "@components/Modal/SizeParametersModal";
import SizePicker from "@components/SizePicker/SizePicker";
import AmountChange from "@components/common/AmountChange";
import BreakCrum from "@components/common/BreakCrum";
import { CartItem, useCart } from "@contexts/CartContext";
import { ToastContex } from "@contexts/ToastContex";
import { ModalContext } from "@contexts/contextModal";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";
import useI18n from "@hooks/useI18n";
import ProductServices, {
  ProductItem,
  ProductSize,
} from "@services/ProductServices";
import convertToHtml from "@utility/convertoHtml";
import { formatMoney, some } from "@utility/helper";
import clsx from "clsx";
import React, { memo, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { DiscountElement } from "./DiscountElement";
import DynamicButton from "@components/Buttons/DynamicButton";
import CricleButton from "@components/Buttons/CricleButton";
import { colors } from "@utility/colors";
import { ShoppingCart } from "@assets/icons/plust-mark/ShoppingCart";
import { Cart } from "@assets/icons/plust-mark/Cart";
import { HeadPhone } from "@assets/icons/plust-mark/HeadPhone";
import { ProductInfo } from "./ProductInfo";
import Specifications from "./Specifications";
import { useTranslation } from "react-i18next";
import ProductInTheSameCtegory from "./ProductInTheSameCtegory";
import GetFreeConsulationModal from "./modal/GetFreeConsultationModal";

const breakcrumData: BreadcrumbType[] = [
  {
    name: "Trang chủ",
    clickable: true,
    active: false,
    link: "/",
  },
  {
    name: "Adidas",
    clickable: true,
    active: false,
    link: "/",
  },
];

export const ServiceItem = memo((props: { icon: ReactNode, content: string }) => {
  const { icon, content } = props;
  return (
    <>
      <div className="flex flex-row gap-x-1 items-center">
        {icon}
        <p className="font-NunitoSans text-wap-regular2 font-normal text-black-bl0">{content}</p>
      </div>
    </>
  )
});

export const TextGradient = memo((props: { title: string, clssName?: string }) => {
  return (
    <>
      <div className={clsx('text-transparent font-NunitoSans bg-clip-text bg-gradient-to-tr from-red-red500 to-orange-orange400',
        props.clssName
      )}>
        {props.title}
      </div>
    </>
  )
});

export const ButtonTabGradient = memo((props: { title: string, clssName?: string, currentTab: string, keyTab: string, gradient?: boolean }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={clsx('font-NunitoSans',
        {
          'text-transparent bg-clip-text bg-gradient-to-tr from-red-red500 to-orange-orange400': props.currentTab === props.keyTab && props.gradient,
          'text-text-disable ': props.currentTab !== props.keyTab
        },
        props.clssName
      )}>
        {t(props.title)}
      </div>
    </>
  )
});

export const Outstanding = memo((props: { content: string }) => {
  return (
    <>
      <div className="flex flex-row gap-x-1 items-start">
        <span>&#x2022;</span>
        <div className="text-normal font-normal font-NunitoSans text-neutra-neutra20">{props.content}</div>
      </div>
    </>
  )
})
export const SERVICES = [
  { icon: <PrevIcon />, content: "100% Hàng Việt Nam Chất Lượng Cao" },
  { icon: <PrevIcon />, content: "Cam Kết Giá Tốt Nhất & CTKM Hấp Dẫn" },
  { icon: <PrevIcon />, content: "Dịch Vụ Bảo Hành Chuyên Nghiệp" },
  { icon: <PrevIcon />, content: "Giao Hàng Toàn Quốc" },
]
export type ExploreTabKey = 'product-info' | 'specifications';
export const exploreTabs: { key: ExploreTabKey; text: string }[] = [
  { key: 'product-info', text: 'product.product-info' },
  { key: 'specifications', text: 'product.table.specifications' },
];

export type ExploreTabKeyProducts = 'products-in-the-same-category' | 'viewed-products';
export const exploreTabsProducts: { key: ExploreTabKeyProducts; text: string }[] = [
  { key: 'products-in-the-same-category', text: 'product.products-in-the-same-category' },
  { key: 'viewed-products', text: 'product.viewed-products' },
];


const ProductDetailNew = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { onChangeItem } = useCart();
  const { listToast, onAddToast } = useContext(ToastContex);
  const [productData, setproductData] = useState<ProductItem>();
  const [isLoading, setIsLoading] = useState(false);
  const { setContentModal, setShowModal } = useContext(ModalContext);
  const param = useParams();
  const [lastBreakCrumb, setlastBreakCrumb] = useState<BreadcrumbType>();

  const [colorSelected, setcolorSelected] = useState(productData?.colors && productData?.colors.length > 0 && productData?.colors[0]);
  const [sizeSelected, setsizeSelected] = useState<ProductSize>();
  const [openDetailInfo, setopenDetailInfo] = useState(true);
  const [openPolicyInfo, setopenPolicyInfo] = useState(false);

  const [quantityDescActive, setQuantityDescActive] = useState<boolean>(false);
  const [quantityAscActive, setQuantityAscActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const [imageView, setimageView] = useState<string>();

  const [productRelated, setproductRelated] = useState<ProductItem[]>();
  const [productSeen, setproductSeen] = useState<ProductItem[]>();
  const [currentTab, setCurrentTab] = useState<ExploreTabKey>("product-info");
  const [currentTabProducts, setCurrentTabProducts] = useState<ExploreTabKeyProducts>("products-in-the-same-category");

  const slideRef = useRef<any>(null);
  const nextSlide = useCallback(() => {
    if (slideRef.current) {
      slideRef.current.swiper.slideNext();
    }
  }, []);
  const prevSlide = useCallback(() => {
    if (slideRef.current) {
      slideRef.current.swiper.slidePrev();
    }
  }, []);

  const showModalSize = () => {
    setContentModal(<SizeParametersModal imageUrl={productData?.imageCheck} />);
    setShowModal(true);
  };

  const showGetFreeConsulation = () => {
    setContentModal(<GetFreeConsulationModal />);
    setShowModal(true);
  }
  useEffect(() => {
    if (productData && colorSelected && colorSelected?.image) {
      setimageView(colorSelected?.image || productData.images[0]);
    }
    setSize();
  }, [colorSelected]);

  useEffect(() => {
    if (param.productId) {
      try {
        setIsLoading(true);
        ProductServices.getProductDetail(param.productId)
          .then((data) => {
            // console.log(data.data)
            setproductData(data);
            setcolorSelected(data.colors[0]);
            setSize();
            setTimeout(() => {
              setimageView(data.video || data.images[0]);
            }, 0);

            setQuantityDescActive(false);
            setQuantityAscActive(true);

            setlastBreakCrumb({
              name: data.name,
              clickable: false,
              active: true,
              link: "",
            });

            setIsLoading(false);
            ProductServices.getProductRelated(data.category.categorySId).then(
              (data) => {
                setproductRelated(data.data);
              }
            );

            ProductServices.getProductSeenMost().then((data) => {
              setproductSeen(data.data);
            });
          })
          .catch((error) => {
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
  }, [param, param.productId]);

  const handleIncrease = () => {
    let total = sizeSelected?.total || 0;
    if (total == quantity + 1) {
      setQuantityAscActive(false);
    }
    if (total > quantity) {
      setQuantity((prev) => 1 + prev);
      setQuantityDescActive(true);
    }
  };

  const handleDecrease = () => {
    let total = sizeSelected?.total || 0;
    if (total > quantity - 1) {
      setQuantityAscActive(true);
    }
    setQuantity((prev) => {
      if (prev == 2) setQuantityDescActive(false);
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const setSize = () => {
    setsizeSelected(undefined);
    if (colorSelected && colorSelected.sizes) {
      for (let i = 0; i < colorSelected.sizes.length; i++) {
        if (colorSelected.sizes[i].total > 0) {
          setsizeSelected(colorSelected.sizes[i]);
          break;
        }
      }
    }
  };

  const handleAddToCart = () => {
    let priceTemp = productData?.price || 0;
    let saleTmp = sizeSelected?.sale || 0;
    // console.log(quantity);

    if (!sizeSelected || sizeSelected.total == 0) {
      onAddToast({ type: "error", message: `Số lượng sản phẩm đã hết!` });
      return;
    }

    if (sizeSelected && colorSelected) {
      const cartItem: CartItem = {
        id: productData?.id || "",
        name: productData?.name || "",
        image: colorSelected.image || productData?.images[0] || "",
        price: sizeSelected.priceSale || 0,
        size: sizeSelected,
        color: colorSelected,
        quantity: quantity,
        sku: productData?.sku || "",
      };
      onChangeItem(productData?.id || "", cartItem);
      onAddToast({ type: "success", message: `Thêm sản phẩm thành công` });
    }
  };

  const handleBuyNow = () => {
    if (!colorSelected || !sizeSelected) {
      onAddToast({ type: "error", message: `Số lượng sản phẩm đã hết!` });
      return;
    }

    const cartItem: CartItem = {
      id: productData?.id || "",
      name: productData?.name || "",
      image: colorSelected.image || productData?.images[0] || "",
      price: sizeSelected.priceSale || 0,
      size: sizeSelected,
      color: colorSelected,
      quantity: 1,
      choose: true,
      sku: productData?.sku || "",
    };
    onChangeItem(productData?.id || "", cartItem);
    navigate("/cart");
  };

  const handleShowGallery = () => {
    if (productData?.images && imageView) {
      setContentModal(
        <GalleryProductModal
          video={productData?.video}
          images={productData?.images}
          srcInit={imageView}
        />
      );
      setShowModal(true);
    }
  };

  return (
    <div className="pt-6 pb-10">
      {/* <div className="container px-4 lg:px-8">
        <BreakCrumb data={breakcrumData} lastData={lastBreakCrumb} normalClass="text-normal1" activeClass="font-bold"  />
      </div> */}
      <div className="px-[172px]">
        <BreakCrumb data={breakcrumData} lastData={lastBreakCrumb} normalClass="text-normal1" activeClass="font-bold" />
        <div className="pt-5 flex-1 grid grid-cols-[1fr_380px] justify-between gap-x-5">
          <div className="flex flex-col">
            <div className="flex-1 grid grid-cols-[120px_1fr] gap-x-5">
              <div className="w-full h-[636px] flex flex-col items-center gap-y-3">
                <button
                  className="flex items-center justify-center w-12 h-12 border border-neutra-neutra80 rounded-full"
                  onClick={prevSlide}
                >
                  <PrevIcon />
                </button>
                <Swiper
                  modules={[Autoplay, Navigation]}
                  direction="vertical"
                  ref={slideRef}
                  // loop={true}
                  slidesPerView={4}
                  spaceBetween={10}
                  className="w-full h-[516px] flex items-center justify-center gap-2 -z-1"
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                >
                  {productData && productData?.images && productData?.images.length > 0 && productData?.images.map((it, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        onClick={() => setimageView(it)}
                        className="aspect-square object-cover rounded-md cursor-pointer w-full h-full"
                        src={it}
                        alt="product-image"
                      ></img>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className="flex items-center justify-center w-12 h-12 border border-neutra-neutra80 rounded-full"
                  onClick={nextSlide}
                >
                  <div className="rotate-180">
                    <PrevIcon />
                  </div>
                </button>
              </div>
              <div
                // onClick={handleShowGallery}
                className="w-full h-[640px] relative rounded-lg shadow-shd020"
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={imageView}
                  alt="product-img"
                />
                <DiscountElement content="-30%" className="text-white text-normal2 font-NunitoSans font-extrabold" />
              </div>
            </div>
            <div className="pt-[60px] flex-1 flex flex-row">
              {
                exploreTabs.map((it, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentTab(it.key)}
                      className={clsx('flex-1 flex items-center justify-center',
                        {
                          'border-b-[3px] border-orange-lightPink': currentTab === it.key,
                          'mb-[1px] border-b-[1px] border-aqua-aq02': currentTab !== it.key
                        }
                      )}>
                      <ButtonTabGradient
                        keyTab={it.key}
                        title={it.text}
                        currentTab={currentTab}
                        gradient={true}
                        clssName="text-normal2 font-bold"
                      />
                    </button>
                  )
                })
              }
            </div>
            <div className="pt-[34px] ">
              <>
                {currentTab === 'product-info' && (
                  <div>
                    <ProductInfo content={productData?.detail} />
                  </div>
                )}
              </>
              <>
                {currentTab === 'specifications' && (
                  <div>
                    <Specifications />
                  </div>
                )}
              </>
            </div>

          </div>
          <div>
            <div className="w-full h-auto bg-white rounded-lg relative">
              <DiscountElement content="-30%" widthIcon={97} heightIcon={34} className="text-white text-[20px] leading-normal font-NunitoSans font-extrabold" />
              <div className="pt-[50px] px-[13px] pb-6">
                <p className="font-NunitoSans text-normal2 text-text-main font-bold">Hộp trà tắc giảm cân an toàn Jẹu Hàn Quốc</p>
                <div className="pt-3 flex  flex-row items-center gap-x-4 border-b-[2px] border-aqua-aq02">
                  <TextGradient title={sizeSelected ? formatMoney(400000) : formatMoney(productData?.price || 0)} clssName="text-title font-bold " />
                  <p className="line-through font-NunitoSans text-normal1 font-normal text-gray-600">{formatMoney(430000)}</p>
                </div>
                <div className="pt-6 flex flex-row gap-x-3 items-center">
                  <p className="font-NunitoSans font-normal text-normal text-black-bl0">Khối lượng:</p>
                  <div className="flex w-fit flex-wrap gap-x-2">
                    {colorSelected && colorSelected?.sizes && colorSelected?.sizes.map((s, i) => {
                      return (
                        <>
                          {i < 3 && (
                            <SizePicker
                              selected={sizeSelected}
                              data={s}
                              handleClick={setsizeSelected}
                              key={i}
                            />
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-3 flex flex-row gap-x-3 items-center">
                  <p className="font-NunitoSans font-normal text-normal text-black-bl0">Số lượng:</p>
                  <AmountChange
                    quantity={quantity}
                    descActive={quantityDescActive}
                    ascActive={quantityAscActive}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                  />
                </div>
                <div className="pt-4">
                  <div className="px-3 pt-2 pb-3 bg-aqua-aq03 rounded-lg">
                    <div className="pb-3">
                      <h1 className="font-NunitoSans text-normal font-bold text-neutra-neutra20">Yên tâm mua hàng tại Market Moa</h1>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      {
                        SERVICES.map((it, idx) => {
                          return (
                            <ServiceItem key={idx} icon={it.icon} content={it.content} />
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className="pt-3 flex flex-row gap-x-1">
                  <DynamicButton
                    onClick={handleAddToCart}
                    text="Thêm giỏ hàng"
                    textGradient={true}
                    iconLeft={<ShoppingCart />}
                    className="!rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                  />
                  <DynamicButton
                    onClick={showGetFreeConsulation}
                    text="Tư vấn mua hàng"
                    textGradient={true}
                    iconLeft={<HeadPhone />}
                    className="!rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                  />
                </div>
                <div className="pt-3">
                  <DynamicButton
                    onClick={handleBuyNow}
                    text="Mua ngay"
                    gradien={true}
                    iconLeft={<Cart />}
                    className="w-full !rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                  />
                </div>
                <div className="pt-3">
                  <p className="text-normal2 font-bold font-NunitoSans text-neutra-neutra20">Đặc điểm nổi bật</p>
                  <div className="px-1 pt-3 flex flex-col gap-y-1">
                    <Outstanding content="Dung tích 1.2L phù hợp sử dụng cho 2 - 4 người." />
                    <Outstanding content="Lòng nồi hợp kim nhôm phủ chống dính cao cấp, an toàn cho sức khỏe." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="px-[155px]">
        <div className="pt-[34px] flex-1 flex flex-row">
          {
            exploreTabsProducts.map((it, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentTabProducts(it.key)}
                  className={clsx('flex-1 flex items-center justify-start',
                    {
                      'border-b-[3px] border-orange-lightPink': currentTabProducts === it.key,
                      'mb-[1px] border-b-[1px] border-aqua-aq02': currentTabProducts !== it.key
                    }
                  )}>
                  <ButtonTabGradient
                    keyTab={it.key}
                    title={it.text}
                    currentTab={currentTabProducts}
                    gradient={true}
                    clssName="text-normal2 font-bold"
                  />
                </button>
              )
            })
          }
        </div>
        <div className="pt-[34px]">
          <>
            {currentTabProducts === 'products-in-the-same-category' && (
              productRelated && productRelated.length > 0 && (
                <ProductCarousel product={productRelated} />
              )
            )}
          </>
          <>
            {currentTabProducts === 'viewed-products' && (
              productSeen && productSeen.length > 0 && (
                <ProductCarousel product={productSeen} />
              )
            )}
          </>
        </div>
      </div>
    </div>
  );
};

// return(
//   <div className="container p-4 lg:p-8  bg-white">
//   {!isLoading ? (
//     <div className="flex flex-col lg:flex-row gap-5 lg:border-b-[1px] pb-8">
//       <div className="w-full lg:w-[40%]">
//         <div className="w-full flex flex-col  gap-8">
//           <div className="">
//             <div
//               className="h-[500px] relative  mb-2"
//               onClick={handleShowGallery}
//             >
//               {productData &&
//                 productData.video &&
//                 imageView == productData?.video ? (
//                 <video
//                   className=" w-full h-full object-contain rounded-md "
//                   autoPlay
//                   muted
//                   controls
//                   src={imageView}
//                   poster={imageView}
//                 />
//               ) : (
//                 <img
//                   className="w-full h-full object-contain rounded-md"
//                   src={imageView}
//                   alt="product-img"
//                 />
//               )}
//               {sizeSelected && sizeSelected.sale ? (
//                 <div className="absolute top-0 left-0">
//                   <div className="py-1 px-1 lg:px-2 flex items-center bg-icon text-normal2 font-bold text-main rounded-tl-md rounded-br-md">
//                     {sizeSelected.sale}%
//                   </div>
//                 </div>
//               ) : (
//                 <></>
//               )}
//               {/*  */}
//             </div>
//             {/* <div className="relative overflow-hidden rounded-md">
//               <button
//                 className="absolute  z-10 bg-transparent top-0 left-0 flex items-center justify-center w-8 h-full"
//                 onClick={prevSlide}
//               >
//                 <PrevArrowIcon className="fill-white w-2 " />
//               </button>
//               <button
//                 className="absolute z-10 bg-transparent top-0 right-0 flex items-center justify-center  w-8 h-full"
//                 onClick={nextSlide}
//               >
//                 <NextArrowIcon className="fill-white w-2  " />
//               </button>
//               <div className="z-2 absolute w-8 h-full top-0 left-0 bg-gradient-to-r from-zinc-400 rounded-md"></div>
//               <div className="z-2 absolute w-8 h-full top-0 right-0 bg-gradient-to-l from-zinc-400 rounded-md"></div>
//               <Swiper
//                 modules={[Autoplay, Navigation]}
//                 ref={slideRef}
//                 // loop={true}
//                 slidesPerView={4}
//                 spaceBetween={10}
//                 className=" w-full gap-2 -z-1"
//                 autoplay={{
//                   delay: 2000,
//                   disableOnInteraction: false,
//                 }}
//               >
//                 {productData?.video && (
//                   <SwiperSlide>
//                     <video
//                       className=" aspect-square object-contain rounded-md cursor-pointer"
//                       autoPlay
//                       muted
//                       onClick={() =>
//                         setimageView(productData?.video || "")
//                       }
//                       src={productData?.video || ""}
//                     />
//                   </SwiperSlide>
//                 )}

//                 {productData && productData?.images && productData?.images.length > 0 && productData?.images.map((it, idx) => (
//                   <SwiperSlide key={idx}>
//                     <img
//                       onClick={() => setimageView(it)}
//                       className=" aspect-square object-contain rounded-md cursor-pointer"
//                       src={it}
//                       alt="product-image"
//                     ></img>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div> */}
//           </div>
//         </div>
//       </div>
//       <div className="flex-1">
//         <div className="lg:px-5">
//           <h1 className="text-normal2 font-bold text-black py-2">
//             {productData?.name}
//           </h1>
//           <h2 className="text-wap-regular2 text-background-100">
//             {t("detail_product.product_info.code_product")}
//             {productData?.sku}
//           </h2>
//           <div className="flex items-baseline gap-8 py-3">
//             <p className="text-normal2 lg:text-title font-medium text-main">
//               {sizeSelected ? formatMoney(sizeSelected?.priceSale || 0) : formatMoney(productData?.price || 0)}
//             </p>
//             {sizeSelected && sizeSelected.sale ? (
//               <p className="text-normal1 lg:text-normal2 line-through text-background-100">
//                 {formatMoney(productData?.price || 0)}
//               </p>
//             ) : (
//               <></>
//             )}
//           </div>
//           {/* <div className="flex gap-5 py-2">
//             {colorSelected && productData?.colors.map((it, idx) => (
//               <ColorPicker
//                 selected={colorSelected}
//                 data={it}
//                 key={idx}
//                 handleClick={setcolorSelected}
//               />
//             ))}
//           </div> */}
//           <div className="mt-4">
//             <div className="flex  w-fit flex-wrap">
//               {colorSelected && colorSelected?.sizes && colorSelected?.sizes.map((s, i) => {
//                 return (
//                   <SizePicker
//                     selected={sizeSelected}
//                     data={s}
//                     handleClick={setsizeSelected}
//                     key={i}
//                   />
//                 );
//               })}
//             </div>
//             {productData?.imageCheck && (
//               <div
//                 className="mt-2 text-wap-regular2 text-main hover:cursor-pointer"
//                 onClick={showModalSize}
//               >
//                 {t("detail_product.product_info.instruction_size")}
//                 {">"}
//               </div>
//             )}
//           </div>
//           <div className="mt-6">
//             <AmountChange
//               quantity={quantity}
//               descActive={quantityDescActive}
//               ascActive={quantityAscActive}
//               handleIncrease={handleIncrease}
//               handleDecrease={handleDecrease}
//             />
//             <div className="mt-2 text-wap-regular2 text-main">
//               {t("detail_product.product_info.amount", {
//                 amount: sizeSelected?.total || 0,
//               })}
//             </div>
//           </div>
//           <div className="mt-4 flex gap-4 h-[50px]  border-background-100">
//             <button
//               className="btn   text-main bg-icon border-[1px] border-main  rounded-md flex items-center gap-1"
//               onClick={handleAddToCart}
//             >
//               <CartIcon className="fill-main" />{" "}
//               {t("detail_product.product_info.add_product")}
//             </button>
//             <button
//               className="btn  text-white bg-main text-normal px-2 lg:px-8  rounded-md flex items-center gap-1"
//               onClick={handleBuyNow}
//             >
//               {t("detail_product.product_info.buy")}
//             </button>
//           </div>
//           <div className="mt-4 py-4 border-b-[1px] border-t-[1px]">
//             <p
//               className={clsx(
//                 "flex gap-2 text-normal1  font-bold hover:cursor-pointer select-none",
//                 { "text-main": openDetailInfo }
//               )}
//               onClick={() => setopenDetailInfo(!openDetailInfo)}
//             >
//               {t("detail_product.product_info.info")}{" "}
//               <ArrowDownIcon
//                 className={clsx("fill-black", {
//                   "rotate-180 fill-main": openDetailInfo,
//                 })}
//               />
//             </p>
//             {
//               <div
//                 className={clsx("text-normal mt-2 overflow-hidden", {
//                   "h-0": !openDetailInfo,
//                   "h-auto": openDetailInfo,
//                 })}
//               >
//                 <div
//                   className="h-fit max-h-fit w-full bg-transparent resize-none overflow-hidden"
//                   style={{ whiteSpace: "pre-line" }}
//                   dangerouslySetInnerHTML={{ __html: productData?.detail || "" }}
//                 >
//                   {/* {productData?.detail || ""} */}
//                 </div>
//               </div>
//             }
//           </div>
//           {productData?.policy && productData?.policy.length > 0 ? (
//             <div className="mt-4 pb-4 border-b-[1px]">
//               <p
//                 className={clsx(
//                   "flex gap-2 text-normal1  font-bold hover:cursor-pointer select-none",
//                   { "text-main": openPolicyInfo }
//                 )}
//                 onClick={() => setopenPolicyInfo(!openPolicyInfo)}
//               >
//                 {t("detail_product.product_info.policy")}{" "}
//                 <ArrowDownIcon
//                   className={clsx("fill-black", {
//                     "rotate-180 fill-main": openPolicyInfo,
//                   })}
//                 />
//               </p>
//               {
//                 <div
//                   className={clsx("text-normal mt-2 overflow-hidden", {
//                     "h-0": !openPolicyInfo,
//                     "h-auto": openPolicyInfo,
//                   })}
//                 >
//                   <div
//                     className="h-fit max-h-fit w-full bg-transparent resize-none overflow-hidden"
//                     style={{ whiteSpace: "pre-line" }}
//                     dangerouslySetInnerHTML={{ __html: productData?.policy || "" }}
//                   >
//                     {/* {productData?.policy || ""} */}
//                   </div>
//                 </div>
//               }
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="h-48 min-h-full w-full flex justify-center items-center">
//       <LoadingPage />
//     </div>
//   )}
//   {productRelated && productRelated.length > 0 && (
//     <div className="pt-4 border-b-[1px]">
//       <div className="pt-4 text-normal2 lg:text-title font-semibold flex justify-center">
//         {t("detail_product.product_relative")}
//       </div>
//       <div className="">
//         <ProductCarousel product={productRelated} />
//       </div>
//     </div>
//   )}
//   {productSeen && productSeen.length > 0 && (
//     <div className="pt-4">
//       <div className="pt-4 text-normal2 lg:text-title font-semibold flex justify-center">
//         {t("detail_product.product_viewed")}
//       </div>
//       <div className="">
//         <ProductCarousel product={productSeen} />
//       </div>
//     </div>
//   )}
// </div>
// )
export default ProductDetailNew;

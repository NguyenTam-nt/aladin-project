import {
  ArrowDownIcon,
  CartIcon,
  CircleFilledIcon,
  GiftOutlineIcon,
  LineIcon,
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
import useViewport from "@hooks/useViewPort";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import NewAdd from "@components/AdminComponents/New/NewAdd";

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
        <div className="2lg:text-normal ssm:text-wap-regular2 font-normal font-NunitoSans text-neutra-neutra20">{props.content}</div>
      </div>
    </>
  )
})

interface PropsPicker {
  selected: { key: any, name: any }[],
  data: IAttributeFes[],
  handleClick: (keySelected: string, atb: any) => void,
  keySelected: string,
  name: string,
  atb: any,
  datAatb: IAttributeFes,
  dataAtbValue: IAttributeFeValues,
  attributeFe: string,
  idxs: number,
  actionKey: { key: any, name: any }
  // value: string
}

export const SelectedPicker = (props: PropsPicker) => {
  const { data, handleClick, selected, name, atb, keySelected, actionKey = { key: null, name: null } } = props;
  const [atbs, setatbs] = useState<IAttributeFes>();
  const [atbvalue, setatbvalue] = useState<IAttributeFeValues>();
  const [select, setSelect] = useState<{ key: any, name: any }>();

  const handleClickATB = (atb: string) => {
    handleClick(keySelected, name);
  }

  return (
    <div className={clsx(
      "w-auto px-2 h-[30px] text-black-bl0 2lg:text-normal1 cursor-pointer ssm:text-wap-regular2 uppercase flex border border-neutra-neutra80 items-center justify-center rounded relative",
      {
        "bg-aqua-aq02 text-white ": actionKey.name == name,
        "bg-white": actionKey.name != name,
      })
    } onClick={() => handleClickATB(atb)}>
      {atb}
      {/* {
        data.total <= 0 && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <LineIcon />
          </div>
        )
      } */}
    </div>
  )
}

interface IAttributeFeValues {
  valueVn: string,
  valueKr: string
}
interface IAttributeFes {
  attributeFeValues: IAttributeFeValues[],
  attributeFeNameKr: string,
  attributeFeNameVn: string
}
interface IAttributes {
  valueVn: string,
  valueKr: string,
  attributeNameVn: string,
  attributeNameKr: string
}
interface IProductDetails {
  productDetailId: number,
  priceDetail: number,
  promoDetail: number,
  actualPriceDetail: number,
  stockQuantity: number,
  soldQuantity: number,
  addressWarehouse: string,
  imageDetailUrl: string,
  attributes: IAttributes[]

}

interface IProduct {
  id?: number,
  productCode: string,
  productNameVn: string,
  productNameKr: string,
  categoryId: number,
  subCategoryId: number,
  price: number,
  promo: number,
  actualPrice: number,
  stockQuantity: number,
  salientFeaturesVn: string,
  salientFeaturesKr: string,
  detailVn: string,
  detailKr: string,
  specVn: string,
  specKr: string,
  featured: number,
  createAt: string,
  videoUrl: string,
  warehouse:
  {
    address: string
  }[]
  ,
  attributeFes: IAttributeFes[],
  productDetails: IProductDetails[],
  images: {
    url: string
  }[]
}
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


  const [productDetail, setProductDetail] = useState<IProduct>();
  const [attributes, setAttributes] = useState<IAttributes[]>([]);
  const [attributeFes, setAttributeFes] = useState<IAttributeFes[]>([]);
  const [keySelected, setKeySelected] = useState<{ key: string, name: string }[]>([]);
  const [productDetailItem, setProductDetailItem] = useState<any>();
  console.log({ productDetailItem });

  const { isVn } = useI18n();
  const { width } = useViewport();
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
    const productId = param.productId;
    if (productId) {
      getProductId(productId);
    }
  }, [param, param.productId]);

  const getProductId = async (id: any) => {
    try {
      const res: IProduct = await ProductServices.findProductById(id);
      if (res) {
        setProductDetail(res);
        setAttributeFes(res?.attributeFes);
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleSelected = (key: string, atb: any) => {
    const keySelectedList = [...keySelected];
    //&& index[0].name != atb && atb && index[0].key == key
    const index = keySelectedList.filter((it) => it.key == key);
    if (index.length > 0 && index[0].name != atb && atb && index[0].key == key) {
      const data = keySelected.map((it) => {
        if (it.key == key) {
          return { ...it, name: atb }
        }
        return it
      });
      getProductDetailItem(data);
      setKeySelected(data);
    } else if (index.length > 0 && index[0].name == atb && index[0].key == key) {
      const data = keySelected.filter((it) => it.key !== key);
      getProductDetailItem(data);
      setKeySelected(data);
    } else {
      const newSelected = {
        key: key,
        name: atb
      }
      getProductDetailItem([...keySelected, newSelected]);
      setKeySelected([...keySelected, newSelected]);
    }
  }

  const getProductDetailItem = (selected: { key: any, name: any }[]) => {
    const key = selected.map((it) => {
      return { attributeNameVn: it.key.slice(0, -4), valueVn: it.name.slice(0, -5) }
    });

    const it_key_sort = key.sort((a, b) => {
      let fa = a.attributeNameVn.toLowerCase(),
        fb = b.attributeNameVn.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    const item = productDetail?.productDetails?.map((its, idx) => {
      return {
        ...its, attributes: its.attributes.map((it) => {
          return { attributeNameVn: it.attributeNameVn, valueVn: it.valueVn }
        })
      }
    })

    const result = item?.filter((its) => JSON.stringify(it_key_sort) == JSON.stringify(its.attributes) == true);

    if (result && result?.length > 0) {
      setProductDetailItem(result[0]);
    }else{
      setProductDetailItem(null)
    }
    // setProductDetailItem();
  }

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
    <div className="2lg:pt-6 2lg:pb-10 ssm:pb-6">
      {/* <div className="container px-4 lg:px-8">
        <BreakCrumb data={breakcrumData} lastData={lastBreakCrumb} normalClass="text-normal1" activeClass="font-bold"  />
      </div> */}
      <div className="3xl:px-[172px] 2xl:px-[150px] lg:px-10 ssm:px-0">
        {
          width >= 1024 && (
            <BreakCrumb data={breakcrumData} lastData={lastBreakCrumb} normalClass="text-normal1" activeClass="font-bold" />
          )
        }
        <div className="layout lg:pt-5 ssm:pt-0">
          <div className="desc">
            <div className="flex-1 site lg:gap-x-5 ssm:gap-y-4">
              <div className="lg:px-0 ssm:px-3 section1 w-full 2xl:h-[636px] flex 2xl:flex-col ssm:flex-row items-center lg:gap-y-3 ssm:gap-x-[7px]">
                <div className="lg:w-12 lg:h-12 ssm:w-[30px] ssm:h-[30px]">
                  <button
                    className="w-full h-full flex items-center justify-center border border-neutra-neutra80 rounded-full"
                    onClick={prevSlide}
                  >
                    <div className="2xl:rotate-0 ssm:-rotate-90">
                      <PrevIcon />
                    </div>
                  </button>
                </div>
                <Swiper
                  modules={[Autoplay, Navigation]}
                  direction={width >= 1536 ? "vertical" : "horizontal"}
                  ref={slideRef}
                  // loop={true}
                  slidesPerView={4}
                  spaceBetween={10}
                  className="ssm:w-[80%] sm:w-[90%] lg:w-[80%] xl:w-[90%]  2xl:w-full 2xl:h-[516px] ssm:h-[66px] lg:h-[100px] flex items-center justify-center -z-1"
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                >
                  {productData && productData?.images && productData?.images.length > 0 && productData?.images.map((it, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        onClick={() => setimageView(it)}
                        className={clsx('object-cover rounded-md w-full h-full ',
                          { 'border-[1px] border-aqua-aq02': imageView === it }
                        )}
                        src={it}
                        alt="product-image"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className="section2 flex items-center justify-center lg:w-12 lg:h-12 ssm:w-[30px] ssm:h-[30px] border border-neutra-neutra80 rounded-full"
                  onClick={nextSlide}
                >
                  <div className="2xl:rotate-180 ssm:rotate-90">
                    <PrevIcon />
                  </div>
                </button>
              </div>
              <div
                // onClick={handleShowGallery}
                className="w-full 2xl:h-[640px] lg:h-[460px] xl:h-[550px] ssm:h-[370px] relative lg:rounded-lg shadow-shd020"
              >
                <img
                  className="w-full h-full object-cover lg:rounded-lg"
                  src={imageView}
                  alt="product-img"
                />
              </div>
            </div>
          </div>
          <div className="toc ssm:px-[15px] lg:px-0 ssm:pt-6 lg:pt-0">
            <div className="w-full h-auto bg-white rounded-lg relative">
              <DiscountElement content={productDetailItem ? productDetailItem.promoDetail : productDetail?.promo} widthIcon={97} heightIcon={34} className="text-white text-[20px] leading-normal font-NunitoSans font-extrabold" />
              <div className="pt-[50px] ssm:px-1 lg:px-[13px] 2xl:px-4 2lg:pb-6 ssm:pb-[18px]">
                <p className="font-NunitoSans 2lg:text-normal2 ssm:text-normal1 text-text-main font-bold">{isVn ? productDetail?.productNameVn : productDetail?.productNameKr}</p>
                <div className="pt-3 flex flex-row items-center gap-x-4 border-b-[2px] border-aqua-aq02">
                  <TextGradient title={productDetailItem ? formatMoney(productDetailItem?.actualPriceDetail) : formatMoney(productDetail?.actualPrice || 0)} clssName="2lg:text-title ssm:text-[20px] ssm:leading-normal font-bold " />
                  <p className="line-through font-NunitoSans 2lg:text-normal1 ssm:text-wap-regular2 font-normal text-gray-600">{productDetailItem ? formatMoney(productDetailItem?.priceDetail) : formatMoney(productDetail?.price || 0)}</p>
                </div>

                <div className="lg:pt-4 2xl:pt-6 ssm:pt-[34px] lg:pl-0 ssm:pl-3 flex flex-col gap-x-3 items-start gap-y-2">
                  {
                    (attributeFes ?? []).map((its, idxs) => {
                      return (
                        <div className="flex items-center" key={idxs}>
                          <p className="font-NunitoSans font-normal 2lg:text-normal ssm:text-wap-regular2 text-black-bl0">{isVn ? its.attributeFeNameVn : its.attributeFeNameKr}:</p>
                          <div className=" pl-3 flex w-fit flex-wrap gap-x-2">
                            {
                              its.attributeFeValues.map((it, idx) => {
                                const actionKey = keySelected.filter((it) => it.key == `${its.attributeFeNameVn}_key`)

                                return (
                                  <>
                                    <SelectedPicker
                                      selected={keySelected}
                                      data={attributeFes}
                                      attributeFe={isVn ? its.attributeFeNameVn : its.attributeFeNameKr}
                                      keySelected={`${its.attributeFeNameVn}_key`}
                                      name={`${it.valueVn}_name`}
                                      atb={isVn ? it.valueVn : it.valueKr}
                                      handleClick={handleSelected}
                                      key={idx}
                                      datAatb={its}
                                      dataAtbValue={it}
                                      idxs={idxs}
                                      actionKey={actionKey[0]}
                                    />
                                  </>
                                )
                              })
                            }
                          </div>
                        </div>
                      )
                    })
                  }

                  <div className="flex w-fit flex-wrap gap-x-2">
                    {/* {colorSelected && colorSelected?.sizes && colorSelected?.sizes.map((s, i) => {
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
                    })} */}
                  </div>
                </div>
                <div className="pt-3 lg:pl-0 ssm:pl-3 flex flex-row gap-x-3 items-center">
                  <p className="font-NunitoSans font-normal 2lg:text-normal ssm:text-wap-regular2 text-black-bl0">{t('product.quantity')}:</p>
                  <AmountChange
                    quantity={quantity}
                    descActive={quantityDescActive}
                    ascActive={quantityAscActive}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                  />
                </div>
                <div className="pt-4">
                  <div className="px-3 pt-2 2xl:pb-3 ssm:pb-[2px] bg-aqua-aq03 rounded-lg">
                    <div className="pb-3">
                      <h1 className="font-NunitoSans text-normal font-bold text-neutra-neutra20">{t('product.faith')}</h1>
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
                <div className="2lg:pt-3 ssm:pt-6 flex flex-row gap-x-1">
                  <DynamicButton
                    onClick={handleAddToCart}
                    text={t('product.add-to-cart')}
                    textGradient={true}
                    iconLeft={<ShoppingCart />}
                    className="!rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                  />
                  <DynamicButton
                    onClick={showGetFreeConsulation}
                    text={t('product.head-phone')}
                    textGradient={true}
                    iconLeft={<HeadPhone />}
                    className="flex-1 !rounded-[20px]  !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                  />
                </div>
                <div className="2lg:pt-3 ssm:pt-[22px]">
                  <DynamicButton
                    onClick={handleBuyNow}
                    text={t('product.buy-now')}
                    gradien={true}
                    iconLeft={<Cart />}
                    className="w-full !rounded-[20px] !px-[6px] !py-2 !min-w-[83px] text-[16px] leading-normal font-bold font-NunitoSans"
                  />
                </div>
                <div className="2lg:pt-3 ssm:pt-4 2lg:px-0 ssm:px-[11px]">
                  <p className="2lg:text-normal2 ssm:text-normal ssm:font-bold font-NunitoSans text-neutra-neutra20">{t('product.outstanding-features')}</p>
                  <div className="2lg:px-1 ssm:px-2 pt-3 flex flex-col gap-y-1">
                    <Outstanding content="Dung tích 1.2L phù hợp sử dụng cho 2 - 4 người." />
                    <Outstanding content="Lòng nồi hợp kim nhôm phủ chống dính cao cấp, an toàn cho sức khỏe." />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="2lg:pt-[60px] ssm:pt-[30px] flex-1 flex flex-row lg:px-0 ssm:px-4">
              {
                exploreTabs.map((it, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentTab(it.key)}
                      className={clsx('flex-1 flex items-center justify-center ',
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
                        clssName="2xl:text-normal2 lg:text-normal1 ssm:text-wap-regular2 font-bold"
                      />
                    </button>
                  )
                })
              }
            </div>
            <div className="2lg:pt-[34px] ssm:pt-7">
              <>
                {currentTab === 'product-info' && (
                  <div className="lg:px-0 ssm:px-4">
                    <ProductInfo content={productData?.detail} />
                  </div>
                )}
              </>
              <>
                {currentTab === 'specifications' && (
                  <div className="lg:px-0 ssm:px-4">
                    <Specifications />
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="3xl:px-[155px] 2xl:px-[140px] ssm:px-4">
        <div className="pt-[34px] flex-1 flex flex-row">
          {
            exploreTabsProducts.map((it, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentTabProducts(it.key)}
                  className={clsx('flex-1 flex items-center justify-start ',
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
                    clssName="2xl:text-normal2 lg:text-normal1 ssm:text-wap-regular2 font-bold"
                  />
                </button>
              )
            })
          }
        </div>
        <div className="2xl:pt-[34px] lg:pt-6 ssm:pt-3">
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

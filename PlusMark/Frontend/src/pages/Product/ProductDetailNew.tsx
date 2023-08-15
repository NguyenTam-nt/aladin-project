import {
  ArrowDownIcon,
  CartIcon,
  CircleFilledIcon,
  GiftOutlineIcon,
  NextArrowIcon,
  PrevArrowIcon,
} from "@assets/icons";
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
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <div className="py-6">
      {/* <div className="container px-4 lg:px-8">
        <BreakCrumb data={breakcrumData} lastData={lastBreakCrumb} normalClass="text-normal1" activeClass="font-bold"  />
      </div> */}
      <div className="container p-4 lg:p-8  bg-white">
        {!isLoading ? (
          <div className="flex flex-col lg:flex-row gap-5 lg:border-b-[1px] pb-8">
            <div className="w-full lg:w-[40%]">
              <div className="w-full flex flex-col  gap-8">
                <div className="">
                  <div
                    className="h-[500px] relative  mb-2"
                    onClick={handleShowGallery}
                  >
                    {productData &&
                    productData.video &&
                    imageView == productData?.video ? (
                      <video
                        className=" w-full h-full object-contain rounded-md "
                        autoPlay
                        muted
                        controls
                        src={imageView}
                        poster={imageView}
                      />
                    ) : (
                      <img
                        className="w-full h-full object-contain rounded-md"
                        src={imageView}
                        alt="product-img"
                      />
                    )}
                    {sizeSelected && sizeSelected.sale ? (
                      <div className="absolute top-0 left-0">
                        <div className="py-1 px-1 lg:px-2 flex items-center bg-icon text-normal2 font-bold text-main rounded-tl-md rounded-br-md">
                          {sizeSelected.sale}%
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/*  */}
                  </div>
                  <div className="relative overflow-hidden rounded-md">
                    <button
                      className="absolute  z-10 bg-transparent top-0 left-0 flex items-center justify-center w-8 h-full"
                      onClick={prevSlide}
                    >
                      <PrevArrowIcon className="fill-white w-2 " />
                    </button>
                    <button
                      className="absolute z-10 bg-transparent top-0 right-0 flex items-center justify-center  w-8 h-full"
                      onClick={nextSlide}
                    >
                      <NextArrowIcon className="fill-white w-2  " />
                    </button>
                    <div className="z-2 absolute w-8 h-full top-0 left-0 bg-gradient-to-r from-zinc-400 rounded-md"></div>
                    <div className="z-2 absolute w-8 h-full top-0 right-0 bg-gradient-to-l from-zinc-400 rounded-md"></div>
                    <Swiper
                      modules={[Autoplay, Navigation]}
                      ref={slideRef}
                      // loop={true}
                      slidesPerView={4}
                      spaceBetween={10}
                      className=" w-full gap-2 -z-1"
                      autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                      }}
                    >
                      {productData?.video && (
                        <SwiperSlide>
                          <video
                            className=" aspect-square object-contain rounded-md cursor-pointer"
                            autoPlay
                            muted
                            onClick={() =>
                              setimageView(productData?.video || "")
                            }
                            src={productData?.video || ""}
                          />
                        </SwiperSlide>
                      )}

                      {productData && productData?.images && productData?.images.length > 0 && productData?.images.map((it, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            onClick={() => setimageView(it)}
                            className=" aspect-square object-contain rounded-md cursor-pointer"
                            src={it}
                            alt="product-image"
                          ></img>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="lg:px-5">
                <h1 className="text-normal2 font-bold text-black py-2">
                  {productData?.name}
                </h1>
                <h2 className="text-wap-regular2 text-background-100">
                  {t("detail_product.product_info.code_product")}
                  {productData?.sku}
                </h2>
                <div className="flex items-baseline gap-8 py-3">
                  <p className="text-normal2 lg:text-title font-medium text-main">
                    {sizeSelected ? formatMoney(sizeSelected?.priceSale || 0) : formatMoney(productData?.price || 0)}
                  </p>
                  {sizeSelected && sizeSelected.sale ? (
                    <p className="text-normal1 lg:text-normal2 line-through text-background-100">
                      {formatMoney(productData?.price || 0)}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                {/* <div className="flex gap-5 py-2">
                  {colorSelected && productData?.colors.map((it, idx) => (
                    <ColorPicker
                      selected={colorSelected}
                      data={it}
                      key={idx}
                      handleClick={setcolorSelected}
                    />
                  ))}
                </div> */}
                <div className="mt-4">
                  <div className="flex  w-fit flex-wrap">
                    {colorSelected && colorSelected?.sizes && colorSelected?.sizes.map((s, i) => {
                      return (
                        <SizePicker
                          selected={sizeSelected}
                          data={s}
                          handleClick={setsizeSelected}
                          key={i}
                        />
                      );
                    })}
                  </div>
                  {productData?.imageCheck && (
                    <div
                      className="mt-2 text-wap-regular2 text-main hover:cursor-pointer"
                      onClick={showModalSize}
                    >
                      {t("detail_product.product_info.instruction_size")}
                      {">"}
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <AmountChange
                    quantity={quantity}
                    descActive={quantityDescActive}
                    ascActive={quantityAscActive}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                  />
                  <div className="mt-2 text-wap-regular2 text-main">
                    {t("detail_product.product_info.amount", {
                      amount: sizeSelected?.total || 0,
                    })}
                  </div>
                </div>
                <div className="mt-4 flex gap-4 h-[50px]  border-background-100">
                  <button
                    className="btn   text-main bg-icon border-[1px] border-main  rounded-md flex items-center gap-1"
                    onClick={handleAddToCart}
                  >
                    <CartIcon className="fill-main" />{" "}
                    {t("detail_product.product_info.add_product")}
                  </button>
                  <button
                    className="btn  text-white bg-main text-normal px-2 lg:px-8  rounded-md flex items-center gap-1"
                    onClick={handleBuyNow}
                  >
                    {t("detail_product.product_info.buy")}
                  </button>
                </div>
                <div className="mt-4 py-4 border-b-[1px] border-t-[1px]">
                  <p
                    className={clsx(
                      "flex gap-2 text-normal1  font-bold hover:cursor-pointer select-none",
                      { "text-main": openDetailInfo }
                    )}
                    onClick={() => setopenDetailInfo(!openDetailInfo)}
                  >
                    {t("detail_product.product_info.info")}{" "}
                    <ArrowDownIcon
                      className={clsx("fill-black", {
                        "rotate-180 fill-main": openDetailInfo,
                      })}
                    />
                  </p>
                  {
                    <div
                      className={clsx("text-normal mt-2 overflow-hidden", {
                        "h-0": !openDetailInfo,
                        "h-auto": openDetailInfo,
                      })}
                    >
                      <div
                        className="h-fit max-h-fit w-full bg-transparent resize-none overflow-hidden"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{__html: productData?.detail || ""}}
                      >
                        {/* {productData?.detail || ""} */}
                      </div>
                    </div>
                  }
                </div>
                {productData?.policy && productData?.policy.length > 0 ? (
                  <div className="mt-4 pb-4 border-b-[1px]">
                    <p
                      className={clsx(
                        "flex gap-2 text-normal1  font-bold hover:cursor-pointer select-none",
                        { "text-main": openPolicyInfo }
                      )}
                      onClick={() => setopenPolicyInfo(!openPolicyInfo)}
                    >
                      {t("detail_product.product_info.policy")}{" "}
                      <ArrowDownIcon
                        className={clsx("fill-black", {
                          "rotate-180 fill-main": openPolicyInfo,
                        })}
                      />
                    </p>
                    {
                      <div
                        className={clsx("text-normal mt-2 overflow-hidden", {
                          "h-0": !openPolicyInfo,
                          "h-auto": openPolicyInfo,
                        })}
                      >
                        <div
                          className="h-fit max-h-fit w-full bg-transparent resize-none overflow-hidden"
                          style={{ whiteSpace: "pre-line" }}
                          dangerouslySetInnerHTML={{__html: productData?.policy || ""}}
                        >
                          {/* {productData?.policy || ""} */}
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 min-h-full w-full flex justify-center items-center">
            <LoadingPage />
          </div>
        )}
        {productRelated && productRelated.length > 0 && (
          <div className="pt-4 border-b-[1px]">
            <div className="pt-4 text-normal2 lg:text-title font-semibold flex justify-center">
              {t("detail_product.product_relative")}
            </div>
            <div className="">
              <ProductCarousel product={productRelated} />
            </div>
          </div>
        )}
        {productSeen && productSeen.length > 0 && (
          <div className="pt-4">
            <div className="pt-4 text-normal2 lg:text-title font-semibold flex justify-center">
              {t("detail_product.product_viewed")}
            </div>
            <div className="">
              <ProductCarousel product={productSeen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailNew;

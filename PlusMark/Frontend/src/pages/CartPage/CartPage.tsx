import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import CartProductNew from "@components/Cart/CartProductNew";
import BtnLoading from "@components/btn-loading/BtnLoading";
import { useCart } from "@contexts/CartContext";
import { ToastContex } from "@contexts/ToastContex";
import useI18n from "@hooks/useI18n";
import CartServices, { CartItemRequest, CheckVoucherRequest } from "@services/CartServices";
import { ProductItem } from "@services/ProductServices";
import { formatMoney } from "@utility/helper";
import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {

  const {t} = useI18n()
  const navigate = useNavigate()
  const { listToast, onAddToast } = useContext(ToastContex);
  const {cartQuantity, totalPriceChoose, cartItems} = useCart()
  const [voucher, setVoucher] = useState<string>("")
  const [moneyVoucher, setmoneyVoucher] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const breakcrumData: BreadcrumbType[] = [
    {
        name: "Giỏ hàng",
        clickable: true,
        active: true,
        link: "/cart"
    },
    {
        name: "Thông tin giao hàng",
        clickable: false,
        active: false,
        link: "/cart/payment"
    }
  ]

  useEffect(() => {
    callApiCheckVoucher()
  }, [cartItems])

  const handleClickToPayment = () => {
    let c = cartItems.filter(c => c.choose)
    if(c && c.length > 0) {
      navigate("/cart/payment", {state: {voucher: voucher || "", moneyVoucher: moneyVoucher}})
    } else {
      onAddToast({ type: "warn", message: `Vui lòng chọn sản phẩm!` });
    }
  }

  const handleCheckVoucher = () => {
    if(!voucher) {
      onAddToast({ type: "warn", message: `Vui lòng nhập mã giảm giá!` });
    } else {
      callApiCheckVoucher(true)
    }
  }

  const callApiCheckVoucher = (noti?: boolean) => {
    let cartItemRequest: CartItemRequest[] = cartItems.filter(c => c.choose).map(c => {
      return {
        itemId: c.id,
        itemName: c.name,
        image: c.image,
        size: c.size.sizeName,
        color: c.color.colorName,
        price: c.price,
        total: c.quantity,
        sku: c.sku
      } 
    }) 
    let request: CheckVoucherRequest = {
      itemsCartList: cartItemRequest,
      voucher: voucher
    }

    // console.log(request);
    setIsLoading(true)
    try {
      CartServices.checkVoucherApi(request).then(res => {
        console.log(res);
        let m = res.moneyVoucher || 0
        setmoneyVoucher(m)
        setIsLoading(false)
        if(m == 0 && noti) {
          onAddToast({ type: "warn", message: `Voucher không hợp lệ!` });
        }
      }) .catch(e => {
        setIsLoading(false)
        if(noti) {
          onAddToast({ type: "error", message: `Có lỗi xảy ra!` });
        }
      })
    } catch (error) {
      setIsLoading(false)
      if(noti) {
        onAddToast({ type: "error", message: `Có lỗi xảy ra!` });
      }
    } 
  }

  return (
    <div className="container  px-4 lg:px-8" >
      <div className="mt-6">
        <BreakCrumb data={[...breakcrumData]} normalClass="" activeClass=" text-main" />
      </div>
      <div className=" rounded-lg bg-white pb-12 pt-6 flex flex-col xl:flex-row xl:gap-10">
        <div className="flex-1">
          {cartQuantity > 0 ? cartItems.map((it, idx) => (
            <div key={it.id+idx}>
              <div className="hidden lg:block">
                <CartProductNew itemCart={it} change={it.size.total > 0}  size="normal"  />
              </div>
              <div className="block lg:hidden">
                <CartProductNew itemCart={it} change={it.size.total > 0} size="cart"  />
              </div>
            </div>
          )) : <div className="w-full flex justify-center mt-8">
            <img src="/images-raw/empty-cart.png" alt="empty-cart"/>
          </div>
        }
        </div>
        <div className="py-4 px-3 w-full xl:w-1/4 bg-gray-200-60 rounded-md h-fit mt-8 lg:mt-0">
          <div className="bg-white rounded-md p-3 mb-4">
            <p className="text-wap-regular2 text-text mb-2">{t("cart.payment_info.title")}</p>
            <div className="h-8 flex gap-1">
              <div className="flex-1 border-gray-200 border">
                <input type="text" value={voucher} onChange={e => setVoucher(e.target.value)} name="promotion" className="w-full h-full text-text placeholder:text-gray-200 text-wap-regular2 px-2" placeholder={t("cart.payment_info.placehoder_promotion") || ""} />
              </div>
              <BtnLoading
                onClick={handleCheckVoucher}
                isLoading={isLoading}
                className={clsx("btn text-wap-regular2 rounded-none px-2 bg-main w-fit h-full text-center text-white", {
                  "opacity-70 cursor-default": isLoading
                })}
              > {t("cart.payment_info.promotion_btn")}</BtnLoading>
            </div>
          </div>
          <div className="flex justify-between pb-4 ">
            <h1 className="text-wap-regular2  text-text">
              {t("cart.payment_info.total_price_title")}
            </h1>
            <div className="text-wap-regular2 text-black">
              {formatMoney(totalPriceChoose)}
            </div>
          </div>
          <div className="flex justify-between pb-4 ">
            <h1 className="text-wap-regular2  text-text">
              {t("cart.payment_info.total_discount")}
            </h1>
            <div className="text-wap-regular2 text-main">
              {formatMoney(moneyVoucher)}
            </div>
          </div>
          <div className="flex justify-between py-4 mb-6 border-t-[1px] border-gray-100">
            <h1 className="text-wap-regular2  text-text">
              {t("cart.payment_info.total_price")}
            </h1>
            <div className="text-normal text-black font-semibold">
              {formatMoney(totalPriceChoose - moneyVoucher)}
            </div>
          </div>
          <button className={clsx("btn text-normal font-medium bg-main w-full h-9 text-center text-white my-3",{
            "opacity-60 cursor-default": cartQuantity <= 0
          })} onClick={handleClickToPayment}>
            {t("cart.payment_info.btn_process_payment")}
          </button>
          <Link to={"/"} className="btn text-normal font-medium border-background-100 border-2 w-full h-9 text-center text-black ">
            {t("cart.payment_info.btn_buy_more")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

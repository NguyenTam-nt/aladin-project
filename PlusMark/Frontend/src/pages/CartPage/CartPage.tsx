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
import { PaymentCartIcon, RemoveCartIcon, TickIcon } from "@assets/icons";
import CloseIcon from "@assets/iconElements/CloseIcon";

const CartPage = () => {

  const { t } = useI18n()
  const navigate = useNavigate()
  const { listToast, onAddToast } = useContext(ToastContex);
  const { cartQuantity, totalPriceChoose, cartItems, setCartItems } = useCart()
  const [voucher, setVoucher] = useState<string>("")
  const [moneyVoucher, setmoneyVoucher] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    callApiCheckVoucher()
  }, [cartItems])

  useEffect(() => {
    const selectedItems = cartItems.filter(item => item.choose);
    if (selectedItems.length === cartItems.length) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [cartItems]);

  const handleClickToPayment = () => {
    let c = cartItems.filter(c => c.choose)
    if (c && c.length > 0) {
      navigate("/cart/payment", { state: { voucher: voucher || "", moneyVoucher: moneyVoucher } })
    } else {
      onAddToast({ type: "warn", message: `Vui lòng chọn sản phẩm!` });
    }
  }

  const handleSetChecked = () => {
    setChecked(!checked);
    const updatedCartItems = cartItems.map((cartItem) => {
      return {
        ...cartItem,
        choose: checked,
      };
    });
    setCartItems(updatedCartItems);
  };

  const handleCheckVoucher = () => {
    if (!voucher) {
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
        if (m == 0 && noti) {
          onAddToast({ type: "warn", message: `Voucher không hợp lệ!` });
        }
      }).catch(e => {
        setIsLoading(false)
        if (noti) {
          onAddToast({ type: "error", message: `Có lỗi xảy ra!` });
        }
      })
    } catch (error) {
      setIsLoading(false)
      if (noti) {
        onAddToast({ type: "error", message: `Có lỗi xảy ra!` });
      }
    }
  }

  return (
    <div className="container  px-4 lg:px-8" >
      <div className="mt-6 font-['Nunito_Sans']">
        Giỏ mua hàng
      </div>

      <div className="rounded-lg pb-12 pt-6 flex flex-col xl:flex-row xl:gap-10">
        <div className="flex-1 rounded-[20px] mb-2 fit">
          {cartItems.length > 0 && <div className="flex justify-between items-center rounded-lg mb-5 bg-white">
            <label className="flex p-3 lg:w-1/3 item-center justify-start">
              <input
                className="hidden"
                type="checkbox"
                onClick={handleSetChecked} />
              <div
                className={`w-7 sm:w-7 aspect-square p-1 border-2 flex items-center justify-center rounded-sm ${!checked ? "bg-main" : ""}`} >
                <TickIcon />
              </div>
              <div className="p-1 ml-5">
                {t("cart.payment_info.label_total_items", { total: cartItems.length })}
              </div>
            </label>
            <div className="hidden lg:block">{t("cart.payment_info.title_price_per_unit")}</div>
            <div className="hidden lg:block">{t("cart.payment_info.title_total_quantity")}</div>
            <div className="hidden lg:block">{t("cart.payment_info.title_total_price_per_product")}</div>
            <div className="pr-3">
              <RemoveCartIcon />
            </div>
          </div>

          }
          <div className="flex-1 rounded-lg mb-2 fit bg-white">
            {cartQuantity > 0 ? cartItems.map((it, idx) => (
              <div key={it.id + idx} className="rounded-[20px] p-3">
                <div className="hidden lg:block">
                  <CartProductNew itemCart={it} change={it.size.total > 0} size="normal" />
                </div>
                <div className="block lg:hidden">
                  <CartProductNew itemCart={it} change={it.size.total > 0} size="cart" />
                </div>
              </div>
            )) : <div className="w-full flex justify-center mt-8">
              <img src="/images-raw/empty-cart.png" alt="empty-cart" />
            </div>
            }
          </div>
        </div>
        <div className="py-4 px-3 w-full xl:w-1/4 bg-white rounded-md h-fit mt-8 lg:mt-0">
          <div className="bg-[#DAF1E7] rounded-md p-3 mb-4">
            <p className="text-wap-regular2 text-text mb-2">{t("cart.payment_info.title")}</p>
            <div className="h-8 flex gap-1">
              <div className="flex-1">
                <input type="text" value={voucher} onChange={e => setVoucher(e.target.value)} name="promotion" className="w-full h-full text-text rounded-lg border bg-[#DAF1E7] placeholder:text-[#626262] text-wap-regular2 px-2" placeholder={t("cart.payment_info.placehoder_promotion") || ""} />
              </div>
              <BtnLoading
                onClick={handleCheckVoucher}
                isLoading={isLoading}
                className={clsx("btn text-wap-regular2 rounded-lg bg-header px-2 w-fit h-full text-center text-white", {
                  "opacity-70 cursor-default": isLoading
                })}
              > {t("cart.payment_info.promotion_btn")}</BtnLoading>
            </div>
          </div>
          <div className="flex flex-wrap">
            <p className="px-4 w-fit py-1 m-2 text_base flex gap-1 border border-aqua-aq02 rounded-full bg-[#DAF1E7]">
              <span className="cursor-pointer">
                Giảm 30.000 cho đơn từ 400.000
              </span>
            </p>
            <p className="px-4 w-fit py-1 m-2 text_base flex gap-1 border border-aqua-aq02 rounded-full">
              <span className="cursor-pointer">
                Freeship
              </span>
            </p>
            <p className="px-4 w-fit py-1 m-2 text_base flex gap-1 border border-aqua-aq02 rounded-full">
              <span className="cursor-pointer">
                Giảm 30.000
              </span>
            </p>
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
            <h1 className="text-wap-regular2  text-text font-semibold">
              {t("cart.payment_info.total_price")}
            </h1>
            <div className="text-normal text-black font-semibold">
              {formatMoney(totalPriceChoose - moneyVoucher)}
            </div>
          </div>
          <button className={clsx("btn text-normal font-medium rounded-lg bg-header w-full h-9 text-center text-white my-3", {
            "opacity-60 cursor-default": cartQuantity <= 0
          })} onClick={handleClickToPayment}>
            <PaymentCartIcon />
            {t("cart.payment_info.btn_process_payment")}
          </button>
          <Link to={"/"} className="btn text-main font-semibold rounded-lg border-[#00c3ab] border-2 w-full h-9 text-center text-black ">
            {t("cart.payment_info.btn_buy_more")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

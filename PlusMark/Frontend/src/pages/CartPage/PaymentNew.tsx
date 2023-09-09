import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import CartProductNew from "@components/Cart/CartProductNew";
import PaymentForm from "@components/Form/PaymentForm";
import PaymentModal from "@components/Modal/PaymentModal";
import ShipmentMethod from "@components/shipment/ShipmentMethod";
import { useCart } from "@contexts/CartContext";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import CartServices, { CartItemRequest, PaymentOrderRequest } from "@services/CartServices";
import { PAYMENT_METHOD } from "@utility/constants";
import { formatMoney } from "@utility/helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContex } from "@contexts/ToastContex";
import BtnLoading from "@components/btn-loading/BtnLoading";
import clsx from "clsx";
import { Logo } from "@assets/icons";
import CardPaymentForm from "@components/Form/CardPaymentForm";

const PaymentNew = () => {

  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const { listToast, onAddToast } = useContext(ToastContex);
  const { cartQuantity, totalPriceChoose, cartItems, onChangeItem } = useCart()
  const { setContentModal, setShowModal } = useContext(ModalContext);
  const [checked, setChecked] = useState<boolean>(true);
  const [checkedPaymentCard, setCheckedPaymentCard] = useState<boolean>(false);
  const [voucher, setVoucher] = useState<string>("")
  const [moneyVoucher, setmoneyVoucher] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const breakcrumData: BreadcrumbType[] = [
    {
      name: "Giỏ hàng",
      clickable: true,
      active: false,
      link: "/cart"
    },
    {
      name: "Thông tin giao hàng",
      clickable: true,
      active: true,
      link: "/cart/payment"
    }
  ]

  useEffect(() => {
    let v = window.sessionStorage.getItem("voucher") || "";
    let mv = Number(window.sessionStorage.getItem("money_voucher") || 0);
    setVoucher(location.state?.voucher || v || "")
    setmoneyVoucher(location.state?.moneyVoucher || mv || 0)

  }, [])

  useEffect(() => {
    if (voucher) {
      window.sessionStorage.setItem("voucher", voucher);
    }
  }, [voucher]);

  useEffect(() => {
    if (moneyVoucher != 0) {
      window.sessionStorage.setItem("money_voucher", moneyVoucher + "");
    }
  }, [moneyVoucher]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phoneNumber: "",
      email: "",
      address: "",
      province: "",
      district: "",
      commune: "",
      month: "",
      year: "",
      card_number: "",
      zip_code: "",
      country_code: ""
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Vui lòng điền họ và tên."),
      phoneNumber: Yup.string()
        .required("Vui lòng điền số điện thoại.")
        .matches(/^[0-9]{10}$/, "Vui lòng nhập đúng định dạng số điện thoại."),
      email: Yup.string()
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Vui lòng nhập đúng email."
        ),
      address: Yup.string().required("Vui lòng điền địa chỉ."),
      province: Yup.string().required("Vui lòng chọn tỉnh thành."),
      district: Yup.string().required("Vui lòng chọn quận huyện."),
      commune: Yup.string().required("Vui lòng chọn phường xã."),
      month: Yup.string().required("Vui lòng chọn tháng."),
      year: Yup.string().required("Vui lòng chọn năm."),
      zip_code: Yup.string().required("Vui lòng điền zip code."),
      country_code: Yup.string().required("Vui lòng chọn country code."),
    }),
    onSubmit: (values) => {
    },
  });

  const handlePaymentCard = () => {
    let error = formik.errors.fullname || formik.errors.phoneNumber ||
      formik.errors.email || formik.errors.address ||
      formik.errors.province || formik.errors.district || formik.errors.commune

    if (error) {
      onAddToast({ type: "warn", message: error });
      return
    }

    setCheckedPaymentCard(true)
    setChecked(!checked)
  }

  const handleOrder = () => {
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

    if (!cartItemRequest || cartItemRequest.length == 0) {
      onAddToast({ type: "warn", message: "Vui lòng chọn sản phẩm trước khi đặt hàng" });
      return
    }

    let error = formik.errors.fullname || formik.errors.phoneNumber ||
      formik.errors.email || formik.errors.address ||
      formik.errors.province || formik.errors.district || formik.errors.commune
    if (error) {
      onAddToast({ type: "warn", message: error });
      return
    }


    let request: PaymentOrderRequest = {
      itemsCartList: cartItemRequest,
      voucher: voucher,
      paymentMethod: checked ? PAYMENT_METHOD.PERSON : PAYMENT_METHOD.ATM,
      customer: {
        fullname: formik.values.fullname,
        phoneNumber: formik.values.phoneNumber,
        email: formik.values.email,
        address: formik.values.address,
        province: formik.values.province,
        district: formik.values.district,
        commune: formik.values.commune
      }
    }

    setIsLoading(true)
    try {
      // CartServices.paymentOrderApi(request).then(res => {
      //   console.log(res);
      //   formik.resetForm();
      //   handleRemoveItems()
      //   setContentModal(<PaymentModal />);
      //   setShowModal(true);
      //   setIsLoading(false)
      // })
      // !checkedPaymentCard ? alert("person") : alert("card")

      setContentModal(<PaymentModal />);
      setShowModal(true);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }

  }

  const handleRemoveItems = () => {
    cartItems.filter(c => c.choose).forEach(c => {
      c.quantity = 0
      onChangeItem(c.id, c)
    })
  }

  return (
    <div className="container px-4 lg:px-8" >
      <div className="mt-6">
        {/* <BreakCrumb data={breakcrumData} normalClass="" activeClass=" text-main" /> */}
        <div className="mt-6 font-['Nunito_Sans']">
        {t("cart.cart_title")}
        </div>
      </div>
      <div className="rounded-lg flex-1 pb-12 pt-6 flex flex-col lg:flex-row lg:gap-4 xl:gap-10">
        <div className="flex-1 mb-2">
          <div className="bg-white rounded-lg px-5">
            {cartItems.filter(cartItem => cartItem.choose).map((it, idx) => (
              <CartProductNew itemCart={it} key={idx} change={false} border={idx != 1} payment={true} size="sm" />
            ))}
            <div className="flex justify-between pb-2 mt-4 ">
              <h1 className="text-normal text-text">
                {t("payment.total_price_title")}
              </h1>
              <div className="text-normal1 font-bold text-text">
                {formatMoney(totalPriceChoose)}
              </div>
            </div>
            <div className="flex justify-between pb-2 ">
              <h1 className="text-normal text-text">
                {t("payment.total_discount")}
              </h1>
              <div className="text-normal1 font-bold text-main">
                {formatMoney(moneyVoucher)}
              </div>
            </div>
            <div className="flex justify-between py-2 border-t-2 ">
              <h1 className="text-normal  text-text font-bold">
                {t("payment.total_price")}
              </h1>
              <div className="text-normal1 text-text font-bold pb-6">
                {formatMoney(totalPriceChoose - moneyVoucher > 0 ? totalPriceChoose - moneyVoucher : 0)}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 w-full lg:w-[70%] rounded-lg h-fit bg-white">
          <div className="">
            <h3 className="text-normal2 font-bold">{t("payment.info_delivery.index")}</h3>
          </div>
          <div className="py-4 xl:py-8">
            <PaymentForm formik={formik} />
          </div>
          <div className="">
            <h3 className="text-normal2 font-bold">{t("payment.info_delivery_method.title")}</h3>
            <div className="my-2 xl:mt-5 flex flex-col gap-3 w-full">
              <ShipmentMethod method="person" checked={checked} setChecked={setChecked} />
            </div>
          </div>
          <div className="mt-4 lg:mt-8">
            <BtnLoading className={clsx("btn text-normal font-medium rounded-lg bg-header w-full h-9 text-center text-white my-3", {
              "opacity-60 cursor-default": cartQuantity <= 0
            })} onClick={handleOrder}
              isLoading={isLoading}
            >
              {t("payment.payment")}
            </BtnLoading>
            <Link to={"/"} className="btn text-main font-semibold rounded-lg border-[#00c3ab] border-2 w-full h-9 text-center text-black ">
              {t("cart.payment_info.btn_buy_more")}
            </Link>
          </div>
        </div>
        {/*Payment with Visa / Master Card*/}
        {/* <div className="w-full lg:w-[70%] rounded-lg h-fit bg-white">
          <div className="w-full shadow-[4px_2px_8px_0px_rgba(0,_0,_0,_0.2)] bg-[#00c3ab] flex flex-col justify-center items-end px-10 py-3 rounded-tl-[20px] rounded-tr-[20px]">
            <Logo className="xl:w-[74px] w-[55px]" fill="white" />
          </div>
          <div className="p-8">

            {checkedPaymentCard ? (<CardPaymentForm formik={formik} />) : (<>
              <div>
                <h3 className="text-normal2 font-bold">{t("payment.info_delivery.index")}</h3>
              </div>
              <div className="py-4 xl:py-8">
                <PaymentForm formik={formik} />
              </div>
              <div className="">
                <h3 className="text-normal2 font-bold">{t("payment.info_delivery_method.title")}</h3>
                <div className="my-4 xl:mt-7 flex flex-col gap-3 w-full">
                  <ShipmentMethod method="person" checked={checked} setChecked={setChecked} />
                  <ShipmentMethod checked={!checked} setChecked={(c: boolean) => setChecked(!c)} />
                </div>
              </div>
            </>)}
            <div className="mt-6 lg:mt-12">
              <BtnLoading className={clsx("btn text-normal font-medium rounded-lg bg-header w-full h-9 text-center text-white my-3", {
                "opacity-60 cursor-default": cartQuantity <= 0
              })} onClick={checked ? handleOrder : handlePaymentCard}
                isLoading={isLoading}
              >
                {checked ? t("payment.payment") : t("payment.continue")}
              </BtnLoading>
              <Link to={"/"} className="btn text-main font-semibold rounded-lg border-[#00c3ab] border-2 w-full h-9 text-center text-black ">
                {t("cart.payment_info.btn_buy_more")}
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentNew;

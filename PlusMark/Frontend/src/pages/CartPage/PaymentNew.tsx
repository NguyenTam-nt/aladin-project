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
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContex } from "@contexts/ToastContex";
import BtnLoading from "@components/btn-loading/BtnLoading";
import clsx from "clsx";

const PaymentNew = () => {

  const {t} = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const { listToast, onAddToast } = useContext(ToastContex);
  const {cartQuantity, totalPriceChoose, cartItems, onChangeItem} = useCart()
  const { setContentModal, setShowModal } = useContext(ModalContext);
  const [checked, setChecked] = useState<boolean>(true);
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
    let mv = Number(window.sessionStorage.getItem("money_voucher") || 0) ;
    setVoucher(location.state?.voucher || v || "")
    setmoneyVoucher(location.state?.moneyVoucher || mv || 0)
    
  }, [])

  useEffect(() => {
    if(voucher) {
      window.sessionStorage.setItem("voucher", voucher);
    }
  }, [voucher]);

  useEffect(() => {
    if(moneyVoucher != 0) {
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
      commune: ""
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
    }),
    onSubmit: (values) => {
    },
  });
  

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

    if(!cartItemRequest || cartItemRequest.length == 0) {
      onAddToast({ type: "warn", message: "Vui lòng chọn sản phẩm trước khi đặt hàng" });
      return 
    }
    
    let error = formik.errors.fullname || formik.errors.phoneNumber || 
    formik.errors.email || formik.errors.address || 
    formik.errors.province || formik.errors.district  || formik.errors.commune
    
    if( error ) {
      // console.log("error:", error);
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

    // console.log(request);

    setIsLoading(true)
    try {
      CartServices.paymentOrderApi(request).then(res => {
        console.log(res);
        formik.resetForm();
        handleRemoveItems()
        setContentModal(<PaymentModal/>);
        setShowModal(true);
        setIsLoading(false)
      })
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
        <BreakCrumb data={breakcrumData} normalClass="" activeClass=" text-main" />
      </div>
      <div className=" rounded-lg flex-1 bg-white pb-12 pt-6 flex flex-col lg:flex-row lg:gap-4 xl:gap-10">
        <div className="flex-1">
          {cartItems.filter(cartItem => cartItem.choose).map((it, idx) => (
            <CartProductNew itemCart={it} key={idx} change={false} border={idx != 1} size="sm"/>
          ))}
           <div className="flex justify-between pb-2 mt-4 ">
            <h1 className="text-normal  text-text">
              {t("payment.total_price_title")}
            </h1>
            <div className="text-normal1 font-bold text-main">
              {formatMoney(totalPriceChoose)}
            </div>
          </div>
          <div className="flex justify-between pb-2 ">
            <h1 className="text-normal  text-text">
              {t("payment.total_discount")}
            </h1>
            <div className="text-normal1 font-bold text-main">
              {formatMoney(moneyVoucher)}
            </div>
          </div>
          <div className="flex justify-between py-2 mb-6 ">
            <h1 className="text-normal  text-text font-bold">
              {t("payment.total_price")}
            </h1>
            <div className="text-normal1 text-main font-bold">
              {formatMoney(totalPriceChoose - moneyVoucher > 0 ? totalPriceChoose - moneyVoucher : 0)}
            </div>
          </div>
        </div>
        <div className="py-4 lg:px-3 w-full lg:w-[55%]  rounded-md h-fit">
          <div className="">
            <h3 className="text-normal2 font-bold">{t("payment.info_delivery.index")}</h3>
          </div>
          <div className="py-4 xl:py-8">
            <PaymentForm formik={formik}/>
          </div>
          <div className="">
            <h3 className="text-normal2 font-bold">{t("payment.info_delivery_method.title")}</h3>
            <div className="my-4 xl:mt-7 flex flex-col gap-3 w-full">
              <ShipmentMethod method="person" checked={checked} setChecked={setChecked} />
              <ShipmentMethod checked={!checked} setChecked={(c: boolean) => setChecked(!c)}/>
            </div>
          </div>
          <div className="mt-6 lg:mt-12">
            <BtnLoading
              onClick={handleOrder}
              isLoading={isLoading}
              className={clsx("ml-auto btn rounded-sm px-8 py-3 h-fit bg-main text-white text-wap-regular2 lg:text-normal1 uppercase font-semibold", {
                "opacity-70 cursor-default": isLoading
              })}
            > {t("payment.payment")}</BtnLoading>
            {/* <button className="ml-auto btn rounded-sm px-8 py-3 h-fit bg-main text-white text-wap-regular2 lg:text-normal1 uppercase font-semibold" onClick={handleOrder}>
              {t("payment.payment")}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentNew;

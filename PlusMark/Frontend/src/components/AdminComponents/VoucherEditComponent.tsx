import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { CarlendarIcon } from "@assets/icons";
import GroupButton from "@components/Buttons/GroupButton";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { GroupInput } from "@components/input/GroupInput";
import { InputComponent } from "@components/input/InputComponent";
import { TextError } from "@components/input/TextError";
import TitleInput from "@components/input/TitleInput";
import TitleNote from "@components/input/TitleNote";
import { ToastContex } from "@contexts/ToastContex";
import useFocusOut from "@hooks/useFocusOut";
import { Checkbox } from "@pages/AdminPage/ComponentVoucher/CheckBox";
import { ColumnHeaders } from "@pages/AdminPage/ManageVoucher";
import ProductServices from "@services/ProductServices";
import { ProductItem } from "@services/Types/product";
import { IProductVoucher, IVoucher } from "@services/Types/voucher";
import VoucherServices from "@services/voucherService";
import { colors } from "@utility/colors";
import { DatePicker } from "antd";
import clsx from "clsx";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import { VoucherType } from "commons/contannt";
import { useHandleCheckbox } from "commons/useHandleCheckbox";
import dayjs from "dayjs";
import { useFormik } from "formik";
import debounce from "lodash/debounce";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

export type DISCOUNT_TYPE = 'PERCENT' | 'MONEY'
const DISCOUNT_BY: { actionKey: DISCOUNT_TYPE; value: string }[] = [
  { actionKey: "PERCENT", value: "Phần trăm" },
  { actionKey: "MONEY", value: "Theo số tiền" },
]

interface IPreview {
  actionKey: DISCOUNT_TYPE,
  value: string
}
export const DiscountBy = (props: { setTypeVoucher: (value: any) => void, typeVoucher: DISCOUNT_TYPE }) => {
  const { setTypeVoucher, typeVoucher } = props;
  const [preview, setPreview] = useState<IPreview>();

  const {
    clickShow,
    setClickShow,
    ref
  } = useFocusOut();

  useEffect(() => {
    const data = DISCOUNT_BY.filter(it => it.actionKey == typeVoucher);
    const newData = {
      actionKey: data[0].actionKey,
      value: data[0].value
    }
    setPreview(newData)
  }, [typeVoucher])

  return (
    <>
      <div ref={ref}>
        <div className="relative w-[172px] px-4">
          <div className="flex flex-row gap-x-1 justify-between items-center">
            <p className="flex-1 text-wap-regular2 font-normal">{preview?.value}</p>
            <button
              onClick={() => setClickShow((prev) => !prev)}
              className="-rotate-90 flex justify-center items-center">
              <div className="">
                <PrevIconElm width={15} height={12} color={colors.black} />
              </div>
            </button>
            {
              clickShow && (
                <div className="absolute z-10 w-[200px] top-5 left-0 ">
                  <div className="bg-neutra-neutral98 rounded">
                    {
                      DISCOUNT_BY.map((it, idx) => {
                        return (
                          it.actionKey !== preview?.actionKey && (
                            <>
                              <button
                                key={idx}
                                onClick={() => {
                                  setPreview(it)
                                  setClickShow((prev => !prev))
                                  setTypeVoucher(it.actionKey)
                                }}
                                className="w-full px-[9px] py-[6px] flex flex-row gap-x-2 justify-center items-center" >
                                {/* <img src={it.image} alt={it.country} className="" /> */}
                                <p className=" flex items-start text-normal text-neutra-neutral2 font-normal font-NunitoSans">{it.value}</p>
                              </button >
                            </>
                          )
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const RadioButton = (props: { changed: (event: any) => void, name: string, isSelected: boolean, label: string, value: string }) => {
  const { changed, name, isSelected, label, value } = props;
  return (
    <div>
      <label className="form-control flex flex-row justify-start items-center">
        <input
          type="radio"
          name={name}
          checked={isSelected}
          value={value}
          onChange={(event) => {
            changed && changed(event);
          }}
        />
        <p className="text-wap-regular2 font-normal">{label}</p>
      </label>
    </div>
  )

}

export const ItemTable = (props: { isProduct?: boolean, img?: string, title?: string, isPriece?: boolean, prieceOld?: any, prieceNew?: any }) => {
  const { isProduct = false, img, isPriece, prieceNew, prieceOld, title } = props;
  return (
    <div className={clsx('flex text-wap-regular2 font-normal text-aqua-aq02',
      {
        '!text-grey-222124': isProduct,
        '!font-bold': !isProduct,
        '!text-wap-regular1 !font-normal !text-grey-A1A0A3': isPriece
      }
    )}>
      {
        isProduct && (
          <div className="flex flex-row gap-x-[18px] items-center">
            <img src={img} alt="product" className="w-[46px] h-10 object-cover" />
            <p>{title}</p>
          </div>
        )
      }
      {!isProduct && title}
      {
        isPriece && (
          <div className="flex flex-row items-center gap-x-1">
            <p className="!text-wap-regular2 !text-aqua-aq02 font-bold">{prieceNew}</p>
            <span className="">/</span>
            <p className="line-through">{prieceOld}</p>
          </div>
        )
      }
    </div>
  )
}
interface Props { }
export type MAXIMNUM_DISCOUNT = "Limit" | "Unlimited"
const MAXIMNUM_DISCOUNT_BY: { actionKey: MAXIMNUM_DISCOUNT; value: number | null, label: string }[] = [
  { actionKey: "Limit", value: 0, label: "Giới hạn" },
  { actionKey: "Unlimited", value: null, label: "Không giới hạn" },
]
export type TYPE_APPLY = 'ALL' | 'PARTIAL';
function VoucherEditComponent(props: Props) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const [isDisable, setDisAble] = useState<boolean>(false);
  const [isCustomVoucher, setCustomVoucher] = useState<boolean>(false);
  const [keySearch, setKeySearch] = useState("");
  const [currenPage, setCurrentPage] = useState<number>(0);
  const [totaPage, setTotalPage] = useState<number>(0);
  const [listProduct, setListProducts] = useState<IProductVoucher[]>([]);
  const [listProductSearch, setListProductsSearch] = useState<ProductItem[]>([]);
  const [maximumDiscount, setMaximumDiscount] = useState<number | null>(null);
  const [typeVoucher, setTypeVoucher] = useState<DISCOUNT_TYPE>("PERCENT");
  const [typeApplyProduct, setTypeApplyProduct] = useState<string>("ALL");
  const [voucher, setVoucher] = useState<IVoucher>();
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>(new Date().getTime());
  const [endDate, setEndDate] = useState<any>(new Date().getTime() + 24 * 60 * 60 * 1000 * 5);
  const [listProductNotBeenAddVoucher, setLisProductNotBeenAddVoucher] = useState<IProductVoucher[]>([]);
  const [listProductInVoucher, setListProductInVoucher] = useState<IProductVoucher[]>([]);
  const { showSuccess, showError, showWarning } = useShowMessage();
  const [fomData, setFormData] = useState<VoucherType>({
    id: "",
    name: "",
    sku: "",
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 24 * 60 * 60 * 1000 * 5,
    moneyVoucher: 0,
    minPayment: 0,
    total: 0,
    voucherUsed: 0,
    status: "running",
    itemsIdList: [],
  });

  const [listIdAddvoucher, setListIdAddvoucher] = useState<any[]>([]);
  const [listProductId, setListProductId] = useState<any[]>([]);
  var regNumber = /^\d+$/;
  const formik = useFormik({
    initialValues: {
      voucherName: "",
      voucherCode: "",
      typeVoucher: "",
      value: "",
      maxValue: "",
      total: "",
      usedTotal: "",
      userLimit: 1,
      minBill: "",
    },
    validationSchema: Yup.object({
      voucherName: Yup.string()
        .required("voucher.form.required.voucher-name"),
      voucherCode: Yup.string()
        .required("voucher.form.required.voucher-code")
        .max(20, "voucher.form.max.message"),
      value: Yup.string()
        .required("voucher.form.required.value")
        .matches(regNumber, "voucher.form.regex.number"),
      minBill: Yup.string()
        .required("voucher.form.required.minbill")
        .matches(regNumber, "voucher.form.regex.number"),
      total: Yup.string()
        .required("voucher.form.required.minbill")
        .matches(regNumber, "voucher.form.regex.number"),
      userLimit: Yup.string()
        .required("voucher.form.required.minbill")
        .matches(regNumber, "voucher.form.regex.number"),

    }),
    onSubmit: async (value) => {
      let newListProductId = [...listProductId];
      if (listProductInVoucher.length > 0) {
        const modifyData = listProductInVoucher.map((item) => {
          return { productId: item.productId };
        });
        newListProductId = [...newListProductId, ...modifyData]
      }
      let statusVoucher = validateDatePicker();
      if (
        statusVoucher != "" &&
        (statusVoucher == "end" ||
          statusVoucher == "running" ||
          statusVoucher == "before")
      ) {
        if (voucher) {
          const newData = {
            ...value,
            id: voucher.id,
            typeVoucher: typeVoucher,
            maxValue: maximumDiscount,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            voucherState: "FINISHED",
            typeApply: typeApplyProduct,
            productVouchers: typeApplyProduct == "ALL" ? [] : newListProductId,
            usedTotal: 0
          }
          console.log({ newData });
          putVoucher(newData);
        } else {
          const newData = {
            ...value,
            typeVoucher: typeVoucher,
            maxValue: maximumDiscount,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            voucherState: "FINISHED",
            typeApply: typeApplyProduct,
            productVouchers: typeApplyProduct == "ALL" ? [] : newListProductId,
            usedTotal: 0
          }
          console.log({ newData });
          postVoucher(newData)
        }
      } else {
        onAddToast({
          type: "error",
          message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        });
        return;
      }
      console.log(statusVoucher);
    }
  });

  const postVoucher = async (data: any) => {
    try {
      const res = await VoucherServices.postVoucher(data);
      showSuccess("voucher.form.message.success.post")
    } catch (error) {
      console.log(error);
      showError("voucher.form.message.error.post")
    }
  }

  const putVoucher = async (data: any) => {
    try {
      const res = await VoucherServices.putVoucher(data.id, data);
      showSuccess("voucher.form.message.success.put")
    } catch (error) {
      console.log(error);
      showError("voucher.form.message.error.put")
    }
  }

  const getProductByKeySearch = async (key: string) => {
    try {
      if (key.trim() !== "") {
        console.log("key search", key);

        if (voucher) {
          const resProductByVoucher = await VoucherServices.getProductNotBeenAddVoucherAddkeyWork(key, voucher.voucherCode);
          setLisProductNotBeenAddVoucher(resProductByVoucher);
        } else {
          const resProductByVoucher = await VoucherServices.getProductNotBeenAddVoucher(key);
          setLisProductNotBeenAddVoucher(resProductByVoucher);
        }
      }
    } catch (error) {
      setLisProductNotBeenAddVoucher([]);
      onAddToast({
        type: "error",
        message: `Có lỗi không thể tìm sản phẩm`,
      });
    }
  };
  const debounceSearch = useCallback(debounce(getProductByKeySearch, 1000), []);
  const searchProduct = async (event: ChangeEvent<HTMLInputElement>) => {
    setKeySearch(event.target.value);
    if (event.target.value == "") {
      debounceSearch.cancel();
      return;
    }
    debounceSearch(event.target.value);
  };
  const handleAddListItem = (id: number) => {
    let newListId = [...listIdAddvoucher];
    const indexItem = listIdAddvoucher.findIndex((item) => {
      return item === id;
    });
    if (indexItem > -1) {
      newListId.splice(indexItem, 1);
    } else {
      newListId.push(id);
    }
    const modifyData = newListId.map((item: string) => {
      return { productId: item };
    });
    setTypeApplyProduct("PARTIAL");
    setListProductId(modifyData);
    setListIdAddvoucher(newListId);
  };

  const handleChangeStartDate = (date: any) => {
    const dateTime = date.valueOf();
    console.log(new Date(dateTime));

    setStartDate(dateTime)
  }

  const handleChangeEndDate = (date: any) => {
    const dateTime = date.valueOf();
    setEndDate(dateTime)
  }

  const onOk = (value: any) => {
    console.log("onOkEvent: ");
  };

  const validateDatePicker = useCallback(() => {
    const nowDate = new Date().getTime();
    let statusVoucher = "";
    if (startDate <= nowDate) {
      console.log("true");

      if (startDate === endDate) {
        statusVoucher = "end";
      } else if (startDate < endDate) {
        statusVoucher = "running";
      } else {
        statusVoucher = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
      }
    } else {

      console.log("false");

      if (startDate < endDate) {
        statusVoucher = "running";
      } else if (id && startDate === endDate) {
        statusVoucher = "end";
      } else {
        statusVoucher = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
      }
    }
    return statusVoucher;
  }, [startDate, endDate]);

  const handleSetData = (data: IVoucher) => {
    formik.setFieldValue("voucherName", data.voucherName || "");
    formik.setFieldValue("voucherCode", data.voucherCode || "");
    formik.setFieldValue("value", data.value || "");
    formik.setFieldValue("minBill", data.minBill || "");
    formik.setFieldValue("total", data.total || "");
    formik.setFieldValue("userLimit", data.userLimit || "");
    setStartDate(data.startDate || "");
    setEndDate(data.endDate || "");
    setMaximumDiscount(data.maxValue);
    setTypeVoucher(data?.typeVoucher);
  }

  const getVoucherById = async (id: any) => {
    try {
      const resVoucher = await VoucherServices.getVoucherById(id);
      if (resVoucher) {
        handleSetData(resVoucher);
        setVoucher(resVoucher);
        setListProductInVoucher(resVoucher.productVouchers);
        try {
          const resProductByVoucher = await VoucherServices.getProductNotBeenAddVoucher(resVoucher.voucherCode);
          setLisProductNotBeenAddVoucher(resProductByVoucher);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteProduct = (productId: Number) => {
    const newListProduct = listProductInVoucher.filter((item) => item.productId != productId);
    const itemProduct = listProductInVoucher.filter((item) => item.productId == productId);

    setListProductInVoucher(newListProduct)
    setLisProductNotBeenAddVoucher([...listProductNotBeenAddVoucher, ...itemProduct]);
  }
  const getAllProducts = async () => {

    try {
      const resProductByVoucher = await VoucherServices.getProductNotBeenAddVoucher();
      setLisProductNotBeenAddVoucher(resProductByVoucher);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckAll = (check: boolean) => {
    if (check) {
      setListIdAddvoucher(listProductNotBeenAddVoucher.map((item) => item.productId ?? 0));
      setTypeApplyProduct("ALL")
    } else {
      setTypeApplyProduct("ALL")
      setListIdAddvoucher([]);
    }
    setCheckAll(check)
  }

  useEffect(() => {
    if (keySearch == "") {
      console.log("keysearch null");

      if (id) {
        getVoucherById(id);
      } else {
        getAllProducts();
      }
    }
  }, [id, keySearch])

  const radioChangeHandler = (e: any) => {
    const value = e.target.value;
    setMaximumDiscount(value == "Unlimited" ? null : 0);
  };

  return (
    <>
      <div className="pt-11">
        <p className="text-normal2 text-grey-222124 font-bold mb-[32px]">{t('voucher.form.title')}</p>
        <div>
          <GroupInput
            title={t('voucher.form.voucher-name')}
            valueInput={formik.values.voucherName}
            nameInput="voucherName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('voucher.form.placeholder.voucher-name')}
            rounded={false}
            titleError={formik.touched.voucherName && formik.errors.voucherName ? formik.errors.voucherName : ""}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-x-6 pt-4">
          <div className="flex-1">
            <GroupInput
              title={t('voucher.form.voucher-code')}
              valueInput={formik.values.voucherCode}
              nameInput="voucherCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('voucher.form.placeholder.voucher-code')}
              rounded={false}
              titleError={formik.touched.voucherCode && formik.errors.voucherCode ? formik.errors.voucherCode : ""}
              optionInut={{ max: 20 }}
              maxLength={20}
            />
          </div>
          <div className="flex-1">
            <TitleInput isRequired={true} name={t('voucher.form.time')} />
            <div className="flex flex-1 justify-between items-center gap-2">
              <DatePicker
                suffixIcon={<CarlendarIcon />}
                format="HH:mm A YYYY-MM-DD"
                value={dayjs(startDate)}
                showTime
                onChange={(date) =>
                  handleChangeStartDate(date)
                }
                onOk={onOk}
                className="textInput py-2 px-4 w-full h-12 font-semibold text-black ant-picker"
                size="small"
                id="startTime"
                name="startTime"
                showNow={false}
                showToday={false}
                placement="bottomLeft"
                placeholder="Thời gian bắt đầu"
                allowClear={false}
                style={{ outline: "none", borderColor: "var(--neutral80)", borderRadius: 0 }}
              />
              <div className="w-1 h-[1px] bg-black-bl0"></div>
              <DatePicker
                format="HH:mm A YYYY-MM-DD"
                id="endTime"
                onChange={(date) =>
                  handleChangeEndDate(date)
                }
                value={dayjs(endDate)}
                onOk={onOk}
                suffixIcon={<CarlendarIcon />}
                showTime
                className="textInput py-2 px-4 w-full h-12 font-semibold text-black ant-picker"
                size="small"
                name="endTime"
                placement="bottomLeft"
                placeholder="Thời gian kết thúc"
                allowClear={false}
                style={{ outline: "none", borderColor: "var(--neutral80)", borderRadius: 0, }}
              />
            </div>
          </div>
        </div>
        <div className="pt-10 pb-[32px]">
          <p className="text-normal2 text-grey-222124 font-bold mb-[32px]">{t('voucher.form.discount-code')} </p>
          <div>
            <TitleInput isRequired={true} name={t('voucher.form.type-voucher')} />
            <InputComponent
              name="value"
              value={formik.values.value}
              placeholder={typeVoucher == "PERCENT" ? t('voucher.form.placeholder.type-voucher-percent') : t('voucher.form.placeholder.type-voucher-money')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              renderLeft={() => {
                return (
                  <div className="h-full border-r-[1px] border-neutra-neutra80 flex items-center">
                    <DiscountBy
                      setTypeVoucher={setTypeVoucher}
                      typeVoucher={typeVoucher}
                    />
                  </div>
                )
              }}
              unit="VNĐ"
              rounded={false}
            />
            <TextError message={formik.touched.value && formik.errors.value ? formik.errors.value : ""} />
          </div>
          <div className="pt-[14px]">
            <TitleInput isRequired={true} name={t('voucher.form.max-value')} />
            <div className="flex flex-row gap-x-6">
              {
                MAXIMNUM_DISCOUNT_BY.map((it, idx) => {
                  return (
                    <RadioButton
                      key={idx}
                      changed={(e) => radioChangeHandler(e)}
                      name="discount"
                      value={it.actionKey}
                      isSelected={typeof maximumDiscount == typeof it.value}
                      label={it.label}
                    />
                  )
                })
              }
            </div>
          </div>
          <div className="pt-4">
            <TitleInput isRequired={true} name={t('voucher.form.minbill')} />
            <InputComponent
              name="minBill"
              value={formik.values.minBill}
              placeholder={t('voucher.form.minbill')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              unit="VNĐ"
              rounded={false}
            />
            <TextError message={formik.touched.minBill && formik.errors.minBill ? formik.errors.minBill : ""} />
          </div>
          <div className="pt-4">
            <TitleInput isRequired={true} name={t('voucher.form.total')} />
            <InputComponent
              name="total"
              value={formik.values.total}
              placeholder={t('voucher.form.total')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rounded={false}
            />
            <TitleNote name={t('voucher.form.total-note')} />
            <TextError message={formik.touched.total && formik.errors.total ? formik.errors.total : ""} />
          </div>
          <div className="pt-4">
            <TitleInput isRequired={true} name={t('voucher.form.user-limit')} />
            <InputComponent
              name="userLimit"
              value={formik.values.userLimit}
              placeholder={t('voucher.form.placeholder.user-limit')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rounded={false}
            />
            <TitleNote name={t('voucher.form.user-limit-note')} />
            <TextError message={formik.touched.userLimit && formik.errors.userLimit ? formik.errors.userLimit : ""} />
          </div>
        </div>
        <div className="pt-10 pb-[32px]">
          <p className="text-normal2 text-grey-222124 font-bold mb-[32px]">{t('voucher.form.product-voucher')}</p>
          <TitleInput isRequired={true} name={t('voucher.form.applicable-products')} />
          <div className="px-4 h-12 w-full flex flex-row justify-between items-center border border-neutra-neutra80">
            <p className="flex-1">{!isCustomVoucher ? `${t('voucher.form.all-product')}` : `${t('voucher.form.partial')}`}</p>
            <button
              onClick={() => {
                setCustomVoucher((prev) => !prev)
                setTypeApplyProduct(isCustomVoucher || (!isCustomVoucher && listIdAddvoucher.length == 0) ? "ALL" : "PARTIAL")
              }}
              className="-rotate-90">
              <PrevIconElm width={24} height={14} color={colors.black} />
            </button>
          </div>
          {
            isCustomVoucher && (
              <div className="pt-5">
                <TitleInput isRequired={false} name={t('voucher.form.choosse-product')} />
                <div className="pt-4 flex flex-row justify-center items-center gap-x-4">
                  <p>{t("voucher.form.search")}</p>
                  <div className="flex-1">
                    <InputComponent
                      value={keySearch}
                      name="keySearch"
                      onChange={(event) => {
                        searchProduct(event);
                      }
                      }
                      placeholder={t('voucher.form.placeholder.product-name')}
                      rounded={false}
                      className="bg-neutra-neutral95"
                      renderLeft={() => {
                        return (
                          <div className="h-full border border-main flex items-center px-[10px] bg-background">
                            <p className="text-normal1 text-black-bl0 font-normal">{`${t("voucher.form.product-name")}  >`}</p>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-[33px]">
                  <div className="flex flex-row">
                    <div className="h-10 flex items-start border-b-[1px] border-grey-CBCBCB pb-4">
                      <InputChecboxElement
                        isCheck={checkAll}
                        name="check-all"
                        onHandleChange={() => handleCheckAll(!checkAll)}
                        sizeBox="w-5 h-5  mr-[68px] "
                      />
                    </div>
                    <div className="flex-1 items-start justify-between grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-x-2 font-semibold border-b-[1px] border-grey-CBCBCB pb-4">
                      <ColumnHeaders title={t('voucher.form.table.product')} />
                      <ColumnHeaders title={t('voucher.form.table.unit-price')} />
                      <ColumnHeaders title={t('voucher.form.table.in-stock')} />
                      <ColumnHeaders title={t('voucher.form.table.Inventory')} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4 pt-4 max-h-[580px] overflow-y-auto">
                    {
                      (listProductNotBeenAddVoucher ?? []).map((it, idx) => {
                        return (
                          <div className="flex flex-row justify-start items-center" key={idx}>
                            <div className="h-10 flex items-center">
                              <InputChecboxElement
                                isCheck={listIdAddvoucher.includes(
                                  it.productId
                                )}
                                name={it.productNameVn}
                                onHandleChange={() => {
                                  it.productId && handleAddListItem(it.productId);
                                  checkAll && setCheckAll(false);
                                }}
                                sizeBox="w-5 h-5  mr-[68px] "
                              />
                            </div>
                            <div className="h-10 flex-1 items-center justify-between grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-x-2 font-semibold">
                              <ItemTable title={it.productNameVn} isProduct img={it.images ? it.images[0]?.url : ""} />
                              <ItemTable isPriece prieceNew={it.price} prieceOld={it.promo} />
                              <ItemTable title={it.addressWarehouse} />
                              <ItemTable title={it.quantity.toString()} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  {
                    listProductInVoucher.length > 0 && (
                      <div className="pt-10">
                        <TitleInput isRequired={false} name="Sản phẩm đã chọn" />

                        <div className="flex flex-col gap-y-4 pt-3 max-h-[580px] overflow-y-auto">
                          {
                            (listProductInVoucher ?? []).map((it, idx) => {
                              return (
                                <div className="flex flex-row justify-start items-center" key={idx}>
                                  <div className="h-10 flex items-center">
                                    <button
                                      onClick={() => handleDeleteProduct(it.productId)}
                                      className="mr-[68px]">
                                      <ICDeleteTrashLight />
                                    </button>
                                  </div>
                                  <div className="h-10 flex-1 items-center justify-between grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-x-2 font-semibold">
                                    <ItemTable title={it.productNameVn} isProduct img={it.images ? it.images[0]?.url : ""} />
                                    <ItemTable isPriece prieceNew={it.price} prieceOld={it.promo} />
                                    <ItemTable title={it.addressWarehouse} />
                                    <ItemTable title={it.quantity.toString()} />
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
        <div className="pt-[100px] pb-[172px] flex justify-end">
          <GroupButton
            textCancel="Hủy"
            text="Thêm"
            onSubmit={formik.handleSubmit}
            onCancel={() => { }}
            isLoading={formik.isSubmitting}
          />
        </div>
      </div>
    </>
  )
  }

export default VoucherEditComponent;

import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { CarlendarIcon } from "@assets/icons";
import { GroupInput } from "@components/input/GroupInput";
import { InputComponent } from "@components/input/InputComponent";
import { TextError } from "@components/input/TextError";
import TitleInput from "@components/input/TitleInput";
import TitleNote from "@components/input/TitleNote";
import { ToastContex } from "@contexts/ToastContex";
import useFocusOut from "@hooks/useFocusOut";
import { ColumnHeaders } from "@pages/AdminPage/ManageVoucher";
import ProducSizeItem from "@pages/AdminPage/ProducSizeItem";
import ProductServices from "@services/ProductServices";
import VoucherServices from "@services/voucherService";
import { colors } from "@utility/colors";
import { DatePicker } from "antd";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import RadioElement from "commons/components/InputComponent/RadioElement";
import { Product, VoucherType } from "commons/contannt";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

export type DISCOUNT_TYPE = 'Percent' | 'Money'
const DISCOUNT_BY: { actionKey: DISCOUNT_TYPE; value: string }[] = [
  { actionKey: "Percent", value: "Phần trăm" },
  { actionKey: "Money", value: "Theo số tiền" },
]

export const DiscountBy = () => {
  const [preview, setPreview] = useState(DISCOUNT_BY[0]);
  const {
    clickShow,
    setClickShow,
    ref
  } = useFocusOut();
  return (
    <>
      <div ref={ref}>
        <div className="relative w-[172px] px-4">
          <div className="flex flex-row gap-x-1 justify-between items-center">
            <p className="flex-1 text-wap-regular2 font-normal">{preview.value}</p>
            <button
              onClick={() => setClickShow((prev) => !prev)}
              className="-rotate-90 flex justify-center items-center">
              <div className="">
                <PrevIconElm width={15} height={12} color={colors.black} />
              </div>
            </button>
            {
              clickShow && (
                <div className="absolute z-10 w-[104px] top-4 left-0 ">
                  <div className="bg-neutra-neutral98 rounded">
                    {
                      DISCOUNT_BY.map((it, idx) => {
                        return (
                          it.actionKey !== preview.actionKey && (
                            <>
                              <button
                                key={idx}
                                onClick={() => {
                                  setPreview(it)
                                  setClickShow((prev => !prev))
                                }}
                                className="px-[9px] py-[6px] flex flex-row gap-x-2 justify-center items-center" >
                                {/* <img src={it.image} alt={it.country} className="" /> */}
                                <p className="w-11 flex items-start text-normal text-neutra-neutral2 font-normal font-NunitoSans">{it.value}</p>
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
interface Props { }
function VoucherEditComponent(props: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const [isDisable, setDisAble] = useState<boolean>(false);
  const [isCustomVoucher, setCustomVoucher] = useState<boolean>(false);
  const [keySearch, setKeySearch] = useState("");
  const [currenPage, setCurrentPage] = useState<number>(0);
  const [totaPage, setTotalPage] = useState<number>(0);
  const [listProduct, setListProducts] = useState<Product[]>([]);
  const [listProductSearch, setListProductsSearch] = useState<Product[]>([]);

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

  const [listIdAddvoucher, setListIdAddvoucher] = useState<number[]>([]);
  const handleValueInput = (valuInput: { name: string; value: string }) => {
    const { name, value } = valuInput;
    setFormData((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const nameList = [
    "Tên sản phẩm",
    "Phân loại",
    "Giá bán",
    "Kho hàng",
    "Đã bán",
  ];
  const getListProductAddVoucher = async () => {
    try {
      const result = await ProductServices.getListProduct({
        page: currenPage,
        size: 5,
      });
      return result;
    } catch (error) {
      console.log("loi");
    }
  };

  const getProductByKeySearch = async (key: string) => {
    try {
      if (key.trim() !== "") {
        const result = await ProductServices.searchHeader({ page: 0, size: 20, keyword: key });
        if (result.data) {
          setListProductsSearch(result.data as any);
          return;
        }
      } else {
        setListProductsSearch([]);
      }
    } catch (error) {
      setListProductsSearch([]);
      onAddToast({
        type: "error",
        message: `Có lỗi không thể sản phẩm`,
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
    setListIdAddvoucher(newListId);
  };
  const handleChangeTimePicker = (date: any, dateString: any, name: string) => {
    const dateTime = date.valueOf();
    setFormData({
      ...fomData,
      [name]: dateTime,
    });
  };

  const onOk = (value: any) => {
    console.log("onOkEvent: ");
  };
  const checkValidate = () => {
    if (
      fomData.sku === "" ||
      fomData.name === "" ||
      fomData.moneyVoucher === 0 ||
      fomData.total === 0
    ) {
      return false;
    }
    return true;
  };
  const validateDatePicker = useCallback(() => {
    console.log(fomData.startTime, fomData.endTime, "kjhasdkfjhasdjkfhaskdjfh");
    const nowDate = new Date().getTime();
    let statusVoucher = "";
    if (fomData.startTime <= nowDate) {
      if (fomData.startTime === fomData.endTime) {
        statusVoucher = "end";
      } else if (fomData.startTime < fomData.endTime) {
        statusVoucher = "running";
      } else {
        statusVoucher = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
      }
    } else {
      if (fomData.startTime < fomData.endTime) {
        statusVoucher = "running";
      } else if (id && fomData.startTime === fomData.endTime) {
        statusVoucher = "end";
      } else {
        statusVoucher = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
      }
    }
    return statusVoucher;
  }, [fomData.startTime, fomData.endTime]);

  const handleSetItemsIdList = () => {
    setFormData({
      ...fomData,
      itemsIdList: listIdAddvoucher,
    });
    onAddToast({
      type: "success",
      message: `Có ${listIdAddvoucher.length} sản phẩm được chọn giảm giá`,
    });
  };

  const onSubmitVoucher = async () => {
    try {
      if (checkValidate()) {
        let statusVoucher = validateDatePicker();
        if (
          statusVoucher != "" &&
          (statusVoucher == "end" ||
            statusVoucher == "running" ||
            statusVoucher == "before")
        ) {
        } else {
          onAddToast({
            type: "error",
            message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
          });
          return;
        }
        setDisAble(true);
        let NewFormData = {
          name: fomData.name,
          sku: fomData.sku,
          startTime: fomData.startTime,
          endTime: fomData.endTime,
          moneyVoucher: fomData.moneyVoucher,
          minPayment: fomData.minPayment,
          total: fomData.total,
          voucherUsed: fomData.voucherUsed,
          status: statusVoucher,
          itemsIdList: fomData.itemsIdList,
        };
        if (id) {
          const edited = await VoucherServices.addOrUpdateVoucher(
            {
              id: fomData.id,
              ...NewFormData,
            },
            id
          );
          onAddToast({
            type: "success",
            message: "Sửa voucher thành công",
          });

          setFormData(edited);

          setListIdAddvoucher(edited.itemsIdList);
          setCustomVoucher(edited.itemsIdList.length > 0);
        } else {
          const addedData = await VoucherServices.addOrUpdateVoucher(
            NewFormData
          );
          onAddToast({
            type: "success",
            message: "Thêm voucher thành công",
          });
          setFormData({
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
          setListIdAddvoucher([]);
          setCustomVoucher(false);
        }
        setDisAble(false);
      }
    } catch (error) {
      onAddToast({
        type: "error",
        message: "Có lỗi không thể thêm hoặc sửa voucher",
      });
      setDisAble(false);
    }
  };

  useEffect(() => {
    const initalFunc = async () => {
      if (id) {
        if (listProduct.length > 0) {
          const products = await getListProductAddVoucher();
          if (products) {
            const { total, data, status } = products;
            setTotalPage(total);
            const newStateP = data.filter((item) => {
              return !fomData.itemsIdList.includes(item.id!);
            });
            setListProducts([...listProduct, ...newStateP]);
            return;
          }
        } else {
          const listItemProductAddedVoucher =
            await VoucherServices.getVoucherById(id);
          setFormData(listItemProductAddedVoucher);
          setCustomVoucher(listItemProductAddedVoucher.itemsIdList.length > 0);
          setListIdAddvoucher([
            ...listItemProductAddedVoucher.itemsIdList,
            ...listIdAddvoucher,
          ]);
          let listItem: Product[] = [];
          if (listItemProductAddedVoucher.itemsIdList.length > 0) {
            const listProductInVoucher =
              await ProductServices.getProductInVoucher(
                listItemProductAddedVoucher.itemsIdList
              );
            listItem = listProductInVoucher.data;
          }
          const products = await getListProductAddVoucher();

          if (products) {
            const { total, data, status } = products;
            const newStateP = data.filter((item) => {
              return !listItemProductAddedVoucher.itemsIdList.includes(
                item.id!
              );
            });
            setTotalPage(total);
            setListProducts([...listItem, ...newStateP]);
          }
          return;
        }
      } else {
        const products = await getListProductAddVoucher();
        if (products) {
          const { total, data, status } = products;
          setTotalPage(total);
          setListProducts([...listProduct, ...data]);
        }
      }
    };

    initalFunc();
  }, [id, currenPage]);

  return (
    <>
      <div className="pt-11">
        <p className="text-normal2 text-grey-222124 font-bold mb-[32px]">Thông tin cơ bản</p>
        <div>
          <GroupInput
            title="Tên chương trình giảm giá"
            valueInput=""
            nameInput="nameVoucher"
            onChange={() => { }}
            onBlur={() => { }}
            placeholder="Tên voucher chỉ hiển thị trong màn quản lý"
            rounded={false}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-x-6 pt-4">

          <div className="flex-1">
            <GroupInput
              title="Tên chương trình giảm giá"
              valueInput=""
              nameInput="nameVoucher"
              onChange={() => { }}
              onBlur={() => { }}
              placeholder="Tên voucher chỉ hiển thị trong màn quản lý"
              rounded={false}
            />
          </div>
          <div className="flex-1">
            <TitleInput isRequired={true} name="Thời gian sử dụng mã" />
            <div className="flex flex-1 justify-between items-center gap-2">
              <DatePicker
                suffixIcon={<CarlendarIcon />}
                format="HH:mm A YYYY-MM-DD"
                value={dayjs(fomData.startTime)}
                showTime
                onChange={(date, dateString) =>
                  handleChangeTimePicker(date, dateString, "startTime")
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
                onChange={(date, dateString) =>
                  handleChangeTimePicker(date, dateString, "endTime")
                }
                value={dayjs(fomData.endTime)}
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
          <p className="text-normal2 text-grey-222124 font-bold mb-[32px]">Thiết lập mã giảm giá</p>
          <div>
            <TitleInput isRequired={true} name="Loại giảm giá | Mức giảm" />
            <InputComponent
              name="discount"
              value=""
              placeholder="Nhập phần trăm giảm giá"
              onChange={() => { }}
              onBlur={() => { }}
              renderLeft={() => {
                return (
                  <div className="h-full border-r-[1px] border-neutra-neutra80 flex items-center">
                    <DiscountBy />
                  </div>
                )
              }}
              unit="VNĐ"
              rounded={false}
            />
            <TextError message={""} option={{ max: 40 }} />
          </div>
          <div className="pt-4">
            <TitleInput isRequired={true} name="Giá trị hóa đơn tối thiểu" />
            <InputComponent
              name="minBill"
              value=""
              placeholder="Nhập số lượng voucher sử dụng tối đa"
              onChange={() => { }}
              onBlur={() => { }}
              unit="VNĐ"
              rounded={false}
            />
            <TextError message={""} option={{ max: 40 }} />
          </div>
          <div className="pt-4">
            <TitleInput isRequired={true} name="Lượt sử dụng tối đa" />
            <InputComponent
              name="minBill"
              value=""
              placeholder="Nhập số lượng voucher sử dụng tối đa"
              onChange={() => { }}
              onBlur={() => { }}
              rounded={false}
            />
            <TitleNote name="Tổng số Mã giảm giá có thể sử dụng" />
            <TextError message={""} option={{ max: 40 }} />
          </div>
          <div className="pt-4">
            <TitleInput isRequired={true} name="Lượt sử dụng tối đa / Người mua" />
            <InputComponent
              name="minBill"
              value=""
              placeholder="Lượt sử dụng tối đa / Người mua"
              onChange={() => { }}
              onBlur={() => { }}
              rounded={false}
            />
            <TitleNote name="Lượt sử dụng tối đa mỗi Người mua không được lớn hơn tổng lượt sử dụng tối đa của voucher" />
            <TextError message={""} option={{ max: 40 }} />
          </div>
        </div>
        <div className="pt-10 pb-[32px]">
          <p className="text-normal2 text-grey-222124 font-bold mb-[32px]">Thiết lập mã giảm giá</p>
          <TitleInput isRequired={true} name="Lượt sử dụng tối đa / Người mua" />
          <div className="px-4 h-12 w-full flex flex-row justify-between items-center border border-neutra-neutra80">
            <p className="flex-1">Toàn bộ sản phẩm</p>
            <button
              onClick={() => setCustomVoucher((prev) => !prev)}
              className="-rotate-90">
              <PrevIconElm width={24} height={14} color={colors.black} />
            </button>
          </div>
          {
            isCustomVoucher && (
              <div className="pt-5">
                <TitleInput isRequired={false} name="Chọn sản phẩm" />
                <div className="pt-4 flex flex-row justify-center items-center gap-x-4">
                  <p>Tìm</p>
                  <div className="flex-1">
                    <InputComponent
                      value=""
                      name="search"
                      onChange={() => { }}
                      placeholder="Nhập tên"
                      rounded={false}
                      className="bg-neutra-neutral95"
                      renderLeft={() => {
                        return (
                          <div className="h-full border border-main flex items-center px-[10px] bg-background">
                            <p className="text-normal1 text-black-bl0 font-normal">{`Tên sản phẩm  >`}</p>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-[33px]">
                  <div className="flex-1 items-start justify-between grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-x-2 font-semibold">
                    <ColumnHeaders title="Sản phẩm" />
                    <ColumnHeaders title="Đơn giá (VNĐ)" />
                    <ColumnHeaders title="Kho còn hàng" />
                    <ColumnHeaders title="Tồn kho" />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
  return (
    <div className=" pt-9 pb-10px">
      <h2 className="titlePage mb-9">Thông tin cơ bản</h2>

      <div className="w-2/3">
        <p className="text-small mb-3">
          Tên chương trình giảm giá <span className="text-main">*</span>
        </p>
        <InputTextElement
          isRequired
          name="name"
          value={fomData.name}
          placehoderText="Nhập vào tên chương trình giảm giá"
          maxNumber={150}
          classWidth="w-full mr-3"
          onChangeInput={handleValueInput}
          className="py-3 px-5"
        />
        <p className="text-xs font-normal text-gray-300 ml-5 mt-6px tracking-[.03]">
          Tên Voucher sẽ không được hiển thị cho Người mua
        </p>
        <p className="text-small mb-3 mt-7">
          Mã voucher<span className="text-main">*</span>
        </p>
        <InputTextElement
          isRequired
          name="sku"
          value={fomData.sku}
          placehoderText="Nhập vào mã giảm giá"
          maxNumber={150}
          classWidth="w-full mr-3"
          onChangeInput={handleValueInput}
          className="py-3 px-5"
        />
        <p className="text-small mb-3 mt-7">
          Thời gian sử dụng mã<span className="text-main">*</span>
        </p>
        <div className="flex items-center gap-2">
          <DatePicker
            suffixIcon={<CarlendarIcon />}
            format="YYYY-MM-DD HH:mm"
            value={dayjs(fomData.startTime)}
            showTime
            onChange={(date, dateString) =>
              handleChangeTimePicker(date, dateString, "startTime")
            }
            onOk={onOk}
            className="textInput py-2 px-4 w-[214px] mr-10px font-semibold text-black"
            size="small"
            id="startTime"
            name="startTime"
            showNow={false}
            showToday={false}
            placement="bottomLeft"
            placeholder="Thời gian bắt đầu"
            allowClear={false}
            style={{ outline: "none", borderColor: "var(--border-color)" }}
          />
          <div className="w-8 h-[1px] bg-slate-300"></div>
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            id="endTime"
            onChange={(date, dateString) =>
              handleChangeTimePicker(date, dateString, "endTime")
            }
            value={dayjs(fomData.endTime)}
            onOk={onOk}
            suffixIcon={<CarlendarIcon />}
            showTime
            className="textInput py-2 px-4 w-[214px] mr-10px font-semibold text-black"
            size="small"
            name="endTime"
            placement="bottomLeft"
            placeholder="Thời gian kết thúc"
            allowClear={false}
            style={{ outline: "none", borderColor: "var(--border-color)" }}
          />
        </div>

        <div className="pt-5">
          <p className="titlePage text-2xl my-8">Thiết lập mã giảm giá</p>

          <div>
            <p className="text-small mb-3">
              Giảm giá <span className="text-main">*</span>
            </p>
            <InputTextElement
              isRequired
              type="number"
              name="moneyVoucher"
              value={fomData.moneyVoucher === 0 ? "" : fomData.moneyVoucher}
              placehoderText="Nhập số tiền"
              maxNumber={150}
              classWidth="w-full mr-3"
              onChangeInput={handleValueInput}
              className="py-3 px-5"
            />

            <p className="text-small mb-3 mt-7">
              Lượt sử dụng tối đa <span className="text-main">*</span>
            </p>
            <InputTextElement
              isRequired
              type="number"
              name="total"
              value={fomData.total === 0 ? "" : fomData.total}
              placehoderText="Nhập số lượng voucher sử dụng tối đa"
              classWidth="w-full mr-3"
              onChangeInput={handleValueInput}
              className="py-3 px-5"
            />

            <p className="text-small mb-3 mt-7">Gía trị đơn hàng tối thiểu</p>
            <InputTextElement
              name="minPayment"
              type="number"
              value={fomData.minPayment === 0 ? "" : fomData.minPayment}
              placehoderText="Nhập giá trị đơn tối thiểu"
              maxNumber={150}
              classWidth="w-full mr-3"
              onChangeInput={handleValueInput}
              className="py-3 px-5"
            />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <p className="titlePage text-2xl my-8">Voucher áp dụng cho sản phẩm</p>
        <div className="flex flex-col gap-3">
          <RadioElement
            isChecked={!isCustomVoucher}
            handleChange={() => {
              setCustomVoucher(false);
              setListIdAddvoucher([]);
              setFormData({
                ...fomData,
                itemsIdList: [],
              });
            }}
            name="active"
            lable="Voucher cho toàn sản phẩm"
          />
          <RadioElement
            isChecked={isCustomVoucher}
            handleChange={() => setCustomVoucher(true)}
            name="active"
            lable="Voucher cho sản phẩm tùy chỉnh"
          />
        </div>
        {isCustomVoucher && (
          <>
            <div>
              <button
                className="rounded-md py-10px px-5 my-5 mb-18px border border-main flex items-center text-main text-small font-normal bg-transparent"
                onClick={handleSetItemsIdList}
              >
                Thêm sản phẩm
              </button>
              <div className="p-4 pr-9 border rounded-md shadow">
                <p className="titlePage text-2xl pb-10px">Chọn sản phẩm</p>
                <input
                  name="proSearch"
                  value={keySearch}
                  placeholder="Tìm sản phẩm"
                  className="textInput placeholder:text-gray-200 max-w-[337px] mb-4 py-3 px-5"
                  onChange={(event) => {
                    searchProduct(event);
                  }}
                />
                <div className="max-h-[450px] overflow-y-scroll">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="textInput font-normal">
                        {nameList.map((item, index) => {
                          return (
                            <th
                              className="textInput font-normal px-7 py-3"
                              key={index}
                            >
                              {item}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {listProductSearch.length > 0
                        ? listProductSearch.map((itemSearch, index) => {
                          return (
                            <ProducSizeItem
                              showEditLink={false}
                              key={itemSearch.id}
                              item={itemSearch}
                              isCheck={listIdAddvoucher.includes(
                                itemSearch.id!
                              )}
                              handleDelete={handleAddListItem}
                            />
                          );
                        })
                        : listProduct.map((product, indexP) => {
                          return (
                            <ProducSizeItem
                              showEditLink={false}
                              key={product.id}
                              item={product}
                              isCheck={listIdAddvoucher.includes(product.id!)}
                              handleDelete={handleAddListItem}
                            />
                          );
                        })}
                    </tbody>
                  </table>

                  {Math.ceil(totaPage / 5) != currenPage + 1 &&
                    keySearch === "" && (
                      <div className="flex items-center justify-center py-3">
                        <button
                          onClick={() => {
                            if (currenPage < Math.ceil(totaPage / 5) - 1) {
                              setCurrentPage(currenPage + 1);
                            }
                          }}
                          className="bg-transparent text-main text-sm leading-18"
                        >
                          Xem thêm
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex item-center mt-10">
          <button
            onClick={onSubmitVoucher}
            disabled={!checkValidate() || isDisable}
            className={
              "btn-normal text-sm leading-18 mr-10px " +
              (!checkValidate() || isDisable
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "")
            }
          >
            Lưu
          </button>
          <button
            className="rounded-md py-2 px-3 border border-main flex items-center text-main text-small font-normal bg-icon"
            onClick={() => {
              navigate(-1);
            }}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoucherEditComponent;

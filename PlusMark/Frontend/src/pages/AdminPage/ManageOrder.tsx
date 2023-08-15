import { CarlendarIcon } from "@assets/icons";
import OrderModal from "@components/ManagerModal/OrderModal";
import Pagination from "@components/Pagination";
import { ToastContex } from "@contexts/ToastContex";
import { ModalContext } from "@contexts/contextModal";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import OrderService from "@services/orderServices";
import { formatMoney } from "@utility/helper";
import { DatePicker } from "antd";
import { OrderType, itemCard } from "commons/contannt";
import { dayFormat } from "commons/dayfomat";
import dayjs from "dayjs";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import DowloadFile from "@services/DowloadFile";
import {
  setCurrentPage,
  setListByOneOrder,
  setLoading,
} from "redux/reducer/orderSlice";
import { ThunkGetListOrder } from "redux/thunk/orderAction";

const { RangePicker } = DatePicker;

function ManageOrder() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const { listOrders, currentPage, isloading, error, totalElement } =
    useAppSelector((state) => state.orders);
  const [inputSearch, setInputSearch] = useState<string>("");
  const date = new Date().getTime();
  const OfsetDate = date - 24 * 60 * 60 * 1000 * 5;

  const [rangeTimeValue, setRangeTimeValue] = useState({
    startDate: OfsetDate,
    endDate: date,
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value.trim());
  };
  const showDetailOrder = (item: OrderType) => {
    setShowModal(true);
    setContentModal(<OrderModal itemOrder={item} />);
  };
  const listName = [
    "Mã đơn",
    "Họ và tên",
    "Ngày đặt hàng",
    "Số điện thoại",
    "Email",
    "Thanh toán",
    "Địa chỉ",
    "Tổng đơn hàng",
    "Sản phẩm",
  ];

  const dowloadExcel = async () => {
    await DowloadFile.dowloadExcel(rangeTimeValue)
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `ĐƠN-HÀNG-${dayFormat(new Date().getTime())}.xlsx`;
        link.click();
        return link;
      })
      .then((link) => {
        window.URL.revokeObjectURL(link.href);
        link.remove();
        onAddToast({
          type: "success",
          message: `Đã xuất ${totalElement} đơn hàng`,
        });
      })
      .catch((error) => {
        onAddToast({ type: "error", message: "Không thể tải đơn hàng" });
      });
  };

  const handlePagination = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const CartOrderItem = ({ item }: { item: itemCard }) => {
    return (
      <div className="flex gap-4 p-3 items-center min-w-[300px]">
        <img
          src={item.image || "/images-raw/imageTshirt.jpg"}
          alt=""
          className="w-[52px] h-[52px] rounded-[10px]"
        />
        <div className="text-xs tracking-[.03] leading-4 font-normal w-[80%]">
          <div className="flex justify-between mb-1">
            <p className="text-left">{item.itemName}</p>
            <p>x{item.total}</p>
          </div>
          <div className="flex justify-between">
            <p>
              {item.size} /{item.color}
            </p>
            <p className="text-main ">{formatMoney(item.price)}</p>
          </div>
        </div>
      </div>
    );
  };
  const handleChangeTimePicker = (value: any, dateString: any) => {
    let startDates = new Date(value[0].valueOf());
    startDates.setHours(0);
    startDates.setMinutes(0);
    startDates.setSeconds(0);
    let endDate = new Date(value[1].valueOf());
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    setRangeTimeValue({
      startDate: startDates.getTime(),
      endDate: endDate.getTime(),
    });
  };

  const onSearchOrder = async () => {
    if (inputSearch === "") {
      dispatch(setCurrentPage(1));
      return;
    }
    navigate("");
    setRangeTimeValue({
      startDate: OfsetDate,
      endDate: date,
    });
    const payment = await OrderService.getOrderByCode(inputSearch);
    if (payment) {
      dispatch(setListByOneOrder(payment));
      dispatch(setLoading(true));
    } else {
      onAddToast({ type: "warn", message: "Không tìm thấy đơn hàng nào" });
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      const page = Number(searchParams.get("page"));
      setCurrentPage(page);
    }
    return () => {};
  }, [searchParams]);

  useEffect(() => {
    if (inputSearch === "") {
      const param = {
        startDate: rangeTimeValue.startDate,
        endDate: rangeTimeValue.endDate,
        page: currentPage - 1,
        size: 20,
        sort: "createdAt,desc",
      };
      dispatch(ThunkGetListOrder(param));
    }
  }, [rangeTimeValue, currentPage, inputSearch]);

  return (
    <div className="w-full pt-9 pb-10px">
      <div className="pl-25">
        <h2 className="titlePage mb-4">Quản lý đơn hàng</h2>

        <div className="xl:flex xl:items-center xl:justify-between mb-25">
          <div className="flex items-center xl:mb-0 mb-4">
            <input
              value={inputSearch}
              onChange={(event) => handleChangeInput(event)}
              placeholder="Nhập mã đơn hàng"
              className="textInput py-[11px] leading-18 px-4 w-[312px] mr-10px"
            />
            <button
              disabled={inputSearch === ""}
              onClick={onSearchOrder}
              className={
                "btn-normal py-3 text-sm leading-18 " +
                (inputSearch === "" &&
                  "bg-gray-300 text-white cursor-not-allowed")
              }
            >
              Tìm kiếm
            </button>
          </div>
          <div className="xl:mb-0 mb-8 xl:flex xl:items-center">
            <p className="text-[#000000] font-normal text-sm leading-18 tracking-[.03] mb-2 xl:mb-0 xl:mr-5">
              Ngày đặt hàng
            </p>
            <RangePicker
              suffixIcon={<CarlendarIcon />}
              size="small"
              id="date"
              name="date"
              value={[
                dayjs(rangeTimeValue.startDate),
                dayjs(rangeTimeValue.endDate),
              ]}
              allowClear={false}
              style={{ outline: "none", borderColor: "var(--border-color)" }}
              format="YYYY-MM-DD"
              onChange={handleChangeTimePicker}
              separator="-"
              placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
              className="textInput py-2 px-4 w-[300px] mr-10px font-semibold text-black"
            />
            {totalElement > 0 && inputSearch === "" && (
              <button
                onClick={() => dowloadExcel()}
                className="textInput  py-[11px] px-4 bg-white font-semibold"
              >
                Xuất
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="xl:pl-25">
        <p className="font-semibold text-base tracking-[.03] leading-5 text-black mb-4">
          {totalElement} Đơn hàng
        </p>
        {listOrders.length > 0 && (
          <div className="xl:w-full w-screen overflow-scroll gray-thunb">
            <table className="xl:w-full min-w-[1200px] table-Style">
              <thead>
                <tr>
                  {listName.map((item, index) => {
                    return (
                      <th
                        key={item + index}
                        className="text-sm font-normal tracking-[.03] text-main"
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {listOrders.map((itemOrder, indexOrder) => {
                  return (
                    <tr
                      key={itemOrder.id}
                      className="cursor-pointer"
                      onClick={() => showDetailOrder(itemOrder)}
                    >
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {itemOrder.sku}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {itemOrder.customer.fullname}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {dayFormat(itemOrder.createdAt)}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {itemOrder.customer.phoneNumber}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {itemOrder.customer.email}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {itemOrder.paymentMethod}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center h-full">
                        {itemOrder.customer.address +
                          "-" +
                          itemOrder.customer.commune +
                          "-" +
                          itemOrder.customer.district +
                          "-" +
                          itemOrder.customer.province}
                      </td>
                      <td className="text-sm font-normal tracking-[.03] text-center">
                        {formatMoney(itemOrder.total)}
                      </td>
                      <td>
                        <div
                          key={itemOrder.id}
                          className="max-h-[160px] overflow-y-scroll"
                        >
                          {itemOrder.itemsCartList.map((item) => {
                            return (
                              <CartOrderItem key={item.itemId} item={item} />
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {inputSearch === "" && listOrders.length > 0 && (
        <div className="pt-16">
          <Pagination
            currenPage={currentPage}
            setCurrentPage={handlePagination}
            total={Math.ceil(totalElement / 20)}
          />
        </div>
      )}
    </div>
  );
}

export default ManageOrder;

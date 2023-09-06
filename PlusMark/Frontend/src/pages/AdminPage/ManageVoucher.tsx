import Pagination from "@components/Pagination";
import { ModalContext } from "@contexts/contextModal";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { formatMoney, some } from "@utility/helper";
import ConfirmBox from "commons/ConfirmBox";
import { ThVoucher, VoucherType } from "commons/contannt";
import { dayFormat } from "commons/dayfomat";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCurrentPage } from "redux/reducer/voucherSlice";
import { ThunkGetvoucher } from "redux/thunk/voucherAction";
import { ButtonFilter } from "./Products/ManageProduct";

interface Props {}
function ManageVoucher(props: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPage, listVoucher, totalElement, isloading, error } =
    useAppSelector((state) => state.vouchers);
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const [filterVoucher, setFilterVoucher] = useState<
    null | "running" | "before" | "end"
  >(null);
  const ListVoucherFilter = [
    {
      name: "Tất cả",
      activeKey: null,
    },
    {
      name: "Đang diễn ra",
      activeKey: "running",
    },
    {
      name: "Sắp diễn ra",
      activeKey: "before",
    },
    {
      name: "Kết thúc",
      activeKey: "end",
    },
  ];

  const handleEditVoucher = (id: string) => {
    navigate(`edit/${id.toString()}`);
  };

  const handleFilter = (value: null | "running" | "before" | "end") => {
    navigate("");
    dispatch(setCurrentPage(1));
    setFilterVoucher(value);
  };
  const handleEndVoucher = (item: VoucherType) => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        typeBox="SUCCESS"
        enableIcon={false}
        message="Bạn có xác nhận kết thúc chương trình giảm giá này không?"
        handleConfirm={() => {
          setShowModal(false);
        }}
      />
    );
  };
  useEffect(() => {
    if (searchParams.get("page")) {
      setCurrentPage(Number(searchParams.get("page")));
    }
  }, [searchParams]);

  useEffect(() => {
    const paramApi = {
      page: currentPage - 1,
      size: 5,
      status: filterVoucher,
    };
    dispatch(ThunkGetvoucher(paramApi));
    return () => {};
  }, [currentPage, filterVoucher]);

  return (
    <div className=" pt-9 pb-10px">
      <h2 className="titlePage mb-9">Quản lý voucher</h2>
      <div className="flex items-center justify-end gap-2">
        <button
          className="btn-normal text-sm leading-18"
          onClick={() => navigate("add")}
        >
          Tạo voucher
        </button>
      </div>
      <div>
        <div className="flex items-center mb-2 gap-4">
          {ListVoucherFilter.map((itemFilter, indexFilter) => {
            return (
              <ButtonFilter
                key={indexFilter}
                name={itemFilter.name}
                isActive={filterVoucher === itemFilter.activeKey}
                handleSubmit={() => handleFilter(itemFilter.activeKey as any)}
              />
            );
          })}
        </div>
        {/* <div
          className={`h-1 absolute bg-main`}
        ></div> */}
        <div className="w-full h-[1px] bg-gray-200"></div>
      </div>

      <div></div>
      {listVoucher.length > 0 ? (
        <div className="mt-5">
          <table className="w-full">
            <thead>
              <tr>
                {ThVoucher.map((itemTh, IndexTh) => {
                  return (
                    <th
                      key={IndexTh}
                      className="text-main text-small font-normal text-center py-6 w-1/6"
                    >
                      {itemTh}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listVoucher.map((itemVoucher, index) => {
                return (
                  <tr key={itemVoucher.id}>
                    <td className="text-main text-small font-normal text-center py-6">
                      {itemVoucher.sku}
                    </td>
                    <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
                      {itemVoucher.name}
                    </td>
                    <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
                      {itemVoucher.moneyVoucher < 100
                        ? `${itemVoucher.moneyVoucher}% giảm`
                        : formatMoney(itemVoucher.moneyVoucher)}
                    </td>
                    <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
                      {itemVoucher.total}
                    </td>
                    <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
                      <p
                        className={
                          "text-small tracking-[.03] " +
                          (itemVoucher.status === "running"
                            ? "text-buttonSucces"
                            : itemVoucher.status === "end"
                            ? "text-main"
                            : "text-gray-200")
                        }
                      >
                        {itemVoucher.status === "running"
                          ? "Đang diễn ra"
                          : itemVoucher.status === "end"
                          ? "Đã kết thúc"
                          : "Sắp diễn ra"}
                      </p>
                      <p className="text-small">
                        {dayFormat(itemVoucher.startTime, true)}
                        <br />

                        {dayFormat(itemVoucher.endTime, true)}
                      </p>
                    </td>
                    <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
                      {(itemVoucher.status === "running" ||
                        itemVoucher.status === "before") && (
                        <button
                          onClick={() => handleEditVoucher(itemVoucher.id)}
                          className="text-small tracking-[.03] cursor-buttonointer text-center font-normal mb-2"
                        >
                          Chỉnh sửa
                        </button>
                      )}
                      {itemVoucher.status === "end" && (
                        <button className="border-b border-b-mains text-main tracking-[.03]">
                          Kết thúc
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full text center h-screen flex items-center justify-center text-main">
          Không có Voucher nào!
        </div>
      )}

      {listVoucher.length > 0 && (
        <div className="mt-10">
          <Pagination
            currenPage={currentPage}
            setCurrentPage={(page: number) => dispatch(setCurrentPage(page))}
            total={Math.ceil(totalElement / 5)}
          />
        </div>
      )}
    </div>
  );
}

export default ManageVoucher;

import Pagination from "@components/Pagination";
import { ModalContext } from "@contexts/contextModal";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import { formatMoney, some } from "@utility/helper";
import ConfirmBox from "commons/ConfirmBox";
import { ThVoucher, VoucherType } from "commons/contannt";
import { dayFormat } from "commons/dayfomat";
import { useContext, useEffect, useState, useRef, Ref, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCurrentPage } from "redux/reducer/voucherSlice";
import { ThunkGetvoucher } from "redux/thunk/voucherAction";
import { ButtonFilter } from "./Products/ManageProduct";
import VoucherServices from "@services/voucherService";
import { IVoucher } from "@services/Types/voucher";
import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import { colors } from "@utility/colors";
import { ICAdd } from "@assets/iconElements/ICAdd";
import { Checkbox } from "./ComponentVoucher/CheckBox";
import { useTranslation } from "react-i18next";
import TableVoucher from "./ComponentVoucher/TableVoucher";
import { ICFilter } from "@assets/iconElements/ICFIlter";

interface Props {
  refCheckboxAll?: Ref<HTMLInputElement>;
}

export const ColumnHeaders = (props: { title: string, icon?: ReactNode }) => {
  const { t } = useTranslation();
  return (
    <div className="text-start text-content font-bold text-normal flex flex-row gap-x-2 justify-start items-center">
      {t(props.title)}
      {props.icon}
    </div>
  )
}

function ManageVoucher(props: Props) {
  const { refCheckboxAll } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPage, listVoucher, totalElement, isloading, error } =
    useAppSelector((state) => state.vouchers);
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const [filterVoucher, setFilterVoucher] = useState<
    null | "FINISHED" | "HAPPENING" | "NOT_HAPPEN"
  >(null);
  const ListVoucherFilter = [
    {
      name: "Tất cả",
      activeKey: null,
    },
    {
      name: "Đang diễn ra",
      activeKey: "HAPPENING",
    },
    {
      name: "Sắp diễn ra",
      activeKey: "NOT_HAPPEN",
    },
    {
      name: "Kết thúc",
      activeKey: "FINISHED",
    },
  ];

  const [dataVoucher, setDataVoucher] = useState<IVoucher[]>([]);

  const handleEditVoucher = (id: string) => {
    navigate(`edit/${id.toString()}`);
  };

  const handleFilter = (value: null | "HAPPENING" | "NOT_HAPPEN" | "FINISHED") => {
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

  // useEffect(() => {
  //   const paramApi = {
  //     page: currentPage - 1,
  //     size: 5,
  //     status: filterVoucher,
  //   };
  //   dispatch(ThunkGetvoucher(paramApi));
  //   return () => {};
  // }, [currentPage, filterVoucher]);

  const getAllVoucher = async () => {
    const params = {
      page: currentPage - 1,
      size: 10,
      status: filterVoucher,
    };
    try {
      const res = await VoucherServices.getAllVoucher(params);
      if (res) {
        setDataVoucher(res.content)
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getAllVoucher();
  }, [])

  return (
    <div className="pt-9">
      <div className="flex items-center mb-2 gap-4 border-b-[2px] border-gray-200">
        {ListVoucherFilter.map((itemFilter, indexFilter) => {
          return (
            <ButtonFilter
              key={indexFilter}
              name={itemFilter.name}
              isActive={filterVoucher === itemFilter.activeKey}
              handleSubmit={() => handleFilter(itemFilter.activeKey as any)}
            />
          )
        })}
      </div>
      <div className="pt-10">
        <div className="flex justify-between items-center">
          <p className="text-normal2 font-bold font-NunitoSans text-grey-222124">
            Danh sách voucher đã tạo
          </p>
          <div className="flex gap-x-6">
            <button
              className="flex justify-center items-center gap-x-[10px] px-4 py-3 border-[1px] border-error-500 text-error-500 font-bold text-wap-regular2"
            >
              <ICDeleteTrashLight color={colors.error500} />
              <p>Xóa</p>
            </button>
            <button
              onClick={() => navigate("add")}
              className="flex justify-center items-center gap-x-[10px] px-4 py-3 border-[1px] border-main text-main font-bold text-wap-regular2"
            >
              <ICAdd />
              <p>Tạo voucher</p>
            </button>
          </div>

        </div>
      </div>
      <div className="flex flex-col pt-[30px] gap-y-7">
        <div className="flex flex-row">
          <button
            className="flex items-start"
          >
            <Checkbox onChange={() => { }} ref={refCheckboxAll} htmlFor="check-all" />
          </button>
          <div className="ml-[9px] h-10 flex-1 items-start justify-between grid grid-cols-[100px_1.5fr_90px_1fr_1fr_2fr_1.5fr] gap-x-2 font-semibold">
            <ColumnHeaders title="Mã voucher" />
            <ColumnHeaders title="Tên chương trình" />
            <ColumnHeaders title="Giảm giá" />
            <ColumnHeaders title="Tổng voucher" />
            <ColumnHeaders title="Lượt đã sử dụng" />
            <ColumnHeaders title="Trạng thái" icon={<ICFilter />} />
            <ColumnHeaders title="Thao tác" />
          </div>
        </div>
        <div className="flex flex-col gap-y-7">
          {(dataVoucher ?? []).map((it, idx) => {
            return (
              <div className="flex flex-row" key={idx}>
                <>
                  <button
                    className="flex items-start"
                  >
                    <Checkbox onChange={() => { }} ref={refCheckboxAll} htmlFor="check-all" />
                  </button>
                </>
                <TableVoucher
                  data={it}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div >

    // <div className=" pt-9 pb-10px">
    //   <h2 className="titlePage mb-9">Quản lý voucher</h2>
    //   <div className="flex items-center justify-end gap-2">
    //     <button
    //       className="btn-normal text-sm leading-18"
    //       onClick={() => navigate("add")}
    //     >
    //       Tạo voucher
    //     </button>
    //   </div>
    //   <div>
    //     <div className="flex items-center mb-2 gap-4">
    //       {ListVoucherFilter.map((itemFilter, indexFilter) => {
    //         return (
    //           <ButtonFilter
    //             key={indexFilter}
    //             name={itemFilter.name}
    //             isActive={filterVoucher === itemFilter.activeKey}
    //             handleSubmit={() => handleFilter(itemFilter.activeKey as any)}
    //           />
    //         );
    //       })}
    //     </div>
    //     {/* <div
    //       className={`h-1 absolute bg-main`}
    //     ></div> */}
    //     <div className="w-full h-[1px] bg-gray-200"></div>
    //   </div>

    //   <div></div>
    //   {dataVoucher.length > 0 ? (
    //     <div>

    //     </div>
    //     // <div className="mt-5">
    //     //   <table className="w-full">
    //     //     <thead>
    //     //       <tr>
    //     //         {ThVoucher.map((itemTh, IndexTh) => {
    //     //           return (
    //     //             <th
    //     //               key={IndexTh}
    //     //               className="text-main text-small font-normal text-center py-6 w-1/6"
    //     //             >
    //     //               {itemTh}
    //     //             </th>
    //     //           );
    //     //         })}
    //     //       </tr>
    //     //     </thead>
    //     //     <tbody>
    //     //       {listVoucher.map((itemVoucher, index) => {
    //     //         return (
    //     //           <tr key={itemVoucher.id}>
    //     //             <td className="text-main text-small font-normal text-center py-6">
    //     //               {itemVoucher.sku}
    //     //             </td>
    //     //             <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
    //     //               {itemVoucher.name}
    //     //             </td>
    //     //             <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
    //     //               {itemVoucher.moneyVoucher < 100
    //     //                 ? `${itemVoucher.moneyVoucher}% giảm`
    //     //                 : formatMoney(itemVoucher.moneyVoucher)}
    //     //             </td>
    //     //             <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
    //     //               {itemVoucher.total}
    //     //             </td>
    //     //             <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
    //     //               <p
    //     //                 className={
    //     //                   "text-small tracking-[.03] " +
    //     //                   (itemVoucher.status === "running"
    //     //                     ? "text-buttonSucces"
    //     //                     : itemVoucher.status === "end"
    //     //                       ? "text-main"
    //     //                       : "text-gray-200")
    //     //                 }
    //     //               >
    //     //                 {itemVoucher.status === "running"
    //     //                   ? "Đang diễn ra"
    //     //                   : itemVoucher.status === "end"
    //     //                     ? "Đã kết thúc"
    //     //                     : "Sắp diễn ra"}
    //     //               </p>
    //     //               <p className="text-small">
    //     //                 {dayFormat(itemVoucher.startTime, true)}
    //     //                 <br />

    //     //                 {dayFormat(itemVoucher.endTime, true)}
    //     //               </p>
    //     //             </td>
    //     //             <td className="text-center py-6 pl-7 tracking-[.03] px-3 font-normal">
    //     //               {(itemVoucher.status === "running" ||
    //     //                 itemVoucher.status === "before") && (
    //     //                   <button
    //     //                     onClick={() => handleEditVoucher(itemVoucher.id)}
    //     //                     className="text-small tracking-[.03] cursor-buttonointer text-center font-normal mb-2"
    //     //                   >
    //     //                     Chỉnh sửa
    //     //                   </button>
    //     //                 )}
    //     //               {itemVoucher.status === "end" && (
    //     //                 <button className="border-b border-b-mains text-main tracking-[.03]">
    //     //                   Kết thúc
    //     //                 </button>
    //     //               )}
    //     //             </td>
    //     //           </tr>
    //     //         );
    //     //       })}
    //     //     </tbody>
    //     //   </table>
    //     // </div>
    //   ) : (
    //     <div className="w-full text center h-screen flex items-center justify-center text-main">
    //       Không có Voucher nào!
    //     </div>
    //   )}

    //   {listVoucher.length > 0 && (
    //     <div className="mt-10">
    //       <Pagination
    //         currenPage={currentPage}
    //         setCurrentPage={(page: number) => dispatch(setCurrentPage(page))}
    //         total={Math.ceil(totalElement / 5)}
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

export default ManageVoucher;

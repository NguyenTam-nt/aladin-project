import { ArrowDownManageIcon, IconArrowDown, IconArrowUp, TrashCanIcon, TrashIconAdvice } from "@assets/icons";
import FormFeedBackContact from "@components/AdminComponents/FormFeedBackContact";
import Pagination from "@components/Pagination";
import { ToastContex } from "@contexts/ToastContex";
import { ModalContext } from "@contexts/contextModal";
import ContactServices from "@services/ContactServices";
import { some } from "@utility/helper";
import clsx from "clsx";
import ConfirmBox from "commons/ConfirmBox";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import { ContactType } from "commons/contannt";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageContact() {
  const navigator = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const [listContact, setListContact] = useState<ContactType[]>([]);
  const [listIdDelete, setListIdDelete] = useState<string[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currenPage, setCurrenPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<"WAITING" | "REPLIED" | null>(
    null
  );
  const [searchKey, setsearchKey] = useState("");
  const [sortFilter, setSortFilter] = useState<"asc" | "desc">("desc");
  const handleSearch = (e: any) => {
    setsearchKey(e.target.value);
  };
  const handleFilter = (value: "asc" | "desc") => {
    setCurrenPage(1);
    navigator("");
    setSortFilter(value);
  };
  const handleAddManyId = () => {
    if (listContact.length > 0 && listIdDelete.length !== listContact.length) {
      const newListId = listContact.map((item) => {
        return item.id;
      });
      setListIdDelete(newListId);
      return;
    }
    setListIdDelete([]);
    return;
  };
  const handleAdIdDelete = (id: string) => {
    const checkIdAlready = listIdDelete.includes(id);
    if (checkIdAlready) {
      const newListId = listIdDelete.filter((item) => {
        return item != id;
      });
      setListIdDelete(newListId);
    } else {
      setListIdDelete([...listIdDelete, id]);
    }
  };
  const onDeletConcats = async () => {
    try {
      if (listIdDelete.length > 0) {
        console.log(listIdDelete)
        await ContactServices.deleteManyContact(listIdDelete);
        onAddToast({
          type: "success",
          message: `Đã xóa ${listIdDelete.length} mục tư vấn.`,
        });
        navigator("");
        setListIdDelete([]);
        currenPage != 1 && setCurrenPage(1);
        setSortFilter("asc");
        getListContact({
          page: 0,
          size: 10,
          status: statusFilter,
          sort: ["createAt", sortFilter],
        });
      }
      setShowModal(false);
      return;
    } catch (error) {
      onAddToast({
        type: "error",
        message: "Có lỗi không thể xóa tư vấn",
      });
      setShowModal(false);
    }
  };

  const handleSetData = (value: ContactType) => {
    const newState = listContact.map((item) => {
      if (item.id == value.id) {
        item = value;
      }
      return item;
    });
    setListContact(newState);
  };

  const handleShowFormFeedBack = (items: ContactType) => {
    setShowModal(true);
    setContentModal(
      <FormFeedBackContact item={items} handleForm={handleSetData} />
    );
  };
  const handleShowConfirmDelete = () => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        handleConfirm={onDeletConcats}
        enableIcon={true}
        typeBox="WARNING"
        message="Bạn có chắc chắn xóa yêu cầu tư vấn này khỏi hệ thống?"
      />
    );
  };

  const showModalConfirm = async (data: ContactType) => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        handleConfirm={() => {
          changeStatusContact(data);
        }}
        enableIcon={false}
        typeBox="SUCCESS"
        message="Bạn có chắc chắn chuyển trạng thái  yêu cầu tư vấn này sang"
        messageHightLight={"Đã phản hồi"}
        noteMessage="Lưu ý: Bạn sẽ không đổi từ trạng thái Đã phản hồi sang Chưa phản hồi."
      />
    );
    // setShowModal(false);
  };
  const getListContact = async (param: some) => {
    const result = await ContactServices.getContactFilter(param);
    const { total, data, status } : any = result;
    setListContact(data);
    setTotalPage(Math.ceil(total / 10));
    return result;
  };
  const changeStatusContact = async (data: ContactType) => {
    try {
      const newData = { ...data, status: !data.status };
      const putted : any = await ContactServices.put(data.id, newData);
      if (putted) {
        const newContact = listContact.map((item) => {
          if (item.id == putted.id) {
            item = putted;
          }
          return item;
        });
        setListContact(newContact);
        setShowModal(false);
        onAddToast({
          type: "success",
          message: "Đã thay đổi trạng thái phản hồi.",
        });
      }
    } catch (error) {
      setShowModal(false);
      console.log("putted", "error");
      onAddToast({
        type: "error",
        message: "Có lỗi thử lại sau.",
      });
    }
  };

  const handleFilterByStatus = () => {
    setCurrenPage(1);
    navigator("");
  };
  useEffect(() => {
    const param = {
      page: currenPage - 1,
      size: 10,
      status: statusFilter,
      sort: ["createAt", sortFilter],
    };
    getListContact(param);
    return () => { };
  }, [currenPage, sortFilter, statusFilter]);

  return (
    <div className="px-10">

      <div className="flex justify-between items-center h-[40px] gap-4 my-2 mt-20">
        <h3 className="text-title font-semibold text-main">
          Danh sách yêu cầu tư vấn
        </h3>
        <div className="flex items-center gap-2">
          <div>
            <button
              onClick={handleShowConfirmDelete}
              disabled={listIdDelete.length === 0}
              className={
                "w-fit h-full  border-[#E00] border-[1px] font-bold text-[#E00] px-5 py-3  flex items-center gap-1 " +
                (listIdDelete.length === 0
                  ? "cursor-not-allowed bg-inherit"
                  : "cursor-pointer bg-white")
              }
            >
              <TrashIconAdvice  /> Xóa
            </button>
          </div>
          <div
            onClick={() => handleFilter("desc")}
            className="w-fit h-full hover:cursor-pointer text-main text-normal1 px-5 py-3 border-main border-[1px] font-bold flex items-center gap-1"
          >
            <IconArrowUp /> Mới nhất
          </div>
          <div
            onClick={() => handleFilter("asc")}
            className="w-fit h-full hover:cursor-pointer text-main text-normal1 px-5 py-3  border-main border-[1px] font-bold flex items-center gap-1"
          >
            <IconArrowDown  /> Cũ nhất
          </div>
        </div>
      </div>

      <div className=" ">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-4 w-7">
                <div className="flex items-center justify-start">
                  <InputChecboxElement
                    isCheck={
                      listContact.length > 0 &&
                      listIdDelete.length === listContact.length
                    }
                    name={"checkAll"}
                    onHandleChange={handleAddManyId}
                    sizeBox="w-4 h-4 rounded-[4px]"
                  />
                </div>
              </th>
              <th className="text-start text-black text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Họ và tên
              </th>
              <th className="text-start text-black text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Số điện thoại
              </th>
              <th className="text-start text-black text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Email
              </th>
              <th className="text-start text-black text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Địa chỉ
              </th>
              <th className="text-start text-black text-wap-regular2 px-4 py-4 whitespace-nowrap max-w-[300px]">
                Nội dung
              </th>
              <th className="text-center text-black text-wap-regular2 px-4 py-4 whitespace-nowrap status-icon cursor-pointer">
                <div className="flex items-center gap-2 justify-center relative ">
                  Trạng thái

                  {/*Icon filter*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={statusFilter ? "black" : "none"}>
                    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <div className="w-[100%] border-main absolute top-[150%] z-40 bg-white statusBox right-2/4 translate-x-[50%]">
                    <div
                      onClick={() => {
                        setStatusFilter("REPLIED");
                        handleFilterByStatus();
                      }}
                      className={clsx(
                        "w-full h-auto py-3 px-3 text-small cursor-pointer  text-black",
                        { "bg-main text-white": statusFilter == "REPLIED" }
                      )}
                    >
                      Đã phản hồi
                    </div>
                    <div
                      onClick={() => {
                        setStatusFilter("WAITING");
                        handleFilterByStatus();
                      }}
                      className={clsx(
                        "w-full h-auto py-3 px-3 text-small cursor-pointer  text-black",
                        { "bg-main text-white": statusFilter == "WAITING" }
                      )}
                    >
                      Chưa phản hồi
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {listContact.map((itemContact, indexContact) => {
              return (
                <tr
                  key={indexContact}
                  className=" h-[50px]"
                >
                  <td className="border-b text-center px-4 py-6  text-wap-regular2">
                    <div className="flex items-center justify-start">
                      <InputChecboxElement
                        isCheck={listIdDelete.includes(itemContact.id)}
                        name={itemContact.id + "Input"}
                        onHandleChange={() => handleAdIdDelete(itemContact.id)}
                        sizeBox="w-4 h-4 rounded-[4px]"
                      />
                    </div>
                  </td>
                  <td
                    className="border-b px-4 py-6 text-wap-regular2 "
                    onClick={() => handleShowFormFeedBack(itemContact)}
                  >
                    <p className="text-start"> {itemContact.fullName}</p>
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border-b px-4 py-6 text-wap-regular2"
                  >
                    {itemContact.phoneNumber}
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border-b px-4 py-6 text-wap-regular2"
                  >
                    {itemContact.email}
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border-b px-4 py-6 text-wap-regular2"
                  >
                    {itemContact.address}
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border-b px-4 py-6 text-wap-regular2 max-w-[300px]"
                  >
                    {itemContact.content}
                  </td>
                  <td
                    className={clsx(
                      "border-b px-4  text-wap-regular2  whitespace-nowrap font-semibold",
                      {
                        "text-[#5CD931] no-underline": (itemContact.status === "REPLIED"),
                        "text-[#E73F3F]": !(itemContact.status === "REPLIED"),
                      }
                    )}
                  >
                    <div className="flex items-center ">
                      <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="6" fill={(itemContact.status === "REPLIED") ? "#5CD931" : "#E73F3F"} />
                      </svg>
                      <p
                        onClick={() =>
                          !(itemContact.status === "REPLIED") && showModalConfirm(itemContact)
                        }
                        className={clsx({
                          "cursor-pointer underline underline-offset-[1px]": !(itemContact.status === "REPLIED"),
                        })}
                      >
                        {itemContact.status === "REPLIED" ? "Đã phản hồi" : "Chưa phản hồi"}
                      </p>
                    </div>
                    {(itemContact.status === "REPLIED") &&
                      <span className="text-[#A1A0A3] text-[13px] font-normal ml-4 no-underline">Bởi AI đấy</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPage > 1 && (
        <div className="flex justify-end pb-[50px] pt-[50px] text-background-100">
          <Pagination
            currenPage={currenPage}
            setCurrentPage={setCurrenPage}
            total={totalPage}
          />
        </div>
      )}
    </div>
  );
}

export default ManageContact;

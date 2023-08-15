import { ArrowDownManageIcon, TrashCanIcon } from "@assets/icons";
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

const contactDatas: some[] = [
  {
    id: 1,
    name: "Nguyen Manh Cuong",
    phone: "0123456789",
    email: "cuongnm@aladintech.co",
    content: "Nhận tư vấn về áo thun cho mùa hè nóng nực.",
    feedback:
      "Chúng tôi có đa dạng đầy đủ các mặt hằng về áo thun, bạn có thể lên website để xem",
    status: 1,
    date: "22/11/2022",
  },
  {
    id: 2,
    name: "Nguyen Manh Cuong",
    phone: "0123456789",
    email: "cuongnm@aladintech.co",
    content: "Nhận tư vấn về áo thun cho mùa hè nóng nực.",
    feedback:
      "Chúng tôi có đa dạng đầy đủ các mặt hằng về áo thun, bạn có thể lên website để xem",
    status: 0,
    date: "22/11/2022",
  },
  {
    id: 3,
    name: "Nguyen Manh Cuong",
    phone: "0123456789",
    email: "cuongnm@aladintech.co",
    content: "Nhận tư vấn về áo thun cho mùa hè nóng nực.",
    feedback:
      "Chúng tôi có đa dạng đầy đủ các mặt hằng về áo thun, bạn có thể lên website để xem",
    status: 1,
    date: "22/11/2022",
  },
  {
    id: 4,
    name: "Nguyen Manh Cuong",
    phone: "0123456789",
    email: "cuongnm@aladintech.co",
    content: "Nhận tư vấn về áo thun cho mùa hè nóng nực.",
    feedback:
      "Chúng tôi có đa dạng đầy đủ các mặt hằng về áo thun, bạn có thể lên website để xem",
    status: 0,
    date: "22/11/2022",
  },
  {
    id: 5,
    name: "Nguyen Manh Cuong",
    phone: "0123456789",
    email: "cuongnm@aladintech.co",
    content: "Nhận tư vấn về áo thun cho mùa hè nóng nực.",
    feedback:
      "Chúng tôi có đa dạng đầy đủ các mặt hằng về áo thun, bạn có thể lên website để xem",
    status: 0,
    date: "22/11/2022",
  },
  {
    id: 6,
    name: "Nguyen Manh Cuong",
    phone: "0123456789",
    email: "cuongnm@aladintech.co",
    content: "Nhận tư vấn về áo thun cho mùa hè nóng nực.",
    feedback:
      "Chúng tôi có đa dạng đầy đủ các mặt hằng về áo thun, bạn có thể lên website để xem",
    status: 0,
    date: "22/11/2022",
  },
];

function ManageContact() {
  const navigator = useNavigate();
  const { onAddToast } = useContext(ToastContex);
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const [listContact, setListContact] = useState<ContactType[]>([]);
  const [listIdDelete, setListIdDelete] = useState<string[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currenPage, setCurrenPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<"true" | "false" | null>(
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
          size: 7,
          status: statusFilter,
          sort: ["createdAt", sortFilter],
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
    const { total, data, status } = result.data;
    setListContact(data);
    setTotalPage(Math.ceil(total / 7));
    return result;
  };
  const changeStatusContact = async (data: ContactType) => {
    try {
      const newData = { ...data, status: !data.status };
      const putted = await ContactServices.put(data.id, newData);
      if (putted.data) {
        const newContact = listContact.map((item) => {
          if (item.id == putted.data.id) {
            item = putted.data;
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
      size: 7,
      status: statusFilter,
      sort: ["createdAt", sortFilter],
    };
    getListContact(param);
    return () => {};
  }, [currenPage, sortFilter, statusFilter]);
  return (
    <div className="">
      <h3 className="text-title font-semibold text-main mt-9">
        Quản lý yêu cầu tư vấn
      </h3>
      <div className="my-7 flex justify-end items-center h-[40px] gap-4">
        <div className="flex items-center gap-2">
          <div>
            <button
              onClick={handleShowConfirmDelete}
              disabled={listIdDelete.length === 0}
              className={
                "w-fit h-full  border-main border-[1px] text-normal text-main px-3 py-2 rounded-md flex items-center gap-1 " +
                (listIdDelete.length === 0
                  ? "cursor-not-allowed bg-white"
                  : "cursor-pointer bg-[#FFEDE1]")
              }
            >
              <TrashCanIcon width={18} /> Xóa
            </button>
          </div>
          <div
            onClick={() => handleFilter("desc")}
            className="w-fit h-full hover:cursor-pointer text-black text-normal1 px-3 py-2 border border-background-200  rounded-md flex items-center gap-1"
          >
            <ArrowDownManageIcon /> Mới nhất
          </div>
          <div
            onClick={() => handleFilter("asc")}
            className="w-fit h-full hover:cursor-pointer text-black text-normal1 px-3 py-2 border border-background-200  rounded-md flex items-center gap-1"
          >
            <ArrowDownManageIcon /> Cũ nhất
          </div>
        </div>
      </div>

      <div className="rounded-md border ">
        <table className=" rounded-md bg-white w-full border-collapse border ">
          <thead>
            <tr>
              <th className="border text-center px-4 py-4">
                <div className="flex items-center justify-center pl-18px">
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
              <th className="border text-center text-main text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Họ và tên
              </th>
              <th className="border text-center text-main text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Số điện thoại
              </th>
              <th className="border text-center text-main text-wap-regular2 px-4 py-4 whitespace-nowrap">
                Email
              </th>
              <th className="border text-center text-main text-wap-regular2 px-4 py-4 whitespace-nowrap max-w-[300px]">
                Nội dung cần được tư vấn
              </th>
              <th className="border text-center text-main text-wap-regular2 px-4 py-4 whitespace-nowrap status-icon cursor-pointer">
                <div className="flex items-center gap-2 justify-center relative ">
                  Trạng thái
                  <div className="w-1 h-1 border-4 border-t-transparent border-l-transparent border-main  -rotate-45 "></div>
                  <div className="w-full border border-main rounded-md absolute top-[150%] z-40 bg-white statusBox right-2/4 translate-x-[50%]">
                    <div
                      onClick={() => {
                        setStatusFilter("true");
                        handleFilterByStatus();
                      }}
                      className={clsx(
                        "w-auto hauto py-2 px-3 text-small cursor-pointer rounded-t-md text-black",
                        { "bg-gray-100": statusFilter == "true" }
                      )}
                    >
                      Đã phản hồi
                    </div>
                    <div
                      onClick={() => {
                        setStatusFilter("false");
                        handleFilterByStatus();
                      }}
                      className={clsx(
                        "w-full hauto py-2 px-3 text-small cursor-pointer rounded-b-md text-black",
                        { "bg-gray-100": statusFilter == "false" }
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
                  className={clsx({
                    "bg-gray-100 -mx-[1px] ": indexContact % 2 == 0,
                  })}
                >
                  <td className="border text-center px-4 py-6  text-wap-regular2 ">
                    <div className="flex items-center justify-center pl-18px">
                      <InputChecboxElement
                        isCheck={listIdDelete.includes(itemContact.id)}
                        name={itemContact.id + "Input"}
                        onHandleChange={() => handleAdIdDelete(itemContact.id)}
                        sizeBox="w-4 h-4 rounded-[4px]"
                      />
                    </div>
                  </td>
                  <td
                    className="border px-4 py-6 text-main text-wap-regular2 "
                    onClick={() => handleShowFormFeedBack(itemContact)}
                  >
                    <p className="text-center"> {itemContact.fullName}</p>
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border px-4 py-6 text-wap-regular2"
                  >
                    {itemContact.phoneNumber}
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border px-4 py-6 text-wap-regular2"
                  >
                    {itemContact.email}
                  </td>
                  <td
                    onClick={() => handleShowFormFeedBack(itemContact)}
                    className="border px-4 py-6 text-wap-regular2 max-w-[300px]"
                  >
                    {itemContact.content}
                  </td>
                  <td
                    className={clsx(
                      "border px-4 py-6 text-wap-regular2 underline underline-offset-[7px] whitespace-nowrap font-semibold",
                      {
                        "text-[#5CD931] no-underline": itemContact.status,
                        "text-main": !itemContact.status,
                      }
                    )}
                  >
                    <p
                      onClick={() =>
                        !itemContact.status && showModalConfirm(itemContact)
                      }
                      className={clsx({
                        "cursor-pointer": !itemContact.status,
                      })}
                    >
                      {itemContact.status ? "Đã phản hồi" : "Chưa phản hồi"}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPage > 1 && (
        <div className=" pb-[50px] pt-[50px] text-background-100">
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

import {
  CloseButtonIconGray
} from "@assets/icons";
import ContactItem from "@components/AdminComponents/PopupContact/ContactItem";
import LoadingScreen from "@components/LoadingScreen";
import { ModalContext } from "@contexts/contextModal";
import { ToastContex } from "@contexts/ToastContex";
import { DataContactPage } from "@services/ContactServices";
import SupportOnlineServices, { SupportOnlineInfo } from "@services/SupportOnlineServices";
import ConfirmBox from "commons/ConfirmBox";
import { useCallback, useContext, useEffect, useState } from "react";
import FormContact from "../../components/AdminComponents/FormContact";

function ItemRender({
  item,
  ...rest
}: {
  item: SupportOnlineInfo
  [x: string]: any
}) {
  const ContactItemRender = useCallback(() => {
    return (
      <ContactItem
        item={item}
        {...rest}
      />
    )
  }, [item])

  return <ContactItemRender />
}

function ManagePopupContact() {
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const [valueContact, setValueContact] = useState<Array<SupportOnlineInfo>>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const { onAddToast } = useContext(ToastContex);

  const handleDeleteNews = async (id: string) => {
    try {
      const response = await SupportOnlineServices.delete(id)
      if (response.status == 200) {
        const contacts = valueContact.filter(item => item.id != id)
        setValueContact(contacts)
        onAddToast({ type: "success", message: `Xoá thành công` });
        return
      }
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } catch (ex) {
      console.log(ex)
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } finally {
      setShowModal(false)
    }
  }

  const handleDeleteContact = (id: string) => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        typeBox="WARNING"
        message="Bạn có chắc chắn muốn xóa thông tin liên hệ này khỏi hệ thống?"
        handleConfirm={() => handleDeleteNews(id)}
      />
    );
  };

  const handleShowFormContact = (data?: DataContactPage) => {
    setShowModal(true);
    if (data) {
      setContentModal(
        <FormContact {...data} setValueContact={setValueContact} valueContact={valueContact} />
      );
      return;
    }
    setContentModal(<FormContact setValueContact={setValueContact} valueContact={valueContact} />);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await SupportOnlineServices.get()
        if (response.status == 200) {
          const data = response.data.data
          setValueContact(data)
        }
      } catch (ex) {
        console.log(ex)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  if (loading) return <LoadingScreen />

  return (
    <div className="pt-9 pb-10px flex-1 xl:pl-8">
      <h2 className="titlePage mb-10">Danh sách thông tin liên hệ</h2>
      <div className="flex flex-col gap-[22px] w-[500px]">
        {valueContact && valueContact.map((item, index) => {
          return (
            <ItemRender
              key={index}
              item={item}
              handleShowFormContact={handleShowFormContact}
              handleDeleteContact={handleDeleteContact}
            />
          );
        })}
        <div>
          <button
            className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
            onClick={() => handleShowFormContact()}
          >
            <CloseButtonIconGray fill="#F45538" className="text-main mr-3" />
            Thêm thông tin liên hệ
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagePopupContact;

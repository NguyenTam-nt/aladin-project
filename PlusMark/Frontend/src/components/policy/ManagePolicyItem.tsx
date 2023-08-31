import { DeleteManageIcon, PenIcon } from "@assets/icons";
import DeleteModal from "@components/Modal/DeleteModal";
import { ModalContext } from "@contexts/contextModal";
import { ToastContex } from "@contexts/ToastContex";
import { Policy } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface Props {
  policy: Policy,
  policies: Policy[],
  setPolicies: React.Dispatch<React.SetStateAction<Policy[]>>
}

function ManagePolicyItem(props: Props) {
  const { policy, setPolicies, policies } = props
  const { setContentModal, setShowModal, closeModal } = useContext(ModalContext);
  const { onAddToast } = useContext(ToastContex);

  const handleDeletePolicys = async () => {
    try {
      await PolicyServices.delete(policy.id)
      const newPolicies = policies.filter(item => item.id != policy.id)
      setPolicies(newPolicies)
      return onAddToast({ type: "success", message: `Xoá thành công` });
    } catch (ex) {
      console.log(ex)
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } finally {
      closeModal()
    }
  };

  const showModalConfirmDelete = () => {
    setContentModal(
      <DeleteModal
        text="Bạn có chắc chắn xóa chính sách này khỏi hệ thống?"
        handleDelete={handleDeletePolicys}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="flex gap-36 border-solid bg-white  mb-4">
      <div className="flex-1 w m-4">
        <div className="flex-1 flex flex-col justify-between">
          <div className="h-[130px]">
            <h3 className="text-normal2 font-bold line-clamp-1 pb-1">
              {policy.title}
            </h3>
            <div className="mt-4 text-normal1 text-[#303030] line-clamp-3 mb-5" dangerouslySetInnerHTML={{ __html: policy.describe }} />
          </div>
          <Link to={`edit/${policy.id}`} className="hover:cursor-pointer border-solid border-2 border-[#0073E5] font-bold text-[#0073E5] text-center py-5 mb-5">
            Sửa chính sách
          </Link>
          <div className="hover:cursor-pointer border-solid border-2 border-[#E73F3F] font-bold text-[#E73F3F] text-center py-5" onClick={showModalConfirmDelete}>
            Xóa chính sách
          </div>
        </div>
      </div>
      {/* <div className="flex gap-2 items-start mt-2">
        <Link to={`edit/${policy.id}`} className="hover:cursor-pointer ">
          <PenIcon className="hover:fill-main" />
        </Link>
        <div className="hover:cursor-pointer" onClick={showModalConfirmDelete}>
          <DeleteManageIcon className="hover:stroke-main" />
        </div>
      </div> */}
    </div>
  );
}

export default ManagePolicyItem;

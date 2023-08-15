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
      const response = await PolicyServices.delete(policy.id)
      if (response.status == 200) {
        const newPolicies = policies.filter(item => item.id != policy.id)
        setPolicies(newPolicies)
        onAddToast({ type: "success", message: `Xoá thành công` });
        return
      }
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
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
    <div className="flex gap-36 border-b-[1px] border-b-gray-200 border-transparent mb-4">
      <div className="flex-1 w mb-4">
        <div className="flex-1 flex flex-col justify-between">
          <div className="">
            <h3 className="text-normal2 font-bold line-clamp-1 pb-1 border-b-main border-b-[1px] border-transparent">
              {policy.title}
            </h3>
            <div className="mt-4 text-normal1 text-[#303030] line-clamp-3" dangerouslySetInnerHTML={{ __html: policy.describe }} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-start mt-2">
        <Link to={`edit/${policy.id}`} className="hover:cursor-pointer ">
          <PenIcon className="hover:fill-main" />
        </Link>
        <div className="hover:cursor-pointer" onClick={showModalConfirmDelete}>
          <DeleteManageIcon className="hover:stroke-main" />
        </div>
      </div>
    </div>
  );
}

export default ManagePolicyItem;

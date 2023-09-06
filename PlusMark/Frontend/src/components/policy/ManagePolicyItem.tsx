import { DeleteManageIcon, PenIcon } from "@assets/icons";
import DeleteModal from "@components/Modal/DeleteModal";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { useShowConfirm } from "@components/Modal/DiglogComfirm";
import { ModalContext } from "@contexts/contextModal";
import { ToastContex } from "@contexts/ToastContex";
import useI18n from "@hooks/useI18n";
import { Policy, PolicyWithLang } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface Props {
  policy: PolicyWithLang,
  policies: PolicyWithLang[],
  setPolicies: React.Dispatch<React.SetStateAction<PolicyWithLang[]>>
}

function ManagePolicyItem(props: Props) {
  const { policy, setPolicies, policies } = props
  const { setContentModal, setShowModal, closeModal } = useContext(ModalContext);
  const { onAddToast } = useContext(ToastContex);
  const { t, lang } = useI18n();
  const { showConfirm } = useShowConfirm();
  const { showError, showSuccess, showWarning } = useShowMessage();

  const deleteItem = async (id: string) => {
    try {
      const deleted = await PolicyServices.delete(id);
      showSuccess("success.deleted");
      const newPolicies = policies.filter(item => item.id != policy.id)
      setPolicies(newPolicies)
    } catch (error) {
      showError("error.deleted_error");
    }
  };

  const showModalConfirmDelete = async (id: string) => {
    showConfirm("confirm.delete_policy", () => deleteItem(id));
  };

  return (
    <div className="flex gap-36 border-solid border-[1px] bg-white  mb-4">
      <div className="flex-1 w m-4">
        <div className="flex-1 flex flex-col justify-between">
          <div className="h-[130px]">
            <h3 className="text-normal2 font-bold line-clamp-1 pb-1">
              {lang === 'ksl' ? policy.titleKr: policy.titleVn}
            </h3>
            <div className="mt-4 text-normal1 text-[#303030] line-clamp-3 mb-5" dangerouslySetInnerHTML={{ __html: `${lang === 'ksl' ? policy.describeKr: policy.describeVn}` }} />
          </div>
          <Link to={`edit/${policy.id}`} className="hover:cursor-pointer border-solid border-2 border-[#0073E5] font-bold text-[#0073E5] text-center py-5 mb-5">
            {t("text.title.title_edit_policy")}
          </Link>
          <div className="hover:cursor-pointer border-solid border-2 border-[#E73F3F] font-bold text-[#E73F3F] text-center py-5" onClick={() => showModalConfirmDelete(policy.id)}>
          {t("text.title.title_delete_policy")}
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

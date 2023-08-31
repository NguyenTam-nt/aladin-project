import PlusLinerIcon from "@assets/iconElements/PlusLinerIcon";
import useI18n from "@hooks/useI18n";
import CategoryList from "./CategoryList";
import categoryServices from "@services/categoryService";
import { useContext, useEffect, useState } from "react";
import { CategoryType } from "@services/Types/category";
import { useShowConfirm } from "@components/Modal/DiglogComfirm";
import LinearButton from "@components/Buttons/LinearButton";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { ModalContext } from "@contexts/contextModal";
import EditCategory from "./EditCategory";

const ManagerCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { showConfirm } = useShowConfirm();
  const { showError, showSuccess, showWarning } = useShowMessage();
  const { setShowModal, closeModal, setContentModal } =
    useContext(ModalContext);
  const { t } = useI18n();
  const getCategory = async () => {
    try {
      const result = await categoryServices.getAllCategory();
      setCategories(result);
    } catch (error) {}
  };
  const deleteItem = async (id: number) => {
    try {
      const deleted = await categoryServices.deleteCategory(id);
      showSuccess("success.deleted");
    } catch (error) {
      showError("error.deleted_error");
    }
  };
  const handleDelete = async (id: number) => {
    showConfirm("confirm.delete_category", () => deleteItem(id));
  };

  const handleAddCategory = () => {
    setContentModal(<EditCategory />);
    setShowModal(true);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="py-14">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold leading-[150%]">
          {t("text.title.category")}
        </p>
        <LinearButton
          text="button.add_category"
          iconLeft={<PlusLinerIcon />}
          className="w-[170px] h-12"
          onClick={handleAddCategory}
        />
      </div>

      <div className="pt-10">
        {categories.length > 0 ? (
          <CategoryList category={categories} onDelete={handleDelete} />
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
};

export default ManagerCategory;

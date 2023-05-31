import { ICEdit } from "@assets/icons/ICEdit";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { InputSwitch } from "@components/InputSwitch";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ModalCreateCategory } from "./ModalCreateCategory";
import type { ICategory } from "@typeRules/news";
import { newsService } from "@services/newsService";
import { PopUpContext } from "@contexts/PopupContext";
import { PAGE_SIZE } from "@constants/contain";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "@components/Loading";

export const CategoryDocuments = () => {
  const { t } = useContext(TranslateContext);
  const { showSuccess, showError } = useContext(PopUpContext);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { setElementModal, hideModal } = useContext(ModalContext);
  const [total, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowModal = () => {
    setElementModal(<ModalCreateCategory type="ADD" onSubmit={handleSubmit} />);
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategories(0);
    }
  }, []);

  const getCategories = useCallback(
    (page: number) => {
      setLoading(true);
      newsService
        .getParent({ sort: "id,desc", page, size: PAGE_SIZE })
        .then((data) => {
          setCategories([...categories, ...data.data]);
          setTotalPage(data.total);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [categories]
  );

  const totalPages = useMemo(() => {
    return Math.ceil(total / PAGE_SIZE);
  }, [total]);

  const handleSubmit = (data: ICategory) => {
    newsService
      .postCategory(data)
      .then((data) => {
        setCategories([data, ...categories]);
        showSuccess("message.success._success");
      })
      .catch(() => {
        showError("message.error._error");
      })
      .finally(() => {
        hideModal();
      });
  };

  const handleSubmitEdit = (data: ICategory) => {
    newsService
      .putCategory(data)
      .then((data) => {
        const newCategory = [...categories];
        const index = newCategory.findIndex((item) => item.id === data.id);
        newCategory.splice(index, 1, data);
        setCategories([...newCategory]);
        showSuccess("message.success._success");
      })
      .catch(() => {
        showError("message.error._error");
      })
      .finally(() => {
        hideModal();
      });
  };

  const handleDelete = (id: number) => {
    newsService
      .deleteCategory(id)
      .then(() => {
        const index = categories.findIndex((item) => item.id === id);
        const newlist = [...categories];
        newlist.splice(index, 1);
        setCategories([...newlist]);
        showSuccess("message.success._success");
      })
      .catch(() => {
        showError("message.error._error");
      });
  };

  const fechData = () => {
    if (currentPage <= totalPages) {
      getCategories(currentPage + 1);
      setCurrentPage((page) => page + 1);
    }
  };

  return (
    <>
      <HeaderAdmin title="admin.documents._category.title" />
      <div className="flex items-center">
        <SubHeaderTopic title="admin.documents._category.title" />
        <Button
          onClick={handleShowModal}
          imageLeft={
            <span className="mr-2">
              <ICPlus color={Colors.secondary} />
            </span>
          }
          className="max-w-[180px] border border-secondary"
          text="admin.documents._category._btn_create"
          color="empty"
        />
      </div>

      <InfiniteScroll
        hasMore
        loader={loading ? <Loading /> : <></>}
        next={fechData}
        dataLength={categories.length}
      >
        <>
          <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_18 font-semibold text-text_primary pb-[16px] border-b border-br_E9ECEF ">
            <div>{t("admin.documents._category._table._name")}</div>
            <div>{t("admin.documents._category._table._name_child")}</div>
            <div>{t("admin.documents._category._table._func")}</div>
          </div>
          {categories.map((item) => {
            return (
              <CategoryItem
                onSubmitEdit={handleSubmitEdit}
                onDelete={handleDelete}
                value={item}
                key={item.id}
              />
            );
          })}
        </>
      </InfiniteScroll>
    </>
  );
};
type Props = {
  value: ICategory;
  onDelete: (id: number) => void;
  onSubmitEdit: (data: ICategory) => void;
};

const CategoryItem = memo(({ value, onSubmitEdit }: Props) => {
  const { isVn } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);
  // const handleShowModal = () => {
  //   setElementModal(
  //     <DialogConfirmDelete
  //       onClick={handleDelete}
  //       message={t("admin._notice._delete_category")}
  //     />
  //   );
  // };

  const handleShowModalEdit = () => {
    setElementModal(
      <ModalCreateCategory type="EDIT" data={value} onSubmit={onSubmitEdit} />
    );
  };

  // const handleDelete = () => {
  //   console.log({ value });
  //   if (value?.id) onDelete(value.id);
  // };

  const handleChangeStatusEdit = (event: ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    onSubmitEdit({
      ...value,
      status: isSelected,
    });
  };

  return (
    <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_14 text-text_primary py-[28px] border-b border-br_E9ECEF ">
      <div>{isVn ? value.name : value.nameKo}</div>
      <div>
        {value.children
          ? value.children
              .map((item) => (isVn ? item.name : item.nameKo))
              .join(", ")
          : ""}
      </div>
      <div className="flex items-center gap-x-[12px]">
        <InputSwitch
          checked={value.status ? true : false}
          onChange={handleChangeStatusEdit}
        />
        <button onClick={handleShowModalEdit}>
          <ICEdit />
        </button>
        {/* <button onClick={handleShowModal}>
          <ICClear />
        </button> */}
      </div>
    </div>
  );
});

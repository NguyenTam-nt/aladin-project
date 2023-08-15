import { NextPageIcon, TrashCanIcon } from "@assets/icons";
import { ToastContex } from "@contexts/ToastContex";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import categoryServices from "@services/categoryService";
import { ROUTES } from "@utility/constants";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import { RootCategory } from "commons/contannt";
import { UIEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkgetAllCategory } from "redux/thunk/categoryAction";

interface Props {}
function CategoryEdit(props: Props) {
  const { id } = useParams();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { onAddToast } = useContext(ToastContex);
  const [isDisable, setDisable] = useState<boolean>(false);
  const [ishowCateBox, setShowCateBox] = useState<boolean>(false);
  const [nameCategory, setNameCategory] = useState<string>("--lựa chọn--");
  const { categorylist, totalElement } = useAppSelector(
    (state) => state.categories
  );
  const [page, setPage] = useState<number>(
    Math.ceil(categorylist.length / 10) || 0
  );
  const [formData, setFormData] = useState<any>({
    parentSId: null,
    categoryName: "",
  });
  const CategoryRef = useRef<HTMLDivElement>(null);
  const handleValueInput = (valuInput: { name: string; value: string }) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [valuInput.name]: valuInput.value,
      };
    });
  };
  const handleSave = async () => {
    try {
      if (formData.name === "") {
        return;
      }
      setDisable(true);
      if (id) {
        const puted = await categoryServices.addOrEditCategory(formData, id);
        setFormData(puted);
        onAddToast({
          type: "success",
          message: "Sửa danh mục thành công",
        });
        setDisable(false);
        return;
      }
      const added = await categoryServices.addOrEditCategory(formData);
      if (added) {
        onAddToast({
          type: "success",
          message: "Thêm danh mục thành công",
        });
      }
      setFormData({
        parentSId: 0,
        categoryName: "",
      });
      setNameCategory("--lựa chọn--");
      setDisable(false);
    } catch (error) {
      onAddToast({
        type: "error",
        message: "Có lỗi không thể sửa danh mục.",
      });
      setDisable(false);
    }
  };
  const handleCancel = () => {
    navigator(`/admin/${ROUTES.admin.cartegory.index}`);
  };
  const getCategory = async (id: string | number) => {
    try {
      const result = await categoryServices.getCategoryById(id);
      if (result) {
        setFormData({
          ...result,
        });
        if (result.parentId) {
          const getParent = await categoryServices.getCategoryById(
            result.parentSId!
          );
          setNameCategory(getParent.categoryName);
        }
      }
    } catch (error) {
      onAddToast({ type: "error", message: "Không thể lấy được dữ liệu." });
    }
  };
  const handleChoseCategory = (value: {
    parent: RootCategory;
    endChild?: boolean;
    indexChildItself?: number;
  }) => {
    const { parent, endChild, indexChildItself = 0 } = value;
    if (endChild) {
      onAddToast({ type: "error", message: "Danh mục tối đa 3 cấp." });
      return;
    }
    if (id && +id !== parent.categorySId) {
      let lengCurrentCategory = 1;
      let lengParentCategory = 1;
      if (formData.children[0]) {
        lengCurrentCategory += 1;
        if (formData.children[0].children[0]) {
          lengCurrentCategory += 1;
          if (formData.children[0].children[0].children[0]) {
            lengCurrentCategory += 1;
          }
        }
      }
      if (parent.children[0]) {
        lengParentCategory += 1;
        if (parent.children[0].children[0]) {
          lengParentCategory += 1;
          if (parent.children[0].children[0].children[0]) {
            lengParentCategory += 1;
          }
        }
      }
      if (lengCurrentCategory + indexChildItself >= 3) {
        onAddToast({
          type: "error",
          message: "Danh mục cha tối đa 3 cấp.",
        });
        return;
      }
    }
    setFormData({ ...formData, parentSId: parent.categorySId });
    setNameCategory(parent.categoryName);
  };
  const handleSetDefaultCategory = async () => {
    try {
      if (categorylist.length === 0) {
        await dispatch(ThunkgetAllCategory({ page: 0, size: 10, sort: null }));
      }
      setShowCateBox(!ishowCateBox);
    } catch (error) {
      onAddToast({ type: "error", message: "Không lấy được danh mục." });
    }
  };
  const handleScroolGetApi = (event: UIEvent<HTMLUListElement>) => {
    const scroolTop = event.currentTarget.scrollTop;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    if (
      scroolTop + clientHeight >= scrollHeight &&
      categorylist.length < totalElement
    ) {
      if (categorylist.length < totalElement) {
        try {
          setPage((prevState) => prevState + 1);
          dispatch(
            ThunkgetAllCategory({ page: page + 1, size: 10, sort: null })
          );
          return;
        } catch (error) {
          onAddToast({ type: "error", message: "Không lấy được danh mục." });
        }
      }
    }
  };
  useEffect(() => {
    if (id) {
      getCategory(id);
    }
    return () => {};
  }, [id]);

  const handleMouseWindowEvent = (event: MouseEvent) => {
    if (
      CategoryRef.current &&
      !CategoryRef.current?.contains(event.target as HTMLElement)
    ) {
      setShowCateBox(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleMouseWindowEvent);
    return () => {
      window.removeEventListener("click", handleMouseWindowEvent);
    };
  }, []);

  return (
    <div className=" pt-9 pb-10px">
      <h2 className="titlePage mb-9">{id ? "Sửa danh mục" : "Tạo danh mục"}</h2>
      <div>
        <p className="text-small">
          Tên phân loại danh mục<span className="text-main">*</span>
        </p>
        <div className="mt-3 mb-9">
          <InputTextElement
            value={formData.categoryName}
            onChangeInput={handleValueInput}
            isRequired
            name="categoryName"
            maxNumber={20}
            classWidth="w-2/4"
            className="py-3 px-5"
            placehoderText="Nhập tên phân loại danh mục."
          />
        </div>
        <div className="mt-7">
          <p className="text-small mb-1">
            Chọn nhóm cha cho danh mục<span className="text-main">*</span>
          </p>
          <div className="w-2/4 mt-3" ref={CategoryRef}>
            <div
              onClick={handleSetDefaultCategory}
              className="flex items-center justify-between w-full py-3 px-5 textInput cursor-pointer"
            >
              <p className=""> {nameCategory}</p>
              <NextPageIcon
                className={
                  "duration-200 ease-in " +
                  (ishowCateBox ? "rotate-90" : "-rotate-90")
                }
              />
            </div>
            <div className="shadow">
              {ishowCateBox && (
                <ul
                  onScroll={handleScroolGetApi}
                  className="max-h-[200px] p-5 overflow-y-scroll cursor-pointer"
                >
                  <li>
                    <div
                      onClick={() => {
                        setNameCategory("--lựa chọn--");
                        setFormData({ ...formData, parentSId: null });
                      }}
                      className="hover:bg-gray-200 py-1 px-5 text-sm"
                    >
                      --lựa chọn--
                    </div>
                  </li>
                  {categorylist.length > 0 ? (
                    categorylist.map((item, index) => {
                      return (
                        <li key={index}>
                          <div
                            onClick={() =>
                              handleChoseCategory({ parent: item })
                            }
                            className="hover:bg-gray-200 py-1 px-5 text-sm"
                          >
                            {item.categoryName}
                          </div>
                          {item.hasChild && item.children.length > 0 && (
                            <ul>
                              {item.children.map((itemCh, indexCh) => {
                                return (
                                  <li key={itemCh.categorySId}>
                                    <div
                                      onClick={() =>
                                        handleChoseCategory({
                                          parent: itemCh,
                                          indexChildItself: 1,
                                        })
                                      }
                                      className="hover:bg-gray-200 py-1 px-10 text-sm"
                                    >
                                      {itemCh.categoryName}
                                    </div>

                                    {itemCh.hasChild &&
                                      itemCh.children.length > 0 && (
                                        <ul>
                                          {itemCh.children.map(
                                            (itemCh2, indexCh2) => {
                                              return (
                                                <li key={itemCh2.categorySId}>
                                                  <div
                                                    onClick={() =>
                                                      handleChoseCategory({
                                                        parent: itemCh2,
                                                        endChild: true,
                                                      })
                                                    }
                                                    className="hover:bg-gray-200 py-1 px-20 text-sm"
                                                  >
                                                    {itemCh2.categoryName}
                                                  </div>
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li>
                      <div className="py-2 px-5 text-sm text-center text-main">
                        Không có danh mục nào
                      </div>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          <div className="flex item-center mt-10">
            <button
              disabled={formData.categoryName === "" || isDisable}
              className={
                "btn-normal text-sm leading-18 mr-10px " +
                ((formData.categoryName === "" || isDisable) &&
                  "bg-gray-300 text-white cursor-not-allowed")
              }
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryEdit;

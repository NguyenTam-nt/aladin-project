import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import { RootCategory } from "commons/contannt";
import { initial } from "lodash";
import { UIEvent, useEffect, useRef, useState } from "react";
import { setInital } from "redux/reducer/categorySlice";
import { ThunkgetAllCategory } from "redux/thunk/categoryAction";

interface Props {
  itemCategory?: {
    categorySId: number | null;
    parentSId: number | null;
    categoryId: number | null;
    parentId: number | null;
    categoryName: string;
    hasChild?: boolean;
  };
  onHandleAddCategory: (data: any) => void;
}
function ChooseProducCategory(props: Props) {
  const { itemCategory, onHandleAddCategory } = props;
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categorylist);
  const { categorylist, totalElement } = useAppSelector(
    (state) => state.categories
  );
  const [page, setPage] = useState<number>(0);
  const [isShowBox, setShowBox] = useState<boolean>(false);
  const [categoryItem, setCategoryItem] = useState<RootCategory[] | null>(null);
  const [categoryItem2, setCategoryItem2] = useState<RootCategory[] | null>(
    null
  );
  const [idActive, setIdActive] = useState({
    idSub1: null,
    idSub2: null,
  });
  const [categoryValue, setCategoryValue] = useState<RootCategory>({
    categoryId: 0,
    categorySId: 0,
    categoryName: "",
    parentId: null,
    parentSId: null,
    children: [],
    hasChild: false,
    createdAt: null,
    updateAt: null,
  });

  const cRef = useRef(null);
  const closeRef = useRef(null);

  const handleChoseCategory = (item: any) => {
    setCategoryValue(item);
    const newData = { ...item };
    delete newData["children"];
    onHandleAddCategory(newData);
  };
  const showSubCategory = (value: RootCategory[], isSet?: boolean) => {
    const handleClick = (item: any) => {
      isSet && setCategoryItem2(item.children);
      isSet
        ? setIdActive({
            idSub1: item.categorySId,
            idSub2: null,
          })
        : setIdActive({
            ...idActive,
            idSub2: item.categorySId,
          });

      handleChoseCategory(item);
    };
    if (value && value.length > 0) {
      return (
        <div className="max-w-[300px] px-2 cursor-pointer overflow-scroll">
          {value.map((item, indexDetail) => {
            return (
              <div
                onClick={() => {
                  handleClick(item);
                }}
                key={indexDetail}
                className={
                  "text-sm leading-18 tracking-[.03] mb-2 font-normal w-full  " +
                  (categoryValue.categorySId === item.categorySId &&
                    "text-main")
                }
              >
                {item.categoryName}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const enableBox = (event: MouseEvent) => {
    if (cRef && closeRef.current && cRef.current) {
      const RefCurren: HTMLElement = cRef.current;
      const Cref: HTMLElement = closeRef.current;
      if (
        Cref.contains(event.target as HTMLElement) ||
        RefCurren.contains(event.target as HTMLElement)
      ) {
        return;
      } else {
        setShowBox(false);
      }
    }
  };
  const handleScroolGetApi = (event: UIEvent<HTMLDivElement>) => {
    const scroolTop = event.currentTarget.scrollTop;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    if (
      scroolTop + clientHeight >= scrollHeight &&
      categorylist.length < totalElement
    ) {
      if (categorylist.length < totalElement) {
        setPage((prevState) => prevState + 1);
        dispatch(ThunkgetAllCategory({ page: page + 1, size: 10, sort: null }));
      }
    }
  };
  useEffect(() => {
    window.addEventListener("click", (event) => enableBox(event));
    if (itemCategory) {
      setCategoryValue(itemCategory as any);
    }
    return () => {
      window.removeEventListener("click", (event) => enableBox(event));
    };
  }, [itemCategory]);
  useEffect(() => {
    dispatch(setInital());
    dispatch(ThunkgetAllCategory({ page: 0, size: 10, sort: null }));
  }, []);
  return (
    <div className="mb-25">
      <p className="text-small mb-3">
        Phân loại <span className="text-main">*</span>
      </p>
      <div ref={closeRef} onClick={() => setShowBox(!isShowBox)}>
        <InputTextElement
          isRequired={true}
          isReadOnly={true}
          className="py-3 px-5"
          name="productType"
          classWidth="w-full mr-3"
          placehoderText="Chọn mã sản phẩm"
          value={categoryValue.categoryName}
        />
      </div>

      {isShowBox && categories.length > 0 && (
        <div
          ref={cRef}
          className="rounded-md mt-2 py-4 px-18px w-fit flex gap-10px border border-gray-200 shadow max-h-[200px]"
        >
          <div
            onScroll={handleScroolGetApi}
            className="cursor-pointer w-fit px-4 overflow-x-hidden overflow-y-scroll hiddenScrolls"
          >
            {categorylist.length > 0 &&
              categorylist.map((item) => {
                return (
                  <div
                    onClick={() => {
                      handleChoseCategory(item);
                      setCategoryItem(item.children);
                      setCategoryItem2(null);
                    }}
                    key={item.categorySId}
                    className={
                      "text-sm leading-18 tracking-[.03] mb-2 font-normal " +
                      (categoryValue.categorySId === item.categorySId &&
                        "text-main")
                    }
                  >
                    {item.categoryName}
                  </div>
                );
              })}
          </div>
          {categoryItem && showSubCategory(categoryItem, true)}
          {categoryItem2 && showSubCategory(categoryItem2)}
        </div>
      )}
    </div>
  );
}

export default ChooseProducCategory;

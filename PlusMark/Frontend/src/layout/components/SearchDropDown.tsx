import SearchProductCard from "@components/Card/SearchProductCard";
import { Link } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";
import ProductServices, {
  ResponseProductItems,
} from "@services/ProductServices";
import useI18n from "@hooks/useI18n";
import { ROUTES } from "@utility/constants";
import { debounce } from "lodash";
import LoadingPage from "@components/LoadingPage";
import CloseIcon from "@assets/iconElements/CloseIcon";
import { ItemProps, ItemResearch } from "@utility/types";

interface Props {
  close: () => void;
  keyword: string;
}
const ResultItem = memo(({ name, onDeleteItem }: ItemProps) => {
  return (
    <p className="px-4 w-fit py-1 text_base flex gap-1 border border-aqua-aq02 rounded-full">
      {name}
      <span className="cursor-pointer" onClick={onDeleteItem}>
        <CloseIcon />
      </span>
    </p>
  );
});

const ItemProductSearch = memo(({ item, handleclick }: ItemResearch) => {
  return (
    <div
      onClick={handleclick}
      className="max-w-scr268 flex items-center gap-1 bg-white rounded-lg shadow-shd020"
    >
      <img
        src={
          item.image ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnu6obVk9X7KpF7ddIVK0Xukk7GK5uWC1GA&usqp=CAU"
        }
        alt=""
        className="w-spc80 h-spc80 rounded-l-lg border-r border-l-gray-100"
      />
      <div className="pr-3 max-w-2/3 flex flex-col justify-between">
        <p className="text_base line-clamp-2">{item.name}</p>
        <p className="text-sm font-bold text-orange-or0">{item.price}đ</p>
      </div>
    </div>
  );
});
const SearchDropdown = (props: Props) => {
  const { t } = useI18n();

  const [loading, setloading] = useState(false);
  const [productResponse, setproductResponse] =
    useState<ResponseProductItems>();
  const listKeyHistory = localStorage.getItem("history-research");
  const pareKey = listKeyHistory ? JSON.parse(listKeyHistory) : [];
  const [listHistoryResearch, setHistoryResearch] = useState<string[]>(pareKey);

  const handleSearch = (value: string) => {
    if (value == "" || listHistoryResearch.includes(value)) return;
    localStorage.setItem(
      "history-research",
      pareKey
        ? JSON.stringify([...listHistoryResearch, value])
        : JSON.stringify([value])
    );
  };
  const handleDeleteHistrKey = (index: number) => {
    const newHistory = [...listHistoryResearch];
    newHistory.splice(index, 1);
    setHistoryResearch(newHistory);
    localStorage.setItem("history-research", JSON.stringify(newHistory));
  };
  const callSearchApi = (key: string) => {
    handleSearch(key);
    ProductServices.searchHeader({ page: 0, size: 5, keyword: key })
      .then((data) => {
        setproductResponse(data);
      })
      .finally(() => {
        setloading(false);
      });
  };
  const debounceDropDown = useCallback(
    debounce((key) => callSearchApi(key), 700),
    []
  );
  useEffect(() => {
    if (props.keyword && props.keyword.length > 0) {
      setloading(true);
      debounceDropDown(props.keyword);
    } else {
      debounceDropDown.cancel();
      setproductResponse(undefined);
      setloading(false);
    }
  }, [props.keyword]);

  // if (loading) {
  //   return (
  //     <div
  //       className="bg-gray-100 fixed left-0 top-spc80 w-screen max-h-[60vh] shd020 overflow-hidden border flex flex-col"
  //       onClick={() => props.close()}
  //     >
  //       <div className="h-60 flex items-center justify-center">
  //         <LoadingPage />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-100 fixed pt-4 pb-6 left-0 top-spc80 w-screen h-spc300 shadow-shd020 overflow-y-auto">
      <div className="xl:w-2/3 w-3/4 max-w-scr970 mx-auto pb-3 border-b border-b-orange-or0">
        <p className="text-lg font-bold text-black-bl01">Lịch sử tìm kiếm</p>
        <div className="py-3 flex items-center gap-4 flex-wrap">
          <p className="px-4 w-fit py-1 text_base flex gap-1 border border-aqua-aq02 rounded-full">
            Bánh ngọt
            <span className="cursor-pointer">
              <CloseIcon />
            </span>
          </p>
          {listHistoryResearch.map((item, index) => {
            return (
              <ResultItem
                key={index}
                name={item}
                onDeleteItem={() => handleDeleteHistrKey(index)}
              />
            );
          })}
        </div>
      </div>
      <div className="xl:w-2/3 w-3/4 max-w-scr970 mx-auto py-3">
        <p className="text-lg font-bold text-black-bl01">Sản phẩn nổi bật</p>
        <div className="py-3 flex items-center gap-4 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <ResultItem
                name={"Trà thanh mát"}
                onDeleteItem={() => {}}
                key={item}
              />
            );
          })}
        </div>
        <div className="py-3 flex items-center gap-4">
          {
            <ItemProductSearch
              item={{
                name: " Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc",
                price: 400000,
              }}
              handleclick={() => {}}
            />
          }
        </div>
      </div>

      <div>
        {loading ? (
          <div className="h-60 flex items-center justify-center">
            <LoadingPage />
          </div>
        ) : productResponse && productResponse.data.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {productResponse.data.slice(0, 5).map((it, idx) => (
                <SearchProductCard product={it} key={idx} />
              ))}
            </div>
            <div className="px-10">
              {productResponse && productResponse?.total - 5 > 0 ? (
                <div className="text-center text-wap-regular2 font-semibold border-t py-3">
                  <Link to={`${ROUTES.search.index}?keyword=${props.keyword}`}>
                    {t("header.search_see_more", {
                      amount: productResponse?.total - 5,
                    })}{" "}
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div
            className="px-5 pb-4 text-center
          h-[500px]"
          >
            Không có sản phẩm nào
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;

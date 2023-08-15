import { ArrowDownManageIcon, PlusIcon } from "@assets/icons";
import LoadingScreen from "@components/LoadingScreen";
import ManageNewsItem from "@components/News/Item/ManageNewsItem";
import Pagination from "@components/Pagination";
import NewsServices from "@services/NewsServices";
import debounce from "lodash/debounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export interface New {
  content: string;
  describe: string;
  id: string;
  imageUrl: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

function ManageNews() {
  const perPage = 5;
  const [searchKey, setsearchKey] = useState("");
  const [news, setNews] = useState<New[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.get("page") || "1"
  );

  const fetchData = async (key?: string, sort?: string) => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: perPage,
      };
      if (key && key.length) {
        params["key"] = key;
      }

      if (sort && sort.length) {
        params['sort'] = sort
      }
      else {
        params['sort'] = 'desc'
      }
      const response = await NewsServices.get(params);
      if (response.status == 200) {
        const data = response.data.data;
        const total = response.data.total;
        const totalPage = Math.ceil(total / perPage);
        setTotalPage(totalPage);
        setNews(data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setsearchKey(value);
    searchDebounce(e.currentTarget.value);
  };

  const searchDebounce = useCallback(
    debounce((value: any) => fetchData(value), 500),
    []
  );

  const handleOrder = (sort: string) => {
    fetchData(searchKey, sort)
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="">
      <h3 className="text-title font-semibold text-main mt-9">
        Danh sách tin tức
      </h3>
      <div className="my-7 flex justify-between items-center h-[40px] gap-4">
        <div className="flex-1 flex items-center gap-3 h-full">
          {/* <input
            className="max-w-[353px] flex-1 h-full px-4 outline-none border border-background-200 rounded-md"
            value={searchKey}
            onChange={handleSearch}
            name="search_key"
            placeholder="Nhập tìm kiếm"
          /> */}
          <Link
            to="/admin/news/add"
            className="w-fit h-full hover:cursor-pointer text-white bg-main text-normal px-3 py-2 rounded-md flex items-center gap-1"
          >
            <PlusIcon /> Tạo bài viết
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-fit h-full hover:cursor-pointer text-black text-normal1 px-3 py-2 border border-background-200  rounded-md flex items-center gap-1" onClick={() => handleOrder('desc')}>
            <ArrowDownManageIcon /> Mới nhất
          </div>
          <div className="w-fit h-full hover:cursor-pointer text-black text-normal1 px-3 py-2 border border-background-200  rounded-md flex items-center gap-1" onClick={() => handleOrder('asc')}>
            <ArrowDownManageIcon /> Cũ nhất
          </div>
        </div>
      </div>
      <div className="">
        {news && news.length > 0 ? (
          news.map((item, key) => (
            <ManageNewsItem
              key={key}
              post={item}
              posts={news}
              setPost={setNews}
            />
          ))
        ) : (
          <div className="">Không có dữ liệu</div>
        )}
      </div>

      <div className=" pb-[50px] pt-[50px] text-background-100">
        <Pagination
          currenPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalPage}
        />
      </div>
    </div>
  );
}

export default ManageNews;

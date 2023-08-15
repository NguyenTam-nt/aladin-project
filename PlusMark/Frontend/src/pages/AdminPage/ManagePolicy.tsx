import { ArrowDownManageIcon, PlusIcon } from "@assets/icons";
import LoadingScreen from "@components/LoadingScreen";
import ManagePolicyItem from "@components/policy/ManagePolicyItem";
import PolicyServices from "@services/PolicyServices";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Policy {
  id: string,
  title: string,
  describe: string,
  content: string,
}

function ManagePolicy() {
  const [searchKey, setsearchKey] = useState("");
  const [policies, setPolicies] = useState<Array<Policy>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async (key?: string, sort?: string) => {
    try {
      setLoading(true);
      const params: any = {
        page: 1,
        limit: 10,
      };
      if (key && key.length) {
        params["key"] = key;
      }
      if (sort && sort.length) {
        params["sort"] = sort;
      }
      const response = await PolicyServices.get(params);
      if (response.status == 200) {
        const data = response.data.data;
        setPolicies(data);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

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

  if (loading) return <LoadingScreen />

  return (
    <div className="pb-[50px]">
      <h3 className="titlePage mt-9">Chính sách hỗ trợ khách hàng</h3>
      <p className="text-gray-300 text-normal mx-1">
        Lưu ý: người dùng đăng tối đa 10 chính sách
      </p>
      <div className="mb-7 mt-3 flex justify-between items-center h-[40px] gap-4">
        <div className="flex-1 flex items-center gap-3 h-full">
          {/* <input
            className="max-w-[353px] flex-1 h-full px-4 outline-none border border-background-200 rounded-md"
            value={searchKey}
            onChange={handleSearch}
            name="search_key"
            placeholder="Nhập tìm kiếm"
          /> */}
          <Link
            to={"add"}
            className={`w-fit h-full hover:cursor-pointer text-white text-normal px-3 py-2 rounded-md flex items-center gap-1
              ${policies && policies.length == 10 ? 'pointer-events-none bg-gray-300' : 'bg-main'}
            `}
          >
            <PlusIcon /> Tạo chính sách
          </Link>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-fit h-full hover:cursor-pointer text-black text-normal1 px-3 py-2 border border-background-200  rounded-md flex items-center gap-1" onClick={() => handleOrder('desc')}>
            <ArrowDownManageIcon /> Mới nhất
          </div>
          <div className="w-fit h-full hover:cursor-pointer text-black text-normal1 px-3 py-2 border border-background-200  rounded-md flex items-center gap-1" onClick={() => handleOrder('asc')}>
            <ArrowDownManageIcon /> Cũ nhất
          </div>
        </div> */}
      </div>
      <div className="">
        {policies && policies.length > 0 ? (
          policies.map((value, key) => (
            <ManagePolicyItem
              key={key}
              policy={value}
              policies={policies}
              setPolicies={setPolicies}
            />
          ))
        ) : (
          <div className="">Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
}

export default ManagePolicy;

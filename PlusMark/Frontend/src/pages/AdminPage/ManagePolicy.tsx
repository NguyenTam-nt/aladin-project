import { ArrowDownManageIcon, PlusIcon } from "@assets/icons";
import LoadingScreen from "@components/LoadingScreen";
import ManagePolicyItem from "@components/policy/ManagePolicyItem";
import useI18n from "@hooks/useI18n";
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
  const { lang } = useI18n();
  const [searchKey, setsearchKey] = useState("");
  const [policies, setPolicies] = useState<Array<Policy>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async (key?: string, sort?: string) => {
    try {
      setLoading(true);
      const params: any = {
        page: 1,
        limit: 8,
      };
      if (key && key.length) {
        params["key"] = key;
      }
      if (sort && sort.length) {
        params["sort"] = sort;
      }
      const response = await PolicyServices.get(params);
      const data = response.data;
      let transformedPolicies = data.map((policyData: any) => {
        if (lang === 'ksl') {
          const policy: Policy = {
            id: policyData.id,
            title: policyData.titleKr,
            describe: policyData.describeKr,
            content: policyData.contentKr,
          };
          return policy;
        } else {
          const policy: Policy = {
            id: policyData.id,
            title: policyData.titleVn,
            describe: policyData.describeVn,
            content: policyData.contentVn,
          };
          return policy;
        }
      });

      setPolicies(transformedPolicies);
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
    <div className="p-[50px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-between ">
          <h3 className="titlePage">Chính sách hỗ trợ</h3>
          <p className="text-gray-300 text-normal ml-3 mt-5 italic">
            Tối đa 8 chính sách
          </p>
        </div>
        <div className="mb-7 mt-3 flex justify-between items-center h-[40px] gap-4">
          <div className="flex-1 flex items-center gap-3 h-full">
            {
              policies.length < 8 && <Link
                to={"add"}
                className={`w-fit h-full hover:cursor-pointer text-main font-bold text-normal px-3 py-2  flex items-center gap-1 border border-main
              ${policies && policies.length == 8 ? 'pointer-events-none' : ''}
            `}
              >
                <PlusIcon /> Thêm chính sách
              </Link>
            }
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
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

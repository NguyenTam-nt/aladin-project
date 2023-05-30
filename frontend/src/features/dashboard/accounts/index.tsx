import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
// import { ModalContext } from "@contexts/ModalContext";
import Pagination from "../components/Pagination";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { InputAdmin } from "../components/InputAdmin";
import { ICClear } from "@assets/icons/ICClear";
import { ModalContext } from "@contexts/ModalContext";
import { ModalCreate } from "./components/ModalCreate";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import type { IResponseData } from "@typeRules/responsive";
import { IUser, RoleUser } from "@typeRules/user";
import { debounce } from "lodash";
import { userService } from "@services/user";
import { PAGE_SIZE } from "@constants/contain";
import { useSearchParams } from "react-router-dom";
import { LoadingData } from "@components/LoadingData";
import { Avatar } from "@components/Avatar";
import { AuthContext } from "@contexts/AuthContext";
import { PopUpContext } from "@contexts/PopupContext";

export const Account = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const { setElementModal } = useContext(ModalContext);
  const [listData, setListData] = useState<IResponseData<IUser>>();
  const [_, setSearchParam] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const debounceFuc = useRef<ReturnType<typeof debounce>>();
  const [loading, setLoading] = useState(false);
  const {showSuccess, showError} = useContext(PopUpContext)
  const handleChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchValue(query);
      if (query.trim()) {
        setCurrentPage(1);
        setSearchParam({ page: `1` });
      }
    },
    []
  );

  const handleGetData = useCallback((page: number, query: string) => {
    setLoading(true);
    userService
      .getBySearch(
        {
          page: page - 1,
          size: PAGE_SIZE,
          sort: "login,asc",
        },
        query
      )
      .then((data) => {
        setListData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleGetDataBySearch = useCallback(
    (page: number, query: string) => {
      if (debounceFuc.current) debounceFuc.current.cancel();
      debounceFuc.current = debounce(() => {
        handleGetData(page, query);
      }, 300);
      debounceFuc.current();
    },
    [handleGetData]
  );

  useEffect(() => {
    if (!searchValue.trim()) {
      if (debounceFuc.current) debounceFuc.current.cancel();
      handleGetData(Number(currenPage ?? 1), searchValue);
    } else {
      handleGetDataBySearch(Number(currenPage ?? 1), searchValue);
    }
  }, [currenPage, handleGetData, handleGetDataBySearch, searchValue]);

  const handleShowModal = () => {
    setElementModal(<ModalCreate onSubmit={onSubmit} />);
  };

  const onSubmit = () => {
    handleGetData(1, searchValue);
    setSearchParam({
      page: "1",
    });
    setCurrentPage(1);
  };

  const totalPage = useMemo(() => {
    return Math.ceil(Number(listData?.total ?? 0) / PAGE_SIZE);
  }, [listData?.total]);

  const handleDelete = useCallback((id:string) => {
    userService.delete(id).then(() => {
      showSuccess("message.success._success")
      let page = Number(currenPage)
      if(listData?.data.length && listData?.data.length > 1) {
        const newData = [...listData?.data]
        const index = newData.findIndex(data => data.id === id)
        newData.splice(index, 1)
        setListData({
          data: [...newData],
          total: listData.total      
        })
        return
      }
      if(Number(currenPage) >= totalPage) {
        page = page - 1
        setSearchParam({page: `${page}`})
        setCurrentPage(page)
        return
      }
      handleGetData(page, searchValue)
    }).catch(() => {
      showError("message.error._error")
    })
  }, [showSuccess, currenPage, listData, totalPage, handleGetData, searchValue, setSearchParam, showError])


  return (
    <div className="px-[24px]">
      <HeaderAdmin title="account._title" />
      <div className="flex items-center h-[48px]">
        <InputAdmin searchQuery={searchValue} onChange={handleChangeSearch} />
        <Button
          onClick={handleShowModal}
          color="primary"
          text="account._btn_create"
          className="bg-secondary  ml-[24px] !w-[200px] h-[48px]"
          imageLeft={<ICPlus />}
        />
      </div>
      <AccountTable onDelete={handleDelete} loading={loading} data={listData?.data ?? []} />
      <div className="mt-[120px] flex justify-end">
        <Pagination
          currenPage={currenPage}
          setCurrentPage={setCurrentPage}
          total={totalPage}
        />
      </div>
    </div>
  );
};

const AccountTable = memo(
  ({ data, loading, onDelete }: { data: IUser[]; loading: boolean, onDelete: (id:string) => void }) => {
    const { t } = useContext(TranslateContext);
    return (
      <>
        <div className="pb-[14px] grid grid-cols-4 mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
          <div className=" col-span-2">{t("account._form._name")}</div>
          <div>{t("account._form._role")}</div>
          {/* <div>{t("account._form._create_day")}</div>
          <div>{t("account._form._expired_day")}</div> */}
          <div className="flex justify-end">{t("account._form._function")}</div>
        </div>
        {loading ? (
          <LoadingData />
        ) : (
          data.map((item, index) => {
            return <AccountTableItem onDelete={onDelete} data={item} key={index} />;
          })
        )}
      </>
    );
  }
);

type PropsItem = {
  data: IUser;
  onDelete: (id:string) => void;
};

const AccountTableItem = ({ data, onDelete }: PropsItem) => {
  const { t } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const {showSuccess, showError} = useContext(PopUpContext)
  const handleShowModal = () => {
    setElementModal(
      <DialogConfirmDelete
       onClick={handleDelete}
        message={t("admin._notice._delete_user", { name: data?.login })}
      />
    );
  };

  const handleDelete = () => {
    onDelete(data?.id + "")
  }


  const handleChange= (event:ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as RoleUser
    userService.updateRole(data?.id+"", value).then(() => {
      showSuccess("message.success._success")
    }).catch(() => {
      showError("message.error._error")
      event.target.value = data?.role + ""
    })

  }

  return (
    <div className="py-[16px] grid grid-cols-4 text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
      <div className="flex col-span-2 items-center gap-x-2">
        <Avatar link={data.imageUrl} name={data.login ?? ""} />
        <div>
          <p className="text-_14 font-semibold text-text_black">
            {data?.login}
          </p>
          <p className="text-_12 font-medium text-text_565656">{data?.email}</p>
        </div>
      </div>
      <div>
        <select
          id="default"
          defaultValue={data?.role}
          onChange={handleChange}
          className="border w-[172px] border-br_E9ECEF text-text_primary  text-_14 block p-2.5 "
        >
          <option disabled={(user?.login === data?.login && data.role === RoleUser.ADMIN )|| data?.role === RoleUser.SYSTEM || (
            user?.login !== data?.login && data.role === RoleUser.ADMIN && user?.role === RoleUser.ADMIN
          )} value={RoleUser.ADMIN}>
            Admin
          </option>
          <option
            disabled
            value={RoleUser.SYSTEM}
          >
            System
          </option>
            <option disabled={(user?.login === data?.login) || data?.role === RoleUser.SYSTEM} value={RoleUser.USER}>Member</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button onClick={handleShowModal}>
          <ICClear />
        </button>
      </div>
    </div>
  );
};

import { TrashCanIcon } from "@assets/icons";
import { ModalContext } from "@contexts/contextModal";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import ConfirmBox from "commons/ConfirmBox";
import InputChecboxElement from "commons/components/InputComponent/InputChecboxElement";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { changeName } from "redux/reducer/authSlice";
import { fetchUserId } from "redux/thunk/authAction";
import Select from "react-select";
import { some } from "@utility/helper";
import { ROLES, ROLE_USER_SELECT, ROLE_ADMIN_SELECT, ROLE_SYSTEM_SELECT } from "@utility/constants";
import Pagination from "@components/Pagination";
import AccountServices, { AccountResponse } from "@services/AccountServices";
import LoadingPage from "@components/LoadingPage";
import { ToastContex } from "@contexts/ToastContex";

const fakeData = {
  total: 22,
  data: [
    {
      id: 1,
      name: "cuongnm",
      email: "cuongnm@aladintech.co",
      role: "admin",
    },
    {
      id: 2,
      name: "cuongnm1",
      email: "cuongnm1@aladintech.co",
      role: "admin",
    },
    {
      id: 3,
      name: "cuongnm2",
      email: "cuongnm2@aladintech.co",
      role: "admin",
    },
    {
      id: 4,
      name: "cuongnm3",
      email: "cuongnm3@aladintech.co",
      role: "admin",
    },
  ]
}

function ManageAccounts() {
  const { showModal, setShowModal, setContentModal } = useContext(ModalContext);
  const { listToast, onAddToast } = useContext(ToastContex);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [listIdDelete, setListIdDelete] = useState<string[]>([]);
  const [roleOptions, setRoleOptions] = useState<any[]>([ROLE_ADMIN_SELECT, ROLE_USER_SELECT])
  const [accountsResponse, setAccountsResponse] = useState<AccountResponse>();
  const [isLoading, setisLoading] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 10

  const handleChangeInput = (data: { name: string; value: string }) => {
    setInputSearch(data.value);
  };

  useEffect(() => {
    callGetAccounts()
  }, [page, inputSearch]);
  
  const callGetAccounts = () => {
    setisLoading(true)
    try {
      AccountServices.getAllAccounts(inputSearch, page - 1, limit)
        .then(data => {
          // console.log(data);
          setAccountsResponse(data)
          setisLoading(false)
        })
    } catch (error) {
      setisLoading(false)
    }
  }

  const total = useMemo(()=> {
    if(accountsResponse && accountsResponse.total) {
      return Math.ceil(accountsResponse.total / limit);
    }
    return 0;
  }, [accountsResponse?.total])

  const handleAddIdDelete = (
    id: string
  ) => {
    const newListId = [...listIdDelete];
    const checkId = listIdDelete.findIndex((item) => {
      return item === id;
    });
    if (checkId > -1) {
      newListId.splice(checkId, 1);
    } else {
      newListId.push(id);
    }
    setListIdDelete(newListId);
  };

  const callApiRemoveAccount = () => {
    try {
      AccountServices.removeAccount(listIdDelete).then(data => {
        onAddToast({ type: "success", message: `Xóa tài khoản thành công` });
        setShowModal(false);
        callGetAccounts()
      })
    } catch (error) {
      onAddToast({ type: "error", message: `Xóa tài khoản thất bại` });
    }
  }

  const handleDeleteAccounts = () => {
    if (listIdDelete.length === 0) {
      return;
    }
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        typeBox="SUCCESS"
        enableIcon={false}
        message="Bạn có chắc chắn xóa thành viên này khỏi hệ thống?"
        handleConfirm={() => {
          callApiRemoveAccount();
          setShowModal(false);
        }}
      />
    );
  };


  const nameList = [
    "Tên Tài khoản",
    "Thông tin tài khoản",
  ];

  const styles = {
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "var(--main-color)" : "inherit",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "var(--main-color)"
          : "var(--icon-color)",
      },
      cursor: "pointer",
    }),
    control: (provided: any) => ({
      ...provided,
      boxShadow: "none",
      border: "0px solid var(--gray-003)",
      borderRadius: "10px",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: "var(--text)",
      border: "0px solid var(--gray-003)",
    }),
  };

  const handleChangeRole = (id: string, oleRole: string, role: any) => {
    if(oleRole == ROLES.admin && role.value == ROLES.user) {
      handleRemoveRoleAdminAccount(id)
    } else if((oleRole == ROLES.user && role.value == ROLES.admin)) {
      handleActiveAccount(id)
    }
  }

  const handleActiveAccount = (id: string) => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        typeBox="SUCCESS"
        enableIcon={false}
        message="Cấp quyền tài khoản này truy cập hệ thống quản lý web"
        handleConfirm={() => {
          callApiAddRoleAdmin(id)
          
        }}
      />
    );
  };

  const handleRemoveRoleAdminAccount = (id: string) => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        typeBox="SUCCESS"
        enableIcon={false}
        message="Hủy quyền tài khoản này truy cập hệ thống quản lý web"
        handleConfirm={() => {
          callApiRemoveRoleAdmin(id)
          
        }}
      />
    );
  };


  const callApiRemoveRoleAdmin = (id: string) => {
    try {
      AccountServices.removeAccountFromAdmin(id).then(data => {
        onAddToast({ type: "success", message: `Đổi quyền thành công` });
        setShowModal(false);
        callGetAccounts()
      })
    } catch (error) {
      onAddToast({ type: "error", message: `Đổi quyền thất bại` });
    }
  }

  const callApiAddRoleAdmin = (id: string) => {
    try {
      AccountServices.addAccountToAdmin(id).then(data => {
        onAddToast({ type: "success", message: `Đổi quyền thành công` });
        setShowModal(false);
        callGetAccounts()
      })
    } catch (error) {
      onAddToast({ type: "error", message: `Đổi quyền thất bại` });
    }
  }

  return (
    <div className="w-full pt-9 pb-10px">
      <h2 className="titlePage mb-7">Tài khoản quản lý web</h2>
      <InputTextElement
        name="inputSearch"
        value={inputSearch}
        placehoderText={"Tìm kiếm tài khoản"}
        classWidth="w-[560px] mb-18px"
        onChangeInput={handleChangeInput}
        className="py-10px text-base leading-5 font-normal px-4"
      />

      <div className="pt-12 w-full">
        <table className="border-none table-accounts w-full ">
          <thead>
            <tr className="border-b border-b-gray-200">
              <th className="pb-5 border-none w-10">
                <TrashCanIcon
                  onClick={handleDeleteAccounts}
                  className="cursor-pointer"
                />
              </th>
              {nameList.map((items, index) => {
                return (
                  <th
                    className="px-2 mx-1  text-base font-semibold text-left leading-5 tracking-[.03] text-main pb-5 border-none"
                    key={index}
                  >
                    {items}
                  </th>
                );
              })}
              <th
                  className="px-2 mx-1 w-fit text-base font-semibold text-left leading-5 tracking-[.03] text-main pb-5 border-none">
                  Phân Quyền
                </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && accountsResponse && accountsResponse.data.map((item, index) => {
              return (
                <tr key={index} className="border-b border-b-gray-200">
                  <td className="text-left py-10px border-none">
                    <InputChecboxElement
                      isCheck={listIdDelete.includes(item.id)}
                      name={item.id}
                      onHandleChange={() => handleAddIdDelete(item.id)}
                      sizeBox="w-4 h-4 rounded-[4px]"
                    />
                  </td>
                  <td className="px-2 mx-1 text-left py-10px border-none pr-6">
                    <p className="text-small mb-1 text-left font-normal">
                      {item.lastName && item.firstName ? item.lastName + item.firstName : ''}
                    </p>
                  </td>
                  <td className="px-2 mx-1 text-left py-10px border-none pr-6">
                    <p className="text-small mb-1 text-left font-normal">
                      {item.email && item.email}
                    </p>
                  </td>
                  <td className="font-normal w-[182px]">
                    {
                      !!item.role && item.role == ROLES.system ?  <div className="px-2 mx-1 w-fit">{"System"}</div> :
                        <Select
                          inputId={"dsfsdf"}
                          styles={styles}
                          className="h-full w-full  text-text text-normal1 rounded-md"
                          defaultValue={ROLE_USER_SELECT}
                          value={item.role && item.role == ROLES.system ? ROLE_SYSTEM_SELECT : item.role == ROLES.admin ? ROLE_ADMIN_SELECT : ROLE_USER_SELECT}
                          name={"role_account"}
                          options={roleOptions}
                          onChange={(e) => handleChangeRole(item.id, item.role, e)}
                        /> 
                    }
                  </td>
                </tr>
              );
            })}
                
          </tbody>
        </table>
        {isLoading && <tr className="h-36 min-h-full w-full flex justify-center items-center">
            <LoadingPage /> 
        </tr> }
        <div className=" mt-4 text-background-100  mx-auto">
          <Pagination currenPage={page} setCurrentPage={setPage} total={total} />
        </div>
      </div>
    </div>
  );
}

export default ManageAccounts;

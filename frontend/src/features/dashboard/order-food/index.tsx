import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { Button } from "../components/Button";
import { ICDesc } from "@assets/icons/ICDesc";
import { ICAsc } from "@assets/icons/ICAsc";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { Checkbox } from "../components/Checkbox";
import { useHandleCheckbox } from "../category-product/useHandleCheckbox";
import { useTranslation } from "react-i18next";
import { Colors } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import { ICArowDown } from "@assets/icons/ICArowDown";
import ModalOrderFoodDetail from "./components/ModalOrderFoodDetail";
import MagnifyingGlass from "@assets/icons/MagnifyingGlass";
import { useNavigate } from "react-router-dom";
import FilterByTime from "./components/FilterByTime";
import FilterPlaceBox from "./components/FilterPlaceBox";
import type { IParams, IResponseData } from "@typeRules/index";
import {
  BillStatus,
  BillStatusContants,
  type IBill,
  type IBillGet,
} from "@typeRules/bill";
import BillService from "@services/BillService";
import { SIZE_DATA } from "@constants/index";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { fornatDateHour } from "@constants/fornatDateHour";
import { DiglogComfirmDelete } from "../components/DiglogComfirmDelete";
import { Loading, useHandleLoading } from "../components/Loading";
import { useShowMessage } from "../components/DiglogMessage";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
const SIZE_DATA_ORDERFOOD = 20;

function OrderFoodAdmin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setElementModal } = useModalContext();
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();

  const [keySearch, setKeySearch] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState();
  const [place, setPlace] = useState<number>();
  const [bills, setBills] = useState<IBillGet[]>([]);
  const {
    refCheckboxAll,
    refCheckboxList,
    handleCheckAll,
    handleCheckedItem,
    listChecked,
    setListChecked,
  } = useHandleCheckbox(bills?.map((e) => e.id as number) || []);

  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = useMemo(() => {
    return Math.ceil(total / SIZE_DATA_ORDERFOOD);
  }, [total]);

  useEffect(() => {
    getBillsData(0);
  }, []);

  const getBillsData = (page: number) => {
    BillService.get({
      page: page,
      size: SIZE_DATA_ORDERFOOD,
      sort: "id,desc",
      id: place,
      date: timeFilter,
    }).then((res) => {
      setBills(res.list);
      setTotalPage(res.totalElementPage);
    });
  };

  const getBillsDataMore = (page: number) => {
    BillService.get({
      page: page,
      size: SIZE_DATA_ORDERFOOD,
      sort: "id,desc",
      id: place,
      date: timeFilter,
    }).then((res) => {
      setBills((pre) => [...pre, ...res.list]);
      setTotalPage(res.totalElementPage);
    });
  };

  const debounceDropDown = useCallback(
    debounce((params: any) => searchListNew(params), 700),
    []
  );

  useEffect(() => {
    if (keySearch != "") {
      setCurrentPage(0);
      const searchParams = {
        query: '"' + keySearch.trim() + '"',
        page: 0,
        size: SIZE_DATA_ORDERFOOD,
        id: place,
        date: timeFilter,
      };
      debounceDropDown(searchParams);
      return;
    }
    debounceDropDown.cancel();
    getBillsData(0);
  }, [place, timeFilter, keySearch]);

  const searchListNew = async (params: IParams) => {
    try {
      const response = await BillService.search(params);
      setBills(response.list);
      setTotalPage(response.totalElementPage);
    } catch (error) {}
  };

  const searchListNewMore = async (params: IParams) => {
    try {
      const response = await BillService.search(params);
      setBills((pre) => [...pre, ...response.list]);
      setTotalPage(response.totalElementPage);
    } catch (error) {}
  };

  const handleClickDetail = (id: number) => {
    setElementModal(<ModalOrderFoodDetail idBill={id} />);
  };

  const handleInputSerch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeySearch(e.target.value);
    navigate("");
    setCurrentPage(0);
  };

  const handleShowModalDeleteAll = () => {
    if (listChecked.length > 0) {
      setElementModal(
        <DiglogComfirmDelete
          onClick={handleDeleteAll}
          message="adminOrderFood.notification.delete"
        />
      );
    }
  };

  const fechData = () => {
    // if(isAll) return
    if (currentPage < totalPages) {
      if (keySearch.trim() != "") {
        const searchParams = {
          query: '"' + keySearch.trim() + '"',
          page: currentPage + 1,
          size: SIZE_DATA_ORDERFOOD,
        };
        searchListNewMore(searchParams);
        setCurrentPage((page) => page + 1);
      } else {
        getBillsDataMore(currentPage + 1);
        setCurrentPage((page) => page + 1);
      }
    }
  };

  const handleDeleteAll = () => {
    showLoading();
    BillService.deleteAll(
      listChecked.map((id) => {
        return { id: id };
      })
    )
      .then(() => {
        getBillsData(0)
        setListChecked([])
        showSuccess("adminOrderFood.notification.deleteSuccess");
      })
      .catch(() => {
        showError("adminOrderFood.notification.deleteError");
      });
  };

  const handleChangeStatus = (id: number, status: BillStatus) => {
    // console.log(id, status);

    BillService.changeStatus(id, status)
      .then(() => {
        getBillsData(0);
      })
      .catch(() => {});
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="-mb-[32px]">
          <TitleTopic name="adminOrderFood.title" isRequired={false} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 xl:gap-4 mb-1">
          <div className="flex-1 w-full relative">
            <input
              type="text"
              value={keySearch}
              onChange={handleInputSerch}
              className="w-full border placeholder:text-_10 md:placeholder:text-_16 border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("adminOrderFood.searchPlaceholder") as string}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex gap-2 xl:gap-6 justify-between">
          <Button
            onClick={() => handleShowModalDeleteAll()}
            text="common.delete"
            className="!max-w-[60px] !text-_12 lg:!text-_14 lg:!max-w-[92px] whitespace-nowrap text-text_EA222A border-text_EA222A"
            imageLeft={
              <span className="mr-1 lg:mr-2">
                <ICDeleteTrashLight />
              </span>
            }
            color={"empty"}
          />
            <FilterByTime setTimeFilter={setTimeFilter} />
            <FilterPlaceBox place={place} handleChosePlace={setPlace} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <InfiniteScroll
          hasMore
          loader={
            loading ? (
              <div className="flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <></>
            )
          }
          next={fechData}
          dataLength={bills.length}
          // scrollableTarget="comment-admin-scroll"
        >
          <div className="border-b border-br_E9ECEF pb-2 lg:pb-4 grid grid-cols-[25px_100px_122px_108px_126px__66px_1fr] 2xl:grid-cols-[25px_188px_212px_128px_128px__88px_1fr] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
            <div>
              <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
            </div>
            <p>{t("adminOrderFood.table.code")}</p>
            <p>{t("adminOrderFood.table.fullname")}</p>
            <p>{t("adminOrderFood.table.phone")}</p>
            <p>{t("adminOrderFood.table.day")}</p>
            <p>{t("adminOrderFood.table.hour")}</p>
            <p className="flex justify-end gap-3">
              {t("adminOrderFood.table.status")}
            </p>
          </div>
          {bills &&
            bills.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className="border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_100px_122px_108px_126px__66px_1fr] 2xl:grid-cols-[25px_188px_212px_128px_128px__88px_1fr] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
                >
                  <div className="flex items-center">
                    <Checkbox
                      onChange={(event) => handleCheckedItem(event, idx)}
                      ref={(element: HTMLInputElement) => {
                        refCheckboxList.current[idx] = element;
                      }}
                    />
                  </div>
                  <p className="line-clamp-1 flex flex-col gap-1">
                    <span
                      className="hover:font-bold cursor-pointer"
                      onClick={() => handleClickDetail(item.id)}
                    >
                      {item.id}
                    </span>
                    <span className="text-_14 text-text_A1A0A3">
                      {FomatDateYY_MM_DD(item.createdDate)}
                    </span>
                  </p>
                  <p className="line-clamp-1 flex items-center">
                    {item.fullname}
                  </p>
                  <p className="line-clamp-1 flex items-center">{item.phone}</p>
                  <p className="line-clamp-1 flex items-center">
                    {FomatDateYY_MM_DD(item.chooseDate)}
                  </p>
                  <p className="line-clamp-1 flex items-center">
                    {fornatDateHour(item.chooseDate)}
                  </p>
                  <div className="flex justify-end gap-x-[16px] w-full cursor-pointer">
                    {BillStatusContants.cancel == item.status ? (
                      <div className="flex items-center justify-end gap-2 cursor-pointer">
                        <select
                          value={item.status}
                          name="place"
                          onChange={(e) =>
                            handleChangeStatus(
                              item.id,
                              e.target.value as BillStatus
                            )
                          }
                          className={"text-_14 text-text_red bg-transparent "}
                        >
                          <option
                            value={BillStatusContants.wait}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.wait")}
                          </option>
                          <option
                            value={BillStatusContants.complete}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.done")}
                          </option>
                          <option
                            value={BillStatusContants.cancel}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.cancel")}
                          </option>
                        </select>
                        {/* <span className='text-_14 text-text_red'>{t("adminOrderFood.table.cancel")}</span>
                    <ICArowDown color={Colors.text_black} /> */}
                      </div>
                    ) : BillStatusContants.complete == item.status ? (
                      <div className="flex items-center justify-end w-fit gap-2 relative">
                        <select
                          value={item.status}
                          name="place"
                          onChange={(e) =>
                            handleChangeStatus(
                              item.id,
                              e.target.value as BillStatus
                            )
                          }
                          className={"text-_14 text-bg_01A63E bg-transparent "}
                        >
                          <option
                            value={BillStatusContants.wait}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.wait")}
                          </option>
                          <option
                            value={BillStatusContants.complete}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.done")}
                          </option>
                          <option
                            value={BillStatusContants.cancel}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.cancel")}
                          </option>
                        </select>
                        {/* <span className='text-_14 text-bg_01A63E -mt-1'>{t("adminOrderFood.table.done")}</span>
                    <ICArowDown color={Colors.text_black}/> */}
                      </div>
                    ) : (
                      <div className="flex items-center justify-end w-fit gap-2 relative">
                        <select
                          value={item.status}
                          name="place"
                          onChange={(e) =>
                            handleChangeStatus(
                              item.id,
                              e.target.value as BillStatus
                            )
                          }
                          className={
                            "text-_14 text-waiting  w-fit bg-transparent"
                          }
                        >
                          <option
                            value={BillStatusContants.wait}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.wait")}
                          </option>
                          <option
                            value={BillStatusContants.complete}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.done")}
                          </option>
                          <option
                            value={BillStatusContants.cancel}
                            className="text-text_primary"
                          >
                            {t("adminOrderFood.table.cancel")}
                          </option>
                        </select>
                        {/* <span className='text-_14 text-waiting -mt-1 whitespace-nowrap'>{t("adminOrderFood.table.wait")}</span>
                    <ICArowDown color={Colors.text_black}/> */}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default OrderFoodAdmin;
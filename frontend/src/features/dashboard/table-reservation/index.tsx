import CalendarIcont from "@assets/icons/CalendarIcont"
import { ICArowDown } from "@assets/icons/ICArowDown"
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight"
import MagnifyingGlass from "@assets/icons/MagnifyingGlass"
import TitleOfContentManage from "@components/TitleOfContentManage"
import { Colors } from "@constants/color"
import { useTranslation } from "react-i18next"
import { Button } from "../components/Button"
import { useClickOutItem } from "@hooks/useClickOutItem"
import { Checkbox } from "../components/Checkbox"
import { ICFilterDropdown } from "@assets/icons/ICFilterDropdown"
import FilterPlaceBox from "./component/FilterPlaceBox"
import FilterByTime from "./component/FilterByTime"
import { ChangeEvent, UIEvent, useCallback, useEffect, useState } from "react"
import { useModalContext } from "@contexts/hooks/modal"
import { DiglogComfirmDelete } from "../components/DiglogComfirmDelete"
import ModalFeedbackReservation from "./component/ModalFeedbackReservation"
import ModalConfirm from "./component/ModalConfirm"
import { reservationTableSvice } from "@services/reservationTableSevice"
import type { book_table } from "@typeRules/tableReservation"
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D"
import { useHandleCheckbox } from "../category-product/useHandleCheckbox"
import { useShowMessage } from "../components/DiglogMessage"
import type { IParams } from "@typeRules/index"
import { debounce } from "lodash"

const ManageTableReserVation = () => {
  const { t } = useTranslation()
  const { hideModal, setElementModal } = useModalContext()
  const [isReply, setReply] = useState<boolean | null>(null)
  const [keySearch, setKeySearch] = useState<string>("")
  const [place, setPlace] = useState<{ id: number; name: string } | null>(null)
  const [filter, setFilter] = useState<{ time: string; status: string }>({
    time: "",
    status: "",
  })
  const [listRequetTable, setListRequesTable] = useState<book_table[]>([])
  const [currentPage, setcurrentPage] = useState<number>(1)
  const [totalPage, setTotalpage] = useState<number>(1)
  const params = {
    page: currentPage - 1,
    size: 20,
    date: filter.time,
    id: place ? place.id : "",
    sort: filter?.status ? `status,${filter?.status}` : "id,desc",
  }
  const {
    refCheckboxAll,
    refCheckboxList,
    handleCheckAll,
    handleCheckedItem,
    listChecked,
    setListChecked,
  } = useHandleCheckbox(listRequetTable.map((item) => item.id!) || [])
  const { showError, showSuccess } = useShowMessage()
  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete
        message="tableReservation._message_delete_reservation"
        onClick={handleDeleteListReserTable}
      />
    )
  }
  const handleFeadbackCustommer = (id: number) => {
    setElementModal(
      <ModalFeedbackReservation
        idItem={id}
        handleUpdate={handleUpdateAfterChangeDate}
      />
    )
  }
  const handleShowModalConfirm = (item: book_table) => {
    setElementModal(<ModalConfirm onClick={() => handleChangeStatus(item)} />)
  }
  const handleUpdateAfterChangeDate = (result: book_table) => {
    const newListTable = listRequetTable.map((item) => {
      if (item.id === result.id) {
        item = result
      }
      return item
    })
    setListRequesTable(newListTable)
  }
  const handleChangeStatus = async (item: book_table) => {
    try {
      const result = await reservationTableSvice.putReservationTable(
        {
          ...item,
          status: true,
        },
        item.id!
      )

      if (result) {
        handleUpdateAfterChangeDate(result)
        hideModal()
        showSuccess("tableReservation.changeSuccess")
      }
    } catch (error) {
      showError("message.actions.error.delete_banner")
    }
  }
  const getListRequesResertable = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } =
        await reservationTableSvice.getRequestReserTable(params)
      setListRequesTable([...list])
      setTotalpage(Math.ceil(totalElementPage / 20))
    } catch (error) {
      // console.log("Không lấy được danh sách yêu cầu đặt bàn.")
    }
  }

  const getListRequesResertableScroll = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } =
        await reservationTableSvice.getRequestReserTable(params)
      setListRequesTable([...listRequetTable, ...list])
      setTotalpage(Math.ceil(totalElementPage / 20))
    } catch (error) {
      // console.log("Không lấy được danh sách yêu cầu đặt bàn.")
    }
  }

  const handleDeleteListReserTable = async () => {
    try {
      const listDataDelete = listChecked.map((item) => {
        return {
          id: item,
        }
      })
      await reservationTableSvice.deleteListReserTable(listDataDelete)
      const newData = [...listRequetTable]
      const newDataList = newData.filter(
        (item) => !listChecked.includes(Number(item.id))
      )

      setListRequesTable([...newDataList])
      showSuccess("adminOrderFood.notification.deleteSuccess")
      setListChecked([])
    } catch (error) {
      showError("message.actions.error.delete_banner")
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeySearch(e.target.value)
    setcurrentPage(1)
    setListRequesTable([])
  }
  const searchRequestTable = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } =
        await reservationTableSvice.searchReservationTable(params)
      setListRequesTable([...listRequetTable, ...list])
      setTotalpage(Math.ceil(totalElementPage / 20))
    } catch (error) {
      // console.log("Không lấy được danh sách yêu cầu đặt bàn.")
    }
  }
  const debounceSearch = useCallback(
    debounce((params) => searchRequestTable(params), 700),
    []
  )
  const handleScroll = (e: UIEvent<any>) => {
    const scroolTop = e.currentTarget.scrollTop
    const clientHeight = e.currentTarget.clientHeight
    const scrollHeight = e.currentTarget.scrollHeight
    if (scroolTop + clientHeight >= scrollHeight && currentPage < totalPage) {
      getListRequesResertableScroll({ ...params, page: currentPage + 1 })
      setcurrentPage((preState) => preState + 1)
    }
  }
  useEffect(() => {
    if (keySearch != "") {
      debounceSearch({ ...params, query: keySearch.trim(), page: 0 })
      setcurrentPage(0)
    } else {
      debounceSearch.cancel()
      getListRequesResertable({ ...params, page: 0 })
    }
  }, [filter, place, keySearch])
  return (
    <div
      onScroll={handleScroll}
      className="h-screen overflow-y-scroll hidde-scroll_tb"
    >
      {place ? (
        <h3 className="title-24 font-bold font-IBM_Plex_Sans">{place.name}</h3>
      ) : (
        <TitleOfContentManage name="tableReservation.nameTable" />
      )}
      <div className="mt-10 pb-6">
        <div className="flex flex-col lg:flex-row items-center gap-3 xl:gap-6 justify-between">
          <div className="flex-1 w-full relative">
            <input
              type="text"
              value={keySearch}
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("common.searchInput") as string}
              onChange={handleChangeInput}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex items-center gap-3 xl:gap-6">
            <Button
              onClick={handleDeleteModal}
              text="common.delete"
              className="max-w-[60px] !text-_12 xl:!text-_14 xl:max-w-[177px] whitespace-nowrap text-text_EA222A border-text_EA222A"
              imageLeft={
                <span className="mr-1 lg:mr-2">
                  <ICDeleteTrashLight />
                </span>
              }
              color={"empty"}
            />
            <div className="flex gap-3 xl:gap-6 justify-between">
              <FilterByTime
                time={filter.time}
                handleFilterByTime={(value) => {
                  setFilter({ ...filter, time: value })
                }}
              />
              <FilterPlaceBox place={place} handleChosePlace={setPlace} />
            </div>
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto">
        <div className="w-max xl:w-full">
          <div className="grid grid-cols-[5%_20%_15%_15%_10%_23%_12%] [&>div]:py-2 lg:[&>div]:py-4 border-b text-_16 font-semibold">
            <div>
              <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
            </div>
            <div className="">{t("tableReservation.tableHeader.fullName")}</div>
            <div>{t("tableReservation.tableHeader.phoneNumber")}</div>
            <div>{t("tableReservation.tableHeader.day")}</div>
            <div className="text-center">
              {t("tableReservation.tableHeader.hour")}
            </div>
            <div className="text-center">
              {t("tableReservation.tableHeader.place")}
            </div>
            <div className="relative group">
              <div className="flex items-center gap-[10px] justify-end">
                {t("tableReservation.tableHeader.status")}

                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setFilter({ ...filter, status: "" })
                  }}
                >
                  <ICFilterDropdown color={Colors.text_primary} />
                </div>
              </div>
              <div className="absolute hidden h-0 ease-in duration-75 group-hover:block group-hover:h-[92px] shadow-sm z-20 top-full right-0 w-full bg-white">
                <div
                  onClick={() =>
                    setFilter({ ...filter, status: "desc" } as any)
                  }
                  className={
                    "p-5 text-sm font-normal leading-22 px-4 py-3 cursor-pointer " +
                    (filter?.status === "desc"
                      ? "text-text_white bg-TrueBlue_500"
                      : "text-text_primary bg-white")
                  }
                >
                  {t("tableReservation.reply")}
                </div>
                <div
                  onClick={() => setFilter({ ...filter, status: "asc" } as any)}
                  className={
                    "p-5 text-sm font-normal leading-22 px-4 py-3 cursor-pointer " +
                    (filter?.status === "asc"
                      ? "text-text_white bg-TrueBlue_500"
                      : "text-text_primary bg-white")
                  }
                >
                  {t("tableReservation.noReply")}
                </div>
              </div>
            </div>
          </div>
          {listRequetTable.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[5%_20%_15%_15%_10%_23%_12%] py-2 lg:py-4 border-b text-sm leading-22 font-normal"
              >
                <div>
                  <Checkbox
                    onChange={(event) => handleCheckedItem(event, index)}
                    ref={(element: HTMLInputElement) => {
                      refCheckboxList.current[index] = element
                    }}
                  />
                </div>
                <div onClick={() => handleFeadbackCustommer(item.id!)}>
                  {item.name}
                </div>
                <div onClick={() => handleFeadbackCustommer(item.id!)}>
                  {item.phone}
                </div>
                <div
                  onClick={() => handleFeadbackCustommer(item.id!)}
                  className=""
                >
                  {FomatDateYY_MM_DD(item.chooseDate)}
                </div>
                <div
                  onClick={() => handleFeadbackCustommer(item.id!)}
                  className="text-center"
                >
                  {FomatDateYY_MM_DD(item.chooseDate, true)}
                </div>
                <div
                  onClick={() => handleFeadbackCustommer(item.id!)}
                  className="text-center"
                >
                  {item.chooseInfrastructure}
                </div>
                <div
                  className="flex items-center justify-end gap-1"
                  onClick={() => {
                    !item.status && handleShowModalConfirm(item)
                  }}
                >
                  <div
                    className={
                      "w-3 h-3 rounded-[50%] " +
                      (item.status ? "bg-bg_01A63E" : "bg-red_error")
                    }
                  ></div>
                  <div>
                    {item.status ? (
                      <p className="text-bg_01A63E cursor-pointer">
                        {t("tableReservation.reply")}
                      </p>
                    ) : (
                      <p className="text-red_error cursor-pointer">
                        {t("tableReservation.noReply")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ManageTableReserVation

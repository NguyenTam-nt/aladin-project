import React, { useCallback, useEffect, useState } from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import { Button } from '../components/Button'
import { ICAdd } from '@assets/icons/ICAdd'
import { ICDeleteTrashLight } from '@assets/icons/ICDeleteTrashLight'
import { Checkbox } from '../components/Checkbox'
import { useHandleCheckbox } from '../category-product/useHandleCheckbox'
import { useTranslation } from 'react-i18next'
import { Colors } from '@constants/color'
import { ICFilterDropdown } from '@assets/icons/ICFilterDropdown'
import { useModalContext } from '@contexts/hooks/modal'
import { useNavigate } from 'react-router-dom'
import { SIZE_DATA, VOUCHER_DATE_FORMAT, prefixRootRoute } from '@constants/index'
import { pathsAdmin } from '@constants/routerManager'
import clsx from 'clsx'
import VoucherService from '@services/VoucherService'
import type { IParams, IResponseData } from '@typeRules/index'
import moment from 'moment'
import { VOUCHER_STATE, type IVoucherGet } from '@typeRules/voucher'
import { DiglogComfirmDelete } from '../components/DiglogComfirmDelete'
import { useHandleLoading } from '../components/Loading'
import { useShowMessage } from '../components/DiglogMessage'
import { ModalConfirm } from './components/ModalConfirm'
import MagnifyingGlass from '@assets/icons/MagnifyingGlass'
import { debounce } from 'lodash'

const filters = [
  {
    id: "",
    name: "Tất cả",
  },
  {
    id: VOUCHER_STATE.running,
    name: "Đang diễn ra",
  },
  {
    id: VOUCHER_STATE.waiting,
    name: "Sắp diễn ra",
  },
  {
    id: VOUCHER_STATE.end,
    name: "Đã kết thúc",
  },
];

function VoucherAdmin() {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()
  const navigate = useNavigate()
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();


  const [keyword, setKeyword] = useState("")
  const [filter, setFilter] = useState("")
  const [openFilterStatus, setOpenFilterStatus] = useState(false)
  const [filterStatus, setFilterStatus] = useState("")
  
  const [vouchers, setVouchers] = useState<IResponseData<IVoucherGet>>();
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem, listChecked, setListChecked } = useHandleCheckbox(vouchers?.list.map(e => e.id as number) || []);
  // console.log(vouchers);
  
  useEffect(() => {
    getVoucherData(Number(1))
  }, [])

  useEffect(() => {
    getVoucherData(Number(1))
  }, [filterStatus, filter])

  const getVoucherData = async (page:number) => {
    try {
      VoucherService.get({page: page, size: SIZE_DATA, sort: "id,desc", voucherState: filter != "" ? filter : filterStatus, keyword: keyword})
        .then(response => {
          setVouchers(response)
        })
        .catch(error => {
        })
    } catch (error) {
    } 
  }

  const debounceDropDown = useCallback(
    debounce((params: any) => searchListNew(params), 700),
    []
  );

  useEffect(() => {
    if (keyword != "") {
      const searchParams = {
        query: '"' + keyword.trim() + '"',
        page: 0,
        size: 90000000,
        voucherState: filter != "" ? filter : filterStatus
      };
      debounceDropDown(searchParams);
      return;
    }
    debounceDropDown.cancel();
    getVoucherData(Number(1))
  }, [filterStatus, filter, keyword])

  const searchListNew = async (params: IParams) => {
    try {
      const response =
        await VoucherService.search(params);
        setVouchers(response)
    } catch (error) {
    }
  };

  const handelClickAddVoucher = () => {
    navigate(
      `${prefixRootRoute.admin}/${pathsAdmin.voucher.prefix}/${pathsAdmin.voucher.add}`
    );
  };


  const handleClickChange = (id: any, view: boolean) => {
    navigate(
      `${prefixRootRoute.admin}/${pathsAdmin.voucher.prefix}/${id}?view=${view}`
    );
  }

  const handleShowModalDeleteAll = () => {
    if(listChecked.length > 0) {
      setElementModal(
        <DiglogComfirmDelete
          onClick={handleDeleteAll}
          message="adminVoucher.notification.delete"
        />
      );
    }
  }

  
  const handleDeleteAll = () => {
    showLoading();
    VoucherService
      .deleteAll(listChecked.map(id => {return {id: id}}))
      .then(() => {
        getVoucherData(1)
        setListChecked([])
        showSuccess("adminVoucher.notification.deleteSuccess");
      })
      .catch(() => {
        showError("adminVoucher.notification.deleteError");
      });
  }

  
  const handleShowModalStop = (id: any) => {
    setElementModal(
      <ModalConfirm
        onClick={() => handleStop(id)}
      />
    );
  }

  const handleStop = (id: any) => {
    showLoading();
    VoucherService
      .end(id)
      .then(() => {
        getVoucherData(1)
        showSuccess("adminVoucher.notification.stopSuccess");
      })
      .catch(() => {
        showError("adminVoucher.notification.stopError");
      });
  }

  return (
    <div>
       <div className="flex border-b border-br_D9D9D9 items-center gap-x-[32px] mb-8">
        {filters.map((item, index) => {
          return (
            <button
              onClick={() => setFilter(item.id)}
              className={clsx(
                "pb-2 text-_14 border-b-2 border-transparent cursor-pointer",
                {
                  "text-TrueBlue_500 font-bold  !border-TrueBlue_500":
                    item.id === filter,
                }
              )}
              key={index}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="">
        <div className="-mb-[12px]">
          <TitleTopic name="adminVoucher.title" isRequired={false} />
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={keyword} onChange={e => setKeyword(e.target.value)}
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("adminVoucher.search_placehoder") as string}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={handleShowModalDeleteAll} text="common.delete"
              className="min-w-[92px] whitespace-nowrap text-text_EA222A border-text_EA222A"
              imageLeft={
                <span className="mr-2">
                  <ICDeleteTrashLight />
                </span>
              }
              color={"empty"}
            />
            <Button
              onClick={handelClickAddVoucher} text="adminVoucher.btnAdd"
              className="min-w-[146px] whitespace-nowrap "
              imageLeft={
                <span className="mr-2">
                  <ICAdd/>
                </span>
              }
              color={"empty"}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="border-b border-br_E9ECEF pb-4 grid grid-cols-[25px_88px_128px_88px_118px_68px__1fr_68px] 2xl:grid-cols-[25px_100px_218px_88px_118px_138px__1fr_128px] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
          <div>
            <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
          </div>
          <p>{t("adminVoucher.table.code")}</p>
          <p>{t("adminVoucher.table.name")}</p>
          <p>{t("adminVoucher.table.discount")}</p>
          <p>{t("adminVoucher.table.sum")}</p>
          <p>{t("adminVoucher.table.used")}</p>
          <div className="  cursor-pointer relative"
             onClick={() => setOpenFilterStatus(!openFilterStatus)}
          >
            <p className='flex justify-start gap-3'
             
            >
              {t("adminVoucher.table.status")} 
              {filter == "" && <ICFilterDropdown color={Colors.text_primary} />}
            </p>
            {
              openFilterStatus && filter == "" && <div className="shadow-md absolute top-full left-0 translate-y-4 bg-white z-10">
                <div className={clsx("py-3 min-w-[122px] text-_14  hover:bg-TrueBlue_500 hover:text-white text-GreyPrimary px-4", {
                  "!bg-TrueBlue_500 !text-white": VOUCHER_STATE.running == filterStatus
                })}
                  onClick={() => setFilterStatus(VOUCHER_STATE.running)}
                >
                  {t("adminVoucher.status.running")}
                </div>
                <div className={clsx("py-3 min-w-[122px] text-_14  hover:bg-TrueBlue_500 hover:text-white text-GreyPrimary px-4", {
                  "!bg-TrueBlue_500 !text-white": VOUCHER_STATE.end == filterStatus
                })}
                  onClick={() => setFilterStatus(VOUCHER_STATE.end)}
                >
                  {t("adminVoucher.status.end")}
                </div>
                <div className={clsx("py-3 min-w-[122px] text-_14  hover:bg-TrueBlue_500 hover:text-white text-GreyPrimary px-4", {
                  "!bg-TrueBlue_500 !text-white": VOUCHER_STATE.waiting == filterStatus
                })}
                  onClick={() => setFilterStatus(VOUCHER_STATE.waiting)}
                >
                  {t("adminVoucher.status.waiting")}
                </div>
              </div>
            }
          </div>
          <p className="flex justify-end gap-3">{t("adminVoucher.table.action")}</p>
        </div>
        {vouchers && vouchers.list.map((item, idx) => {
        return (
          <div
            key={item.id}
            className=" border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_88px_128px_88px_118px_68px__1fr_68px] 2xl:grid-cols-[25px_100px_218px_88px_118px_138px__1fr_128px] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
          >
            <div className='flex items-center'>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, idx)}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[idx] = element;
                }}
              />
            </div>
            <p className='line-clamp-1 flex items-center hover:cursor-pointer hover:font-bold' 
              onClick={() => handleClickChange(item.id, true)}
            >{item.code}</p>
            <p className='line-clamp-1 flex items-center'>{item.name}</p>
            <p className='line-clamp-1 flex items-center'>{item.value} 
              {/* {item.typeVoucher == VOUCHER_TYPE.money ? "VNĐ" : "%"} */}
              </p>
            <p className='line-clamp-1 flex items-center'>{item.numBill}</p>
            <p className='line-clamp-1 flex items-center'>{item.used}</p>
            <div className="flex flex-col justify-start gap-2">
              {
                item.voucherState == VOUCHER_STATE.end ? <div className="flex items-center "
                >
                  <span className='text-_14 text-text_red underline'>{t("adminVoucher.status.end")}</span>
                </div> : item.voucherState == VOUCHER_STATE.running ? <div className="flex items-start relative"
                >
                  <span className='text-_14 text-bg_01A63E underline -mt-1'>{t("adminVoucher.status.running")}</span>
                </div> : <div className="flex items-start relative"
                >
                  <span className='text-_14 text-waiting underline -mt-1'>{t("adminVoucher.status.waiting")}</span>
                </div>
              }
              <span className='text-_14 -translate-y-1.5 text-text_primary'>{moment(item.startDate).format(VOUCHER_DATE_FORMAT)} - {moment(item.endDate).format(VOUCHER_DATE_FORMAT)}</span>

            </div>

            <div className="flex justify-end items-center gap-x-[16px]">
              {
                item.voucherState == VOUCHER_STATE.running ? <div className="flex items-center gap-2 cursor-pointer flex-wrap 2xl:flex-nowrap"
                  onClick={() => {}}
                >
                  <span className="text-_14 text-TrueBlue_500 cursor-pointer"
                    onClick={() => handleClickChange(item.id, false)}
                  >{t("adminVoucher.btnStatus.change")}</span>
                  <span className='text-_14 text-text_red cursor-pointer'
                     onClick={() => handleShowModalStop(item.id)}
                  >{t("adminVoucher.btnStatus.stop")}</span>
                </div> :  item.voucherState == VOUCHER_STATE.end ? <div className="flex justify-end relative"
                >
                  <span className='  text-_14  text-text_A1A0A3'>{t("adminVoucher.btnStatus.end")}</span>
                </div> : <div className="flex justify-end relative"
                >
                   <span className="text-_14 text-TrueBlue_500 cursor-pointer"
                    onClick={() => handleClickChange(item.id, false)}
                   >{t("adminVoucher.btnStatus.change")}</span>
                </div>
              }
            </div>
          </div>
        );
      })}
      </div>
    </div>
  )
}

export default VoucherAdmin
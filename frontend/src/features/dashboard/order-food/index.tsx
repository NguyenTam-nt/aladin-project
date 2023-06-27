import React, { ChangeEvent, useEffect, useState } from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import { Button } from '../components/Button'
import { ICDesc } from '@assets/icons/ICDesc'
import { ICAsc } from '@assets/icons/ICAsc'
import { ICDeleteTrashLight } from '@assets/icons/ICDeleteTrashLight'
import { Checkbox } from '../components/Checkbox'
import { useHandleCheckbox } from '../category-product/useHandleCheckbox'
import { useTranslation } from 'react-i18next'
import { Colors } from '@constants/color'
import { useModalContext } from '@contexts/hooks/modal'
import { ICArowDown } from '@assets/icons/ICArowDown'
import ModalOrderFoodDetail from './components/ModalOrderFoodDetail'
import MagnifyingGlass from '@assets/icons/MagnifyingGlass'
import { useNavigate } from 'react-router-dom'
import FilterByTime from './components/FilterByTime'
import FilterPlaceBox from './components/FilterPlaceBox'
import type { IResponseData } from '@typeRules/index'
import { BillStatus, BillStatusContants, type IBill, type IBillGet } from '@typeRules/bill'
import BillService from '@services/BillService'
import { SIZE_DATA } from '@constants/index'
import { FomatDateYY_MM_DD } from '@constants/formatDateY_M_D'
import { fornatDateHour } from '@constants/fornatDateHour'
import { DiglogComfirmDelete } from '../components/DiglogComfirmDelete'
import { useHandleLoading } from '../components/Loading'
import { useShowMessage } from '../components/DiglogMessage'

function OrderFoodAdmin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const {setElementModal} = useModalContext()
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();

  
  const [keySearch, setKeySearch] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState()
  const [place, setPlace] = useState<number>();
  const [bills, setBills] = useState<IResponseData<IBillGet>>()
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem, listChecked, setListChecked } = useHandleCheckbox(
    bills?.list.map(e => e.id as number) || []
  );
  
  useEffect(() => {
    getBillsData(1)
  }, [])

  useEffect(() => {
    getBillsData(1)
  }, [place, timeFilter])
  

  const getBillsData = (page: number) => {
    BillService.get({page: page, size: 100000, sort: "id,desc", id: place, date: timeFilter})
      .then(res => {
        setBills(res)
      })
  }


  const handleClickDetail = (id: number) => {
    setElementModal(<ModalOrderFoodDetail idBill={id} />)
  }

  const handleInputSerch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeySearch(e.target.value);
    navigate("");
    setCurrentPage(1);
  };

  const handleShowModalDeleteAll = () => {
    if(listChecked.length > 0) {
      setElementModal(
        <DiglogComfirmDelete
          onClick={handleDeleteAll}
          message="adminOrderFood.notification.delete"
        />
      );
    }
  }

  
  const handleDeleteAll = () => {
    showLoading();
    BillService
      .deleteAll(listChecked.map(id => {return {id: id}}))
      .then(() => {
        getBillsData(1)
        setListChecked([])
        showSuccess("adminOrderFood.notification.deleteSuccess");
      })
      .catch(() => {
        showError("adminOrderFood.notification.deleteError");
      });
  }

  const handleChangeStatus = (id: number, status: BillStatus) => {
    // console.log(id, status);

    BillService
    .changeStatus(id, status)
    .then(() => {
      getBillsData(1)
    })
    .catch(() => {
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="-mb-[32px]">
          <TitleTopic name="adminOrderFood.title" isRequired={false} />
        </div>
        <div className="flex justify-center items-center gap-4 mb-1">
          <div className="flex-1 relative">
            <input
              type="text"
              value={keySearch}
              onChange={handleInputSerch}
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("adminOrderFood.searchPlaceholder") as string}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <Button
            onClick={() => handleShowModalDeleteAll()} text="common.delete"
            className="min-w-[92px] max-w-[92px]  whitespace-nowrap text-text_EA222A border-text_EA222A"
            imageLeft={
              <span className="mr-2">
                <ICDeleteTrashLight />
              </span>
            }
            color={"empty"}
          />
          <div className="flex gap-6 justify-between">
            <FilterByTime setTimeFilter={setTimeFilter}/>
            <FilterPlaceBox place={place} handleChosePlace={setPlace} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="border-b border-br_E9ECEF pb-4 grid grid-cols-[25px_188px_212px_128px_128px__88px_1fr] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
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
        {bills && bills.list.map((item, idx) => {
        return (
          <div
            key={idx}
            className="border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_188px_212px_128px_128px__88px_1fr] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
          >
            <div className='flex items-center'>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, idx)}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[idx] = element;
                }}
              />
            </div>
            <p className='line-clamp-1 flex flex-col gap-1'>
                <span
                  className='hover:font-bold cursor-pointer' onClick={() => handleClickDetail(item.id)}
                >{item.id}</span> 
                <span className='text-_14 text-text_A1A0A3'>{FomatDateYY_MM_DD(item.createdDate)}</span>
            </p>
            <p className='line-clamp-1 flex items-center'>{item.fullname}</p>
            <p className='line-clamp-1 flex items-center'>{item.phone}</p>
            <p className='line-clamp-1 flex items-center'>{FomatDateYY_MM_DD(item.chooseDate)}</p>
            <p className='line-clamp-1 flex items-center'>{fornatDateHour(item.chooseDate)}</p>
            <div className="flex justify-end gap-x-[16px] w-full cursor-pointer">
              {
               BillStatusContants.cancel == item.status ? <div className="flex items-center justify-end gap-2 cursor-pointer">
                  <select
                    value={item.status}
                    name="place"
                    onChange={(e) => handleChangeStatus(item.id, e.target.value as BillStatus)}
                    className={
                      "text-_14 text-text_red bg-transparent "
                    }
                  > 
                    <option value={ BillStatusContants.wait} className='text-text_primary'>{t("adminOrderFood.table.wait")}</option>
                    <option value={ BillStatusContants.complete} className='text-text_primary'>{t("adminOrderFood.table.done")}</option>
                    <option value={ BillStatusContants.cancel} className='text-text_primary'>{t("adminOrderFood.table.cancel")}</option>
                  </select>
                  {/* <span className='text-_14 text-text_red'>{t("adminOrderFood.table.cancel")}</span>
                  <ICArowDown color={Colors.text_black} /> */}
                </div> :  BillStatusContants.complete == item.status ? <div className="flex items-center justify-end w-fit gap-2 relative">
                  <select
                    value={item.status}
                    name="place"
                    onChange={(e) => handleChangeStatus(item.id, e.target.value as BillStatus)}
                    className={
                      "text-_14 text-bg_01A63E bg-transparent "
                    }
                  > 
                    <option value={ BillStatusContants.wait} className='text-text_primary'>{t("adminOrderFood.table.wait")}</option>
                    <option value={ BillStatusContants.complete} className='text-text_primary'>{t("adminOrderFood.table.done")}</option>
                    <option value={ BillStatusContants.cancel} className='text-text_primary'>{t("adminOrderFood.table.cancel")}</option>
                  </select>
                  {/* <span className='text-_14 text-bg_01A63E -mt-1'>{t("adminOrderFood.table.done")}</span>
                  <ICArowDown color={Colors.text_black}/> */}
                </div> : <div className="flex items-center justify-end w-fit gap-2 relative">
                  <select
                    value={item.status}
                    name="place"
                    onChange={(e) => handleChangeStatus(item.id, e.target.value as BillStatus)}
                    className={
                      "text-_14 text-waiting  w-fit bg-transparent"
                    }
                  > 
                    <option value={ BillStatusContants.wait} className='text-text_primary'>{t("adminOrderFood.table.wait")}</option>
                    <option value={ BillStatusContants.complete} className='text-text_primary'>{t("adminOrderFood.table.done")}</option>
                    <option value={ BillStatusContants.cancel} className='text-text_primary'>{t("adminOrderFood.table.cancel")}</option>
                  </select>
                  {/* <span className='text-_14 text-waiting -mt-1 whitespace-nowrap'>{t("adminOrderFood.table.wait")}</span>
                  <ICArowDown color={Colors.text_black}/> */}
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

export default OrderFoodAdmin
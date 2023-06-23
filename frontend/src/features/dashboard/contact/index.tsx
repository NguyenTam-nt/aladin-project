import React, { useEffect, useState } from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import { Button } from '../components/Button'
import { ICAdd } from '@assets/icons/ICAdd'
import { ICDesc } from '@assets/icons/ICDesc'
import { ICAsc } from '@assets/icons/ICAsc'
import { ICDeleteTrash } from '@assets/icons/ICDeleteTrash'
import { ICDeleteTrashLight } from '@assets/icons/ICDeleteTrashLight'
import { Checkbox } from '../components/Checkbox'
import { useHandleCheckbox } from '../category-product/useHandleCheckbox'
import { useTranslation } from 'react-i18next'
import { Colors } from '@constants/color'
import { ICFilterDropdown } from '@assets/icons/ICFilterDropdown'
import { useModalContext } from '@contexts/hooks/modal'
import ModalResponseContact from './components/ModalResponseContact'
import clsx from 'clsx'
import ContactService from '@services/ContactService'
import { SIZE_DATA } from '@constants/index'
import type { IResponseData } from '@typeRules/index'
import type { IContact } from '@typeRules/contact'
import { DiglogComfirmDelete } from '../components/DiglogComfirmDelete'
import { useHandleLoading } from '../components/Loading'
import { useShowMessage } from '../components/DiglogMessage'
import MagnifyingGlass from '@assets/icons/MagnifyingGlass'

function ContactAdmin() {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()
  const [openFilterStatus, setOpenFilterStatus] = useState(false)
  const [filterStatus, setFilterStatus] = useState<boolean | undefined>()
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();

  const [descId, setDescId] = useState<boolean>(true)
  const [keyword, setKeyword] = useState("")

  const [contacts, setContacts] = useState<IResponseData<IContact>>();
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem, listChecked, setListChecked } = useHandleCheckbox(contacts?.list.map(e => e.id as number) || []);

  useEffect(() => {
    getContactData(Number(1))
  }, [])

  useEffect(() => {
    getContactData(Number(1))
  }, [descId, filterStatus])

  const getContactData = async (page:number) => {
    try {
      ContactService.get({page: page, size: SIZE_DATA, sort2: `id,${descId ? 'desc' : 'asc'}`, sort1: `status,${filterStatus ? 'desc' : 'asc'}`})
        .then(response => {
          setContacts(response)
        })
        .catch(error => {
        })
    } catch (error) {
    } 
  }

  
  const handleClickResponse = (data: IContact) => {
    setElementModal(<ModalResponseContact data={data} loadData={() => getContactData(Number(1))}/>)
  }

  
  const handleShowModalDeleteAll = () => {
    if(listChecked.length > 0) {
      setElementModal(
        <DiglogComfirmDelete
          onClick={handleDeleteAll}
          message="adminContact.notification.delete"
        />
      );
    }
  }

  
  const handleDeleteAll = () => {
    showLoading();
    ContactService
      .deleteAll(listChecked.map(id => {return {id: id}}))
      .then(() => {
        getContactData(Number(1))
        setListChecked([])
        showSuccess("adminContact.notification.deleteSuccess");
      })
      .catch(() => {
        showError("adminContact.notification.deleteError");
      });
  }


  return (
    <div>
      <div className="">
        <div className="-mb-[12px]">
          <TitleTopic name="adminContact.title" isRequired={false} />
        </div>
        <div className="flex items-center justify-between gap-6 pb-4">
          <div className="flex-1 relative">
              <input
                type="text"
                value={keyword} onChange={e => setKeyword(e.target.value)}
                className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
                placeholder={t("adminContact.search_placehoder") as string}
              />
              <div className="absolute left-5 top-2/4 -translate-y-2/4">
                <MagnifyingGlass color="#A1A0A3" />
              </div>
            </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={handleShowModalDeleteAll} text="common.delete"
              className="max-w-[177px] whitespace-nowrap text-text_EA222A border-text_EA222A"
              imageLeft={
                <span className="mr-2">
                  <ICDeleteTrashLight />
                </span>
              }
              color={"empty"}
            />
            <Button
              onClick={() => setDescId(true)} text="common.desc"
              className="max-w-[177px] whitespace-nowrap"
              imageLeft={
                <span className="mr-2">
                  <ICDesc />
                </span>
              }
              color={"empty"}
            />
            <Button
              onClick={() => setDescId(false)} text="common.asc"
              className="max-w-[177px] whitespace-nowrap"
              imageLeft={
                <span className="mr-2">
                  <ICAsc/>
                </span>
              }
              color={"empty"}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="border-b border-br_E9ECEF pb-4 grid grid-cols-[25px_148px_148px_212px_258px__1fr_122px] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
          <div>
            <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
          </div>
          <p>{t("adminContact.table.fullname")}</p>
          <p>{t("adminContact.table.phone")}</p>
          <p>{t("adminContact.table.email")}</p>
          <p>{t("adminContact.table.address")}</p>
          <p>{t("adminContact.table.content")}</p>
          <div className="  cursor-pointer relative"
             onClick={() => setOpenFilterStatus(!openFilterStatus)}
          >
            <p className='flex justify-start gap-3'
             
            >
              {t("adminContact.table.status")} 
              <ICFilterDropdown color={Colors.text_primary} />
            </p>
            {
              openFilterStatus && <div className="shadow-md absolute top-full left-0 translate-y-4 bg-white z-10">
                <div className={clsx("py-3 min-w-[122px] text-_14  hover:bg-TrueBlue_500 hover:text-white text-GreyPrimary px-4", {
                  "!bg-TrueBlue_500 !text-white": filterStatus
                })}
                  onClick={() => setFilterStatus(filterStatus ? undefined : true)}
                >
                  {t("adminContact.table.responsed")}
                </div>
                <div className={clsx("py-3 min-w-[122px] text-_14  hover:bg-TrueBlue_500 hover:text-white text-GreyPrimary px-4", {
                  "!bg-TrueBlue_500 !text-white": filterStatus == false
                })}
                  onClick={() => setFilterStatus(!filterStatus ? undefined : false)}
                >
                  {t("adminContact.table.not_response")}
                </div>
              </div>
            }
          </div>
        </div>
        {contacts && contacts.list.map((item, idx) => {
        return (
          <div
            key={item.id}
            className="cursor-pointer border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_148px_148px_212px_258px__1fr_122px] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
            onClick={() => handleClickResponse(item)}
          >
            <div onClick={(event) => {event.stopPropagation()}}>
              <Checkbox
                onChange={(event) => {handleCheckedItem(event, idx); }}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[idx] = element;
                }}
              />
            </div>
            <p className='line-clamp-1'>{item.fullname}</p>
            <p className='line-clamp-1'>{item.phone}</p>
            <p className='line-clamp-1'>{item.email}</p>
            <p className='line-clamp-1'>{item.address}</p>
            <p className='line-clamp-1'>
              {item.content}
            </p>
            <div className="flex justify-end gap-x-[16px]">
              {
                !item.status ? <div className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-3 h-3 rounded-full bg-text_red"></span>
                  <span className='text-_14 text-text_red underline'>{t("adminContact.table.not_response")}</span>
                </div> : <div className="flex items-start gap-2 relative"
                >
                  <span className="w-3 h-3 rounded-full bg-bg_01A63E"></span>
                  <span className='text-_14 text-bg_01A63E underline -mt-1'>{t("adminContact.table.responsed")}</span>
                  <span className=' absolute top-full right-0 text-_14 -translate-y-1.5 text-text_A1A0A3'>Bởi CuongNM</span>
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

export default ContactAdmin
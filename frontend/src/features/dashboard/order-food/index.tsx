import React from 'react'
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
import { Input } from '../components/Input'
import { ICArowDown } from '@assets/icons/ICArowDown'
import ModalOrderFoodDetail from './components/ModalOrderFoodDetail'

function OrderFoodAdmin() {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } = useHandleCheckbox([1, 2, 3, 4, 5, 6]);

  const handleClickResponse = (data: any) => {
    setElementModal(<ModalOrderFoodDetail data={data} />)
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="-mb-[32px]">
          <TitleTopic name="adminOrderFood.title" isRequired={false} />
        </div>
        <div className="flex justify-center items-center gap-4 mb-1">
          <div className="flex-1">
            <Input value={"Tìm kiếm theo Mã đơn hàng  \ Họ và tên \ Số điện thoại"} />
          </div>
          <Button
            onClick={() => {}} text="common.delete"
            className="min-w-[92px] max-w-[92px]  whitespace-nowrap text-text_EA222A border-text_EA222A"
            imageLeft={
              <span className="mr-2">
                <ICDeleteTrashLight />
              </span>
            }
            color={"empty"}
          />
          <Button
            onClick={() => {}} text="common.desc"
            className="max-w-[177px] whitespace-nowrap"
            imageLeft={
              <span className="mr-2">
                <ICDesc />
              </span>
            }
            color={"empty"}
          />
          <Button
            onClick={() => {}} text="common.asc"
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
      <div className="mt-4">
        <div className="border-b border-br_E9ECEF pb-4 grid grid-cols-[25px_208px_212px_208px_168px__168px_1fr] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
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
        {[1, 2, 3, 4, 5, 6, 7,8].map((item, idx) => {
        return (
          <div
            key={idx}
            className="border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_208px_212px_208px_168px__168px_1fr] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
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
                <span>GiangMy123</span> 
                <span className='text-_14 text-text_A1A0A3'>20/03/2023</span>
            </p>
            <p className='line-clamp-1 flex items-center'>Boo Trần</p>
            <p className='line-clamp-1 flex items-center'>0325666225</p>
            <p className='line-clamp-1 flex items-center'>20/03/2023</p>
            <p className='line-clamp-1 flex items-center'>15:00</p>
            <div className="flex justify-end gap-x-[16px]">
              {
                Math.round(Math.random()) == 1 ? <div className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleClickResponse({})}
                >
                  <span className='text-_14 text-text_red'>{t("adminOrderFood.table.cancel")}</span>
                  <ICArowDown color={Colors.text_black} />
                </div> : <div className="flex items-center gap-2 relative"
                   onClick={() => handleClickResponse(null)}
                >
                  <span className='text-_14 text-bg_01A63E -mt-1'>{t("adminOrderFood.table.done")}</span>
                  <ICArowDown color={Colors.text_black}/>
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
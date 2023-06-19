import React from 'react'
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
import { prefixRootRoute } from '@constants/index'
import { pathsAdmin } from '@constants/routerManager'

function VoucherAdmin() {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()
  const navigate = useNavigate()
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } = useHandleCheckbox([1, 2, 3, 4, 5, 6]);

  const handleClickResponse = (data: any) => {
    setElementModal(<></>)
  }

  const handelClickAddVoucher = () => {
    navigate(
      `${prefixRootRoute.admin}/${pathsAdmin.voucher.prefix}/${pathsAdmin.voucher.add}`
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="-mb-[32px]">
          <TitleTopic name="adminVoucher.title" isRequired={false} />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => {}} text="common.delete"
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
      <div className="mt-4">
        <div className="border-b border-br_E9ECEF pb-4 grid grid-cols-[25px_100px_218px_88px_118px_138px__1fr_128px] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
          <div>
            <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
          </div>
          <p>{t("adminVoucher.table.code")}</p>
          <p>{t("adminVoucher.table.name")}</p>
          <p>{t("adminVoucher.table.discount")}</p>
          <p>{t("adminVoucher.table.sum")}</p>
          <p>{t("adminVoucher.table.used")}</p>
          <p className="flex justify-start gap-3">
              {t("adminVoucher.table.status")} 
            <ICFilterDropdown color={Colors.text_primary} />
          </p>
          <p className="flex justify-end gap-3">{t("adminVoucher.table.action")}</p>
        </div>
        {[1, 2, 3, 4, 5, 6, 7,8].map((item, idx) => {
        return (
          <div
            key={idx}
            className=" border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_100px_218px_88px_118px_138px__1fr_128px] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
          >
            <div className='flex items-center'>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, idx)}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[idx] = element;
                }}
              />
            </div>
            <p className='line-clamp-1 flex items-center'>Sale Off</p>
            <p className='line-clamp-1 flex items-center'>Mã giảm giá trên sản phẩm</p>
            <p className='line-clamp-1 flex items-center'>20%</p>
            <p className='line-clamp-1 flex items-center'>7</p>
            <p className='line-clamp-1 flex items-center'>3</p>
            <div className="flex flex-col justify-start gap-2">
              {
                Math.round(Math.random()) == 1 ? <div className="flex items-center cursor-pointer"
                  onClick={() => handleClickResponse({})}
                >
                  <span className='text-_14 text-text_red underline'>{t("adminVoucher.status.end")}</span>
                </div> : Math.round(Math.random()) == 1 ? <div className="flex items-start relative"
                   onClick={() => handleClickResponse(null)}
                >
                  <span className='text-_14 text-bg_01A63E underline -mt-1'>{t("adminVoucher.status.running")}</span>
                </div> : <div className="flex items-start relative"
                   onClick={() => handleClickResponse(null)}
                >
                  <span className='text-_14 text-waiting underline -mt-1'>{t("adminVoucher.status.waiting")}</span>
                </div>
              }
              <span className='text-_14 -translate-y-1.5 text-text_primary'>21:45 13/04/2023 - 23:00 13/04/2023</span>
            </div>

            <div className="flex justify-end items-center gap-x-[16px]">
              {
                Math.round(Math.random()) == 1 ? <div className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {}}
                >
                  <span className="text-_14 text-TrueBlue_500">{t("adminVoucher.btnStatus.change")}</span>
                  <span className='text-_14 text-text_red'>{t("adminVoucher.btnStatus.stop")}</span>
                </div> : <div className="flex justify-end relative"
                >
                  <span className='  text-_14  text-text_A1A0A3'>{t("adminVoucher.btnStatus.end")}</span>
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
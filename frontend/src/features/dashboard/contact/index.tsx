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
import ModalResponseContact from './components/ModalResponseContact'

function ContactAdmin() {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } = useHandleCheckbox([1, 2, 3, 4, 5, 6]);

  const handleClickResponse = (data: any) => {
    setElementModal(<ModalResponseContact data={data} />)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="-mb-[32px]">
          <TitleTopic name="adminContact.title" isRequired={false} />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => {}} text="common.delete"
            className="max-w-[177px] whitespace-nowrap text-text_EA222A border-text_EA222A"
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
        <div className="border-b border-br_E9ECEF pb-4 grid grid-cols-[25px_148px_148px_212px_258px__1fr_122px] gap-x-4 [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
          <div>
            <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
          </div>
          <p>{t("adminContact.table.fullname")}</p>
          <p>{t("adminContact.table.phone")}</p>
          <p>{t("adminContact.table.email")}</p>
          <p>{t("adminContact.table.address")}</p>
          <p>{t("adminContact.table.content")}</p>
          <p className="flex justify-end gap-3">
              {t("adminContact.table.status")} 
            <ICFilterDropdown color={Colors.text_primary} />
          </p>
        </div>
        {[1, 2, 3, 4, 5, 6, 7,8].map((item, idx) => {
        return (
          <div
            key={idx}
            className="border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_148px_148px_212px_258px__1fr_122px] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
          >
            <div>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, idx)}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[idx] = element;
                }}
              />
            </div>
            <p className='line-clamp-1'>Nguyễn Mạnh Cường</p>
            <p className='line-clamp-1'>0325666225</p>
            <p className='line-clamp-1'>minhanh@gmail.com</p>
            <p className='line-clamp-1'>24 Cự lộc- Thanh Xuân- Hà Nội</p>
            <p className='line-clamp-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum obcaecati totam, doloremque alias vitae harum eius blanditiis. Aliquam quas doloremque provident quisquam sapiente placeat quasi error nihil inventore, ipsum ea!
            Deserunt dignissimos illo nihil reprehenderit iure? Voluptatum repellendus iure saepe aut obcaecati, unde corporis veritatis ab quidem voluptates molestiae tempore! Facere, nam! Porro necessitatibus ducimus in quibusdam neque nesciunt unde!
            Saepe in excepturi, illum fuga consequatur tempora accusantium alias quasi voluptate aliquid quisquam quam mollitia aspernatur? Eum sapiente eligendi tenetur dolorum mollitia, aperiam molestiae quia saepe, asperiores inventore doloremque tempore.
            Corrupti laudantium esse eos! Commodi libero et iste accusamus recusandae excepturi hic esse molestias cum, quo nostrum pariatur itaque non temporibus? Explicabo atque neque iure voluptas adipisci quasi nisi iste!
            Maxime, totam ratione quos quibusdam aliquid aperiam eaque nostrum sint eveniet quis reiciendis animi fugiat excepturi pariatur corrupti et expedita dolorum illum enim tempora deleniti voluptatibus quae magnam quam! Officiis.</p>
            <div className="flex justify-end gap-x-[16px]">
              {
                Math.round(Math.random()) == 1 ? <div className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleClickResponse({})}
                >
                  <span className="w-3 h-3 rounded-full bg-text_red"></span>
                  <span className='text-_14 text-text_red underline'>{t("adminContact.table.not_response")}</span>
                </div> : <div className="flex items-start gap-2 relative"
                   onClick={() => handleClickResponse(null)}
                >
                  <span className="w-3 h-3 rounded-full bg-bg_01A63E"></span>
                  <span className='text-_14 text-bg_01A63E underline -mt-1'>{t("adminContact.table.not_response")}</span>
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
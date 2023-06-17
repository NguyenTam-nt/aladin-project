import { ICEyeOff } from '@assets/icons/ICEyeOff'
import { ICStar } from '@assets/icons/ICStar'
import { formatNumberDot } from '@commons/formatMoney'
import { Colors } from '@constants/color'
import { Button } from '@features/dashboard/components/Button'
import { DiscountItem } from '@features/home/components/DiscountItem'
import { MoneyLineThrough } from '@features/home/components/MoneyLineThrough'
import React from 'react'

export const ProductItem = () => {
  return (
    <div className=" bg-white flex flex-col h-[524px]">
          <div className="relative h-[288px]">
            <DiscountItem discount={30} />
            <div className="flex absolute top-[20px] right-[20px] z-[1]  items-center gap-x-[18px]">
              <button>
                <ICStar width={19} height={19} color={Colors.text_white} />
              </button>
              <button>
                <ICEyeOff color={Colors.text_white} />
              </button>
            </div>
            <div className=" absolute inset-0 bg-header_bg" />
            <img
              className="w-full h-full object-cover"
              src="https://s3-alpha-sig.figma.com/img/b3e3/ded2/7eedd507917a9a46528cac01957ea28d?Expires=1687737600&Signature=f2A2J74Q88T6EUFTQO-nu1wqPQjCtT0tBUUuRvakWugJPCV7H2GwTaZeTaUxpr9f5rbyqPrqp6aYH1VNiz2a~ULMKwCcdQpj1sp6ZUfczGnA~LY~RlsjrdWoSWZ6qKAxn1kY~opCuSPfWG5RZZ5i2j~YJhd-9q7vyHrhra5Qkhc8bqqKomAnhEBsB-sHKqwVc9MPgkXp62mOyXnXJrCPhuziTUCIZeeZuhFYJBUXQByRnwxPbVkXXtXzgXyNQOXkdxWsdCcGCRLEZ-vIGOA5wQqHlNrdU9jfFwOazbKMGO2pz-zTzndXBDJQJbC9XrCa-HIz0GLf4wvulW7OHDKPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt=""
            />
          </div>
          <div className="p-[16px] flex-1 flex flex-col">
            <p className="text-_16 font-semibold text-black">Combo 2 Người lớn ăn thả ga không lo hết món</p>
            <div className="mt-2 flex items-center">
                <span className=" text-_18 font-bold text-text_EA222A">{formatNumberDot(600000)}</span>
                <MoneyLineThrough money={800000} />
            </div>
            <div className="mt-auto">
          <Button
            // onClick={handleNavigation}
            color="empty"
            className=""
            text="adminProduct.update"
          />
          <Button
            // onClick={handleDeleteModal}
            color="empty"
            className="mt-2 border-bg_E73F3F text-bg_E73F3F"
            text="adminProduct.delete"
          />
        </div>
          </div>
        </div>
  )
}

import { ICArrowSeeMore } from '@assets/icons/ICArrowSeeMore'
import { Button } from '@components/Button'
import { TextViewCount } from '@components/TextViewCount'
import { Colors } from '@constants/color'
import { TranslateContext } from '@contexts/Translation'
import useInView from '@hooks/useInView'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '@constants/router'

type Props = {
    isChangeColor?: boolean
    index?: number
    data?: {
      title_vn: string,
      description_vn:string,
      sub_des_vn: string,
      title_ko: string,
      description_ko: string
      sub_des_ko: string,
      view_count: number
    }
}

export const HomeTopicNewsItem = ({isChangeColor = false, index = 0, data}:Props) => {
  const {ref, isInView} = useInView()
  const {isVn} = useContext(TranslateContext)
  const navigate = useNavigate()
  const natigateToDetail = () => {
    navigate(`${paths.news.prefix}/${paths.news.detail}?slug=trao-thuong`)
  }
  return (
    <div ref={ref} className={clsx("w-full p-[12px] lg:p-[16px]  2xl:p-[24px] flex flex-col h-[218px] xl:h-[274px]", {"bg-white": !isChangeColor, "bg-secondary": isChangeColor, "animate__animated animate__fadeInUp":isInView})}
    style={{
      ["--animate-count" as string]: index < 1 ? 1 : 0
    }}
    >
    <p className={clsx("text-_16", {"text-text_primary": !isChangeColor, "text-text_white": isChangeColor})}> {isVn ? data?.title_vn : data?.title_ko}</p>
    <div className={clsx("h-[1px] w-[45px] my-[8px]  xl:my-[16px]", {"bg-br_E9ECEF": !isChangeColor, "bg-text_white": isChangeColor})} />
    <p className={clsx("leading-[36px] text-_18 xl:text-_24", {"text-text_primary": !isChangeColor, "text-text_white": isChangeColor})}>
    {isVn ? data?.description_vn : data?.description_ko}
    </p>
    <p className={clsx("text-text_secondary text-_14", {"text-text_secondary": !isChangeColor, "text-text_white":isChangeColor})}>
    {isVn ? data?.sub_des_vn : data?.sub_des_ko}
    </p>
    <div className="flex mt-auto items-center h-[28px] justify-between w-full">
      <TextViewCount colorEye={isChangeColor ? Colors.text_white : Colors.text_7E8B99} className={clsx({"text-text_white":isChangeColor})} viewCount={data?.view_count ?? 0} />
      <div>
        <Button
        onClick={natigateToDetail}
          image={
            <div className="ml-2">
              <ICArrowSeeMore color={!isChangeColor ? Colors.secondary : Colors.text_white} />
            </div>
          }
          color="empty"
          text="button.see_more"
          className={clsx("text-_16 h-[28px] bg-transparent", {"text-text_secondary": !isChangeColor, "text-text_white":isChangeColor})}
        />
      </div>
    </div>
  </div>
  )
}

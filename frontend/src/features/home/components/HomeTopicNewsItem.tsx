import { ICArrowSeeMore } from '@assets/icons/ICArrowSeeMore'
import { Button } from '@components/Button'
import { TextViewCount } from '@components/TextViewCount'
import { Colors } from '@constants/color'
import clsx from 'clsx'
import React from 'react'

type Props = {
    isChangeColor?: boolean
}

export const HomeTopicNewsItem = ({isChangeColor = false}:Props) => {

  return (
    <div className={clsx("w-full p-[24px] flex flex-col h-[274px]", {"bg-white": !isChangeColor, "bg-secondary": isChangeColor})}>
    <p className={clsx("text-_16", {"text-text_primary": !isChangeColor, "text-text_white": isChangeColor})}>Adipiscing</p>
    <div className={clsx("h-[1px] w-[45px]  my-[16px]", {"bg-br_E9ECEF": !isChangeColor, "bg-text_white": isChangeColor})} />
    <p className={clsx("leading-[36px] text-_24", {"text-text_primary": !isChangeColor, "text-text_white": isChangeColor})}>
      Varius cras at risus nunc ut amet amet etiam.
    </p>
    <p className={clsx("text-text_secondary text-_14", {"text-text_secondary": !isChangeColor, "text-text_white":isChangeColor})}>
      Nunc pretium cursus et orci nisl. Odio lorem aliquet.
    </p>
    <div className="flex mt-auto items-center h-[28px] justify-between w-full">
      <TextViewCount colorEye={isChangeColor ? Colors.text_white : Colors.text_7E8B99} className={clsx({"text-text_white":isChangeColor})} viewCount={556} />
      <div>
        <Button
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

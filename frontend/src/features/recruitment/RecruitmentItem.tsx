import { AddressWork } from "@assets/icons/AddressWork"
import { CalendarIcon } from "@assets/icons/CalendarIcon"
import { DolarIcon } from "@assets/icons/DolarIcon"
import { convertToSlugFunc } from "@commons/common"
import { formatNumberDot, formatNumberDotWithVND } from "@commons/formatMoney"
import { Image } from "@components/Image"
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D"
import type { Recruit_type } from "@typeRules/recruit"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"

interface Props {
  itemRecrui: Recruit_type
}
const RecruitmentItem = ({ itemRecrui }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Link
      to={`/tuyen-dung/${convertToSlugFunc(itemRecrui.title, itemRecrui.id)}`}
      className="min-h-[199px] flex flex-wrap radius-tl-br bg-text_white cursor-pointer"
    >
      <div className="xl:w-2/4 w-full flex xl:justify-start justify-center xl:h-full overflow-hidden rounded-tl-r32">
        <Image alt={itemRecrui.linkMedia} className="w-full h-[199px]" />
      </div>
      <div className="xl:w-2/4 w-full xl:py-4 py-6  px-spc26 flex flex-col justify-between">
        <p className="text-base leading-6 font-semibold line-clamp-2 xl:mb-0 mb-[18px] sm:h-12">
          {itemRecrui.title}
        </p>
        <div className="flex gap-2 xl:mb-0 mb-[18px]">
          <DolarIcon width={24} height={24} />
          <p className="text-sm max-w-[85%] text-secondary leading-22 font-semibold">
            {formatNumberDotWithVND(itemRecrui.salary)}
          </p>
        </div>
        <div className="flex gap-2 xl:mb-0 mb-[18px]">
          <CalendarIcon width={24} height={24} />
          <p className="text-sm max-w-[85%] leading-22 font-normal">
            {t("recruit.end_time")}:
            {FomatDateYY_MM_DD(itemRecrui.expirationDate!)}
          </p>
        </div>
        <div className="flex gap-2">
          <AddressWork width={24} height={24} />
          <p className="text-sm max-w-[85%] leading-22 font-normal line-clamp-1">
            {itemRecrui.address}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default RecruitmentItem

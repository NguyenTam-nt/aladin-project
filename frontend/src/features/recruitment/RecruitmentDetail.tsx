import { AddressWork } from "@assets/icons/AddressWork"
import { CalendarIcon } from "@assets/icons/CalendarIcon"
import { DolarIcon } from "@assets/icons/DolarIcon"
import RecuireImage from "@assets/images/imageRecuire.png"
import { getSlugId } from "@commons/common"
import { formatNumberDotWithVND } from "@commons/formatMoney"
import { Banner } from "@components/Banner"
import { Image } from "@components/Image"
import WapperContent from "@components/WapperContent"
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D"
import { recruitService } from "@services/recruitService"
import { HomeTopicType } from "@typeRules/home"
import type { Recruit_type } from "@typeRules/recruit"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

const RecruitmentDetail = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [recruiItem, setRecruiItem] = useState<Recruit_type | undefined>(
    undefined
  )
  const getRecruitmentById = async () => {
    try {
      if (id) {
        const resultRecruit = await recruitService.getRecruitById(getSlugId(id))
        setRecruiItem(resultRecruit)
      }
    } catch (error) {
      // console.log("Có lỗi không thể lấy thông tin tuyển dụng");
    }
  }
  useEffect(() => {
    getRecruitmentById()
  }, [id])
  return (
    <div>
      <Banner type={HomeTopicType.recruit} />
      {recruiItem && (
        <WapperContent>
          <div className="lg:pb-spc120 pb-20 px-5">
            <h3 className="lg:title-32 title-24 leading-[36px] text-secondary uppercase lg:mb-6 mb-4">
              {recruiItem?.title}
            </h3>
            <div className="flex lg:flex-row flex-wrap lg:items-center lg:gap-5 flex-col">
              <div className="flex flex-wrap items-center gap-2 lg:mb-0 mb-[18px]">
                <DolarIcon width={24} height={24} />
                <p className="text-sm text-secondary leading-22 font-semibold">
                  {formatNumberDotWithVND(recruiItem?.salary)}
                </p>
              </div>
              <div className="flex gap-2 items-center flex-wrap lg:mb-0 mb-[18px]">
                <CalendarIcon width={24} height={24} />
                <p className="text-sm leading-22 font-normal">
                  {t("recruit.end_time")}:
                  {FomatDateYY_MM_DD(recruiItem?.expirationDate!)}
                </p>
              </div>
              <div className="flex w-full gap-2 items-center flex-wrap">
                <AddressWork width={24} height={24} />
                <p className="text-sm leading-22 font-normal max-w-[85%]">
                  {recruiItem?.address}
                </p>
              </div>
            </div>
            <div className="lg:radius-tl-br48 radius-tl-br24 my-6 overflow-hidden">
              <Image
                alt={recruiItem?.linkMedia || RecuireImage}
                className="w-full lg:min-h-[742px]"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: JSON.parse(recruiItem?.content!),
              }}
            ></div>
          </div>
        </WapperContent>
      )}
    </div>
  )
}

export default RecruitmentDetail

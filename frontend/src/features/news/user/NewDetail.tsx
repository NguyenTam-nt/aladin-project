import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import WapperContent from "@components/WapperContent"
import type { newItem_type } from "@typeRules/new"
import { newService } from "@services/newService"
import { Banner } from "@components/Banner"
import { HomeTopicType } from "@typeRules/home"
import { getSlugId } from "@commons/common"

const NewDetail = () => {
  const { id } = useParams()
  const [dataNew, setDataNew] = useState<newItem_type>()
  const getNewById = async (id: string) => {
    try {
      const resultNew = await newService.getNewById(getSlugId(id))
      setDataNew(resultNew)
    } catch (error) {
      // console.log("Không thể lấy dược dữ liệu tin tức.");
    }
  }

  useEffect(() => {
    if (id) {
      getNewById(id)
    }
  }, [id])
  return (
    <div>
      <Banner type={HomeTopicType.news} />
      {dataNew && (
        <WapperContent>
          <div className="pb-spc120 px-5">
            <h3 className="lg:title-32 title-24 leading-[36px] text-secondary uppercase mb-6">
              {dataNew.title}
            </h3>
            <p className="font-semibold text-base text-GreyPrimary">
              {dataNew.description}
            </p>
            <div className="lg:radius-tl-br48 radius-tl-br24 my-6 overflow-hidden">
              <img
                src={dataNew?.linkMedia}
                className="w-full lg:min-h-[742px] h-auto"
                alt=""
              />
            </div>
            <div
              className="mt-4 gm-editor"
              dangerouslySetInnerHTML={{
                __html: dataNew?.content!,
              }}
            ></div>
          </div>
        </WapperContent>
      )}
    </div>
  )
}

export default NewDetail

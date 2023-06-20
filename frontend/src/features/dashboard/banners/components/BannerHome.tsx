import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import React from "react";
import { BannerHomeItem } from "./BannerHomeItem";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { useGetTopic } from "@features/dashboard/home/components/useGetTopic";
import { homeService } from "@services/home";
import { HomeTopicType, type ITopicHome, type ITopicType } from "@typeRules/home";
import { useTranslation } from "react-i18next";

export const BannerHome = () => {
  const { listBanner, setListBanner } = useGetTopic(HomeTopicType.banner_home);
  const { t } = useTranslation();
  const {showLoading} = useHandleLoading()

  const {showError, showSuccess, showWarning} = useShowMessage()

  const handleSubmit = (data:ITopicHome) => {
    showLoading()
    const newList = listBanner?.listBanner ?? []
    const index = newList.findIndex(item => item?.id === data?.id)

    index >= 0 ? newList.splice(index, 1, data) : newList.unshift(data)

    homeService.updateHomeTopic({
      type: HomeTopicType.banner_home,
      listBanner: [...newList]
    }).then((data:ITopicType) => {
      setListBanner(data)
      showSuccess("message.actions.success.post")
    }).catch(() => {
      showError("message.actions.error.post")
    })
  }

  const handleDelete = (id:number) => {
    if(listBanner?.listBanner && listBanner?.listBanner.length > 1) {
      homeService.deleteHomeTopic(id).then(() => {
        const newList = listBanner?.listBanner ?? []
        const index = newList.findIndex(item => item?.id === id)
          if(index >= 0) {
            newList.splice(index, 1)
            setListBanner({
              type: HomeTopicType.banner_home,
              listBanner: [...newList]
            })
            showSuccess("message.actions.success.delete")
          }
      }).catch(() => {
        showError("message.actions.error.delete")
      })
    }else {
      showWarning("message.actions.warning.min_post")
    }
  }
 
  return (
    <>
    <div>
      {/* <TitleInput isRequired={false} name="adminBanner.upload_banner_home" /> */}
      {/* <div className="w-[288px] h-[190px]">
        <InputUploadFile onChange={handleChange} />
      </div> */}
    </div>
    {
      listBanner?.listBanner.map((item) => {
        return (
          <BannerHomeItem key={item.id} data={item} onSubmit={handleSubmit} onDelete={handleDelete} />
        )
      })
    }
    {listBanner?.listBanner.length &&
      listBanner?.listBanner.length >= 5 ? null : (
        <BannerHomeItem  onSubmit={handleSubmit} />
      )}
   
    </>
  );
};

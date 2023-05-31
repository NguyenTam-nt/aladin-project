import React, {
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { Colors } from "@constants/color";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { CardContent } from "./CardContent";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { BannerType, IBanner } from "@typeRules/banner";
import { bannerService } from "@services/banner";
import { uploadService } from "@services/uploadService";
import { PopUpContext } from "@contexts/PopupContext";
import {  PostType } from "@typeRules/post";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";

export const TopicBanner = () => {
  // const { t } = useContext(TranslateContext);
  const { showSuccess, showError } = useContext(PopUpContext);
  const [bannerHome, setBannerHome] = useState<IBanner>();
  const hanldeChangeVideo = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    const image = await uploadService.postImage(formData);
    handleSubmit(image);
  };

  const handleDeleteLogin = async () => {
    if (bannerHome) {
      bannerService
        .putBanner({
          ...bannerHome,
          link: " ",
        })
        .then(() => {
          setBannerHome({ ...bannerHome, link: "" });
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  const { preViewImage, handleChange, handleDelete } = useHandleImage(
    bannerHome?.link,
    hanldeChangeVideo,
    handleDeleteLogin
  );

  const handleSubmit = (link: string) => {
    if (bannerHome) {
      bannerService
        .putBanner({
          ...bannerHome,
          link: link ? link : bannerHome.link,
        })
        .then((data) => {
          setBannerHome(data);
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  useEffect(() => {
    bannerService.getByType(BannerType.bannerHomePost).then((data) => {
      setBannerHome(data?.data?.[0]);
    });
  }, []);

  return (
    <>
      <SubHeaderTopic title="admin._home._topic._banner" />
      <div>
        <div className="flex items-center gap-x-[24px] h-[168px] ">
          <div className="w-[648px] h-full">
            <InputUploadFile onChange={handleChange} />
          </div>
          {preViewImage.trim() ? (
            <div className="w-[312px] h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
      <BannerContent />
    </>
  );
};

const BannerContent = memo(() => {
  const {
    listPost,
    handleShowModal,
    handleShowModalEdit,
    handleDelete,
  } = useHandlePost(PostType.postBanner);

  return (
    <>
      <div className="flex items-center">
        <SubHeaderTopic title="admin._home._topic._content_banner" />
        {listPost.length < 5 ? (
          <Button
            onClick={handleShowModal}
            imageLeft={
              <span className="mr-[12px]">
                <ICPlus color={Colors.secondary} />
              </span>
            }
            className="max-w-[170px] border border-secondary"
            text="button._create_post"
            color="empty"
          />
        ) : null}
      </div>
      <div className="grid grid-cols-4 2xl:grid-cols-5 gap-[24px]">
        {listPost.map((item, index) => {
          return (
            <CardContent
              data={item}
              onModalDelete={() => handleDelete(Number(item.id))}
              onModalEdit={() => handleShowModalEdit(item)}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
});

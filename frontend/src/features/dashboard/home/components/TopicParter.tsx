import React, { useContext, useEffect, useState } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { bannerService } from "@services/banner";
import { BannerType, IBanner } from "@typeRules/banner";
import { uploadService } from "@services/uploadService";
import { PopUpContext } from "@contexts/PopupContext";

export const TopicParter = () => {
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
          setBannerHome({ ...bannerHome, link: " " });
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
    bannerService.getByType(BannerType.bannerParter).then((data) => {
      setBannerHome(data?.data?.[0]);
    });
  }, []);

  return (
    <>
      <SubHeaderTopic title="admin._home._topic._banner_partner" />
      <div>
        <div className="flex items-center h-[168px] ">
          <div className="w-[312px] h-full mr-[24px]">
            <InputUploadFile onChange={handleChange} />
          </div>
          {preViewImage ? (
            <div className="flex-1 h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
      <PartnerLogo />
    </>
  );
};

const PartnerLogo = () => {
  const { showSuccess, showError } = useContext(PopUpContext);
  const [bannerHome, setBannerHome] = useState<IBanner[]>([]);
  const hanldeChangeVideo = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    const image = await uploadService.postImage(formData);
    bannerService
      .post({
        type: BannerType.bannerLogoParter,
        link: image,
      })
      .then((data) => {
        setBannerHome([data, ...bannerHome]);
        showSuccess("message.success._success");
      })
      .catch(() => {
        showError("message.error._error");
      });
  };

  const handleDeleteLogin = async (id: number) => {
    if (bannerHome) {
      bannerService
        .delete(id)
        .then(() => {
          const newBannerHome = [...bannerHome];
          const index = newBannerHome.findIndex((item) => item.id === id);
          newBannerHome.splice(index, 1);
          setBannerHome([...newBannerHome]);
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  const { handleChange } = useHandleImage("", hanldeChangeVideo);

  useEffect(() => {
    bannerService.getByType(BannerType.bannerLogoParter).then((data) => {
      setBannerHome(data?.data);
    });
  }, []);

  return (
    <>
      <SubHeaderTopic title="admin._home._topic._partner" />
      <div className=" grid  grid-cols-3 w-1920:grid-cols-4 gap-[24px]">
        <div className="h-[168px]">
          <InputUploadFile onChange={handleChange} />
        </div>
        {bannerHome.map((item) => {
          return (
            <div key={item.id} className="h-[168px]">
              <ImagePreview
                className=" !object-contain !w-auto !h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                onDelete={() => handleDeleteLogin(Number(item.id))}
                url={item?.link ?? ""}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

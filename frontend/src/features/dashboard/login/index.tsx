import React, { useContext, useEffect, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "../components/ImagePreview";
import { InputUploadFile } from "../components/InputUploadFIle";
import { useHandleImage } from "../hooks/useHandleImage";
import { BannerType, IBanner } from "@typeRules/banner";
import { bannerService } from "@services/banner";
import { PopUpContext } from "@contexts/PopupContext";
import { uploadService } from "@services/uploadService";

export const Login = () => {
  const { t } = useContext(TranslateContext);
  const [bannerHome, setBannerHome] = useState<IBanner>();
  const { showSuccess, showError } = useContext(PopUpContext);
  const handleChangeLogin = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    const image = await uploadService.postImage(formData);
    if (bannerHome) {
      bannerService
        .putBanner({
          ...bannerHome,
          link: image ? image : bannerHome.link,
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

  const handleDeleteLogin = async () => {

    if (bannerHome) {
      bannerService
        .putBanner({
          ...bannerHome,
          link: " "
        })
        .then((data) => {
          setBannerHome({
            ...data,
            link: " "
          });
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };
  const { handleChange, handleDelete, preViewImage } = useHandleImage(
    bannerHome?.link,
    handleChangeLogin,
    handleDeleteLogin
  );

  useEffect(() => {
    bannerService.getByType(BannerType.login).then((data) => {
      setBannerHome(data?.data?.[0]);
    });
  }, []);


  return (
    <div>
      <HeaderAdmin title="admin._login_page.title" />
      <div>
        <p className="text-_24 text-text_primary font-semibold mb-[24px]">
          {t("admin._login_page._des")}
        </p>
        <div className="flex items-center h-[168px] gap-x-[24px]">
          <div className="w-[648px] h-full">
            <InputUploadFile onChange={handleChange} />

          </div>
          {preViewImage ? (
            <div className="w-[312px] h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

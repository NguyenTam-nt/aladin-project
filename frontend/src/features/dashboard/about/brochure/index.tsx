import React, { useContext, useEffect, useState } from "react";
import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { BannerType, IBanner } from "@typeRules/banner";
import { PopUpContext } from "@contexts/PopupContext";
import { uploadService } from "@services/uploadService";
import { bannerService } from "@services/banner";

export const Brochure = () => {
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
             ...data
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
     bannerService.getByType(BannerType.aboutBrochure).then((data) => {
       setBannerHome(data?.data?.[0]);
     });
   }, []);
  return (
    <>
      <HeaderAdmin title="admin._about._brochure._title" />
      <div className="flex items-center h-[168px]">
        <div className="w-[312px] h-full">
          <InputUploadFile onChange={handleChange} />
        </div>
        <div className="w-[312px] h-full ml-[24px]">
        {preViewImage.trim() ? (
            <div className="w-[312px] h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

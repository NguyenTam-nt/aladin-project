import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import TitleInput from "@components/TitleInput";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { GroupInputContent } from "@features/dashboard/components/GroupInputContent";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { Input } from "@features/dashboard/components/Input";
import clsx from "clsx";
import React from "react";

export const BannerHomeItem = ({data}:{data:any}) => {
 
  return (
    <div>
     
      {!!data?.preViewImage ? (
        <div className="mt-[24px]">
          <div className="grid grid-cols-[288px_1fr] relative gap-x-[24px]">
            <div className="flex flex-col">
              <TitleInput
                isRequired={false}
                forId=""
                name="common.image_uploaded"
              />
              <div className="flex-1">
                <div
                  //   onClick={handleClickInput}
                  className={clsx("h-full w-full", {
                    hidden: !data?.preViewImage.trim(),
                  })}
                >
                  <ImagePreview url={data?.preViewImage} />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <GroupInputContent />
            </div>
            <button className=" absolute bottom-0 flex items-center justify-center right-[-64px] h-[190px] w-[40px] bg-bg_F1F1F1">
              <ICDeleteTrashLight />
            </button>
          </div>
          <div className="mt-4">
            <TitleInput name="adminBanner.link" />
            <Input placeholder="adminBanner.link_placeholder" />
          </div>
          <GroupButtonAdmin />
        </div>
      ) : null}
    </div>
  );
};

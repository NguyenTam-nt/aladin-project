import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import React, { ChangeEvent, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ImagePreviewType } from "../useHandleMultiImage";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { windownSizeWidth, withResponsive } from "@constants/index";

type Props = {
  listImage: {
    preViewImage: ImagePreviewType[];
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleDelete: (id: number | string) => void;
    handleMessageFile: () => void;
    message: string;
    // handlePaste,
    isVideo: boolean;
  };
};

export const ProductHandlerImages = memo(({ listImage }: Props) => {
  const { t } = useTranslation();
  const {
    handleNext,
    handlePre,
    navigationNextRef,
    navigationPrevRef,
    NavigationElement,
    currentIndex,
    onActiveIndexChange,
  } = useSwiperNavigationRef();
  const width = useMemo(() => {
    return windownSizeWidth > withResponsive._1280
      ? windownSizeWidth -
          300 -
          (windownSizeWidth > withResponsive._1536 ? 96 : 70 * 2) -
          288 -
          40
      : 1280 - 300 - 70 * 2 - 228 - 40;
  }, []);

  return (
    <div className="col-span-2 flex gap-[24px]">
      <div className="w-[288px]">
        <div className="flex items-baseline">
          {" "}
          <TitleInput name="adminProduct.form.upload_product" />{" "}
          <span className="text-_12 italic ml-2">
            {t("adminProduct.form.maxItem")}
          </span>
        </div>
        <div className="w-[288px] h-[190px]">
          <InputUploadFile
            disabled={listImage.preViewImage.length >= 5}
            multiple
            onChange={listImage.handleChange}
          />
        </div>
      </div>
      {listImage.preViewImage.length ? (
        <div className="flex-1">
          <TitleInput name="common.image_uploaded" />{" "}
          <div className="flex-wrap w-full relative">
            <SwiperComponent
              onActiveIndexChange={onActiveIndexChange}
              navigationNextRef={navigationNextRef}
              navigationPrevRef={navigationPrevRef}
              spaceBetween={24}
              style={{ width }}
              slidesPerView={3}
            >
              {listImage.preViewImage
                .filter((i) => i.previewImage)
                .map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="h-[190px]">
                        <ImagePreview
                          url={item.previewImage}
                          onDelete={() => listImage.handleDelete(item?.id)}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </SwiperComponent>
            {listImage.preViewImage.length > 3 ? (
              <>
                {currentIndex > 0 ? (
                  <button
                    onClick={handlePre}
                    className="absolute top-[50%] translate-y-[-50%] left-[-24px] rotate-[90deg]"
                  >
                    <ICArowDown color={Colors.text_black} />
                  </button>
                ) : null}
                {currentIndex < 1 ? (
                  <button
                    onClick={handleNext}
                    className="absolute top-[50%] translate-y-[-50%] right-[-24px] rotate-[-90deg]"
                  >
                    <ICArowDown color={Colors.text_black} />
                  </button>
                ) : null}
              </>
            ) : null}
            {NavigationElement}
          </div>
        </div>
      ) : null}
    </div>
  );
});

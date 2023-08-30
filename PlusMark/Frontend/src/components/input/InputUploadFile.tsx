import { ICUploadImage } from "@assets/iconElements/ICUploadImage";
import useI18n from "@hooks/useI18n";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { boolean } from "yup";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaseLink?: (link: string) => void;
  isVideos?: boolean;
  elmentNotice?: React.ReactNode;
  multiple?: boolean;
  htmlFor?: string;
  subText?: string;
  rounded?: boolean;
  justImage?: boolean;
  disabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputUploadFile = React.forwardRef(
  (
    {
      onChange,
      onPaseLink,
      isVideos,
      elmentNotice,
      multiple = false,
      htmlFor,
      subText,
      disabled = false,
      rounded = true,
      justImage = false,
      ...props
    }: Props,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const { t } = useI18n();
    const onInputClick = (
      e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      e.currentTarget.value = "";
    };

    return (
      <div className="flex flex-1 flex-col text-sm items-center w-full border-2 border-dashed border-gray-_A1A0A3 h-full justify-center cursor-pointer">
        {!justImage ? (
          <div className="flex items-center flex-row flex-wrap">
            <ICUploadImage width={32} height={32} />
            <div className="flex flex-col ml-[16px]">
              <div className="flex items-center">
                <span className="text-wap-regular">
                  {t(isVideos ? "botton.chosse_video" : "button.chosse_image")}
                </span>
                <label
                  htmlFor={htmlFor}
                  className=" text-blue01 font-bold underline ml-1 text-wap-regular"
                >
                  {t("button.here")}
                  <input
                    ref={ref}
                    onClick={onInputClick}
                    accept={isVideos ? "video/*" : "image/*"}
                    onChange={onChange}
                    hidden
                    multiple
                    type="file"
                    id={htmlFor}
                    {...props}
                    disabled={disabled}
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <label
            htmlFor={htmlFor}
            className=" text-blue01 font-bold underline ml-1 text-wap-regular"
          >
            <ICUploadImage width={32} height={32} />
            <input
              ref={ref}
              onClick={onInputClick}
              accept={isVideos ? "video/*" : "image/*"}
              onChange={onChange}
              hidden
              multiple
              type="file"
              id={htmlFor}
              {...props}
              disabled={disabled}
            />
          </label>
        )}

        {subText && (
          <p className="text-center text-xs font-inter font-normal leading-150% mt-spc10 px-7 text-opacity">
            {subText}
          </p>
        )}
      </div>
    );
  }
);

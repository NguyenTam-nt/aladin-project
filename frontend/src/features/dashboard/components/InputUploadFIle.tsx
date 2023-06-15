import { ICUploadImage } from "@assets/icons/ICUploadImage";
import React, { ChangeEvent, InputHTMLAttributes, memo, useContext, useId, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "./Input";
import { Button } from "./Button";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaseLink?: (link: string) => void;
  isVideos?: boolean;
  isAny?: boolean;
} & InputHTMLAttributes<HTMLInputElement>

export const InputUploadFile = React.forwardRef(
  (
    { onChange, onPaseLink, isVideos, isAny = false, ...props}: Props,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const { t } = useTranslation()
    const id = useId();
    const onInputClick = (
      e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      e.currentTarget.value = "";
    };

    return (
      <div className="flex flex-1 p-[24px] flex-col text-_14 rounded-[5px]  items-center w-full border-2 border-dashed border-text_A1A0A3 h-full justify-center mr-[22px]">
        <div className="flex items-center">
          <ICUploadImage />
          <span className=" text-text_primary ml-[20px]">
            {t(isVideos
                ? "common._chosse_video"
                : "common._chosse_image"  
            )}
          </span>
          <label
            htmlFor={id}
            className=" text-TrueBlue_500 font-bold underline ml-1"
          >
            {t("button._here")}
            <input
              ref={ref}
              onClick={onInputClick}
              accept={
               (isVideos ? "video/*" : "image/*")
              }
              onChange={onChange}
              hidden
              type="file"
              id={id}
              {...props}
            />
          </label>
        </div>
        {onPaseLink ? <InputUploadLink onPaseLink={onPaseLink} /> : null}
      </div>
    );
  }
);

const InputUploadLink = memo(
  ({ onPaseLink }: { onPaseLink: (link: string) => void }) => {
    const { t } = useTranslation()
    const refInput = useRef<HTMLInputElement>(null);
    const handlePaseLink = () => {
      if (refInput.current?.value.trim() !== "") {
        onPaseLink(refInput.current!.value);
        refInput.current!.value = "";
      }
    };
    return (
      <div className="mt-[20px] w-full">
        <div className="flex justify-center items-center relative">
          <div className=" h-[1px] bg-text_A1A0A3 flex-1" />
          <span className="text-_12 text-text_secondary mx-2">
            {" "}
            {t("common._or")}
          </span>
          <div className=" h-[1px] bg-text_A1A0A3 flex-1" />
        </div>
        <div className="w-full flex mt-[12px]">
          <Input
            ref={refInput}
            className="flex-1"
            placeholder="common._pase_link"
          />
          <Button
            onClick={handlePaseLink}
            className=" ml-[24px] max-w-[86px] text-_14 font-bold !px-[12px]"
            color="empty"
            text="button._next"
          />
        </div>
      </div>
    );
  }
);

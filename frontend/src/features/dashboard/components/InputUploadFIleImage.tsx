import { ICUploadImage } from "@assets/icons/ICUploadImage";
// import { Button } from "@components/Button";
// import { Input } from "@components/Input";
import { TranslateContext } from "@contexts/Translation";
import React, { ChangeEvent, InputHTMLAttributes, useContext, useId } from "react";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaseLink?: (link: string) => void;
  isVideos?: boolean;
  isAny?: boolean;
} & InputHTMLAttributes<HTMLInputElement>

export const InputUploadFileImage = React.forwardRef(
  (
    { onChange, isVideos, isAny = false}: Props,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const { t } = useContext(TranslateContext);
    const id = useId();
    const onInputClick = (
      e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      e.currentTarget.value = "";
    };

    return (
      <div className="flex flex-1 p-[24px] flex-col text-_14 rounded-[5px]  items-center w-full border-2 border-dashed h-full justify-center mr-[22px]">
        <div className="flex items-center">
          <ICUploadImage />
          <span className=" text-text_primary ml-[20px]">
            {t("common._chosse_image")}
          </span>
          <label
            htmlFor={id}
            className=" text-secondary font-bold underline ml-1"
          >
            {t("button._here")}
            <input
              ref={ref}
              onClick={onInputClick}
              accept={
                !isAny ? (isVideos ? "video/*" : "image/*") : "video/*,image/*"
              }
              onChange={onChange}
              hidden
              type="file"
              id={id}
              // {...props}
            />
          </label>
        </div>
        {/* {onPaseLink ? <InputUploadLink onPaseLink={onPaseLink} /> : null} */}
      </div>
    );
  }
);

// const InputUploadLink = memo(
//   ({ onPaseLink }: { onPaseLink: (link: string) => void }) => {
//     const { t } = useContext(TranslateContext);
//     const refInput = useRef<HTMLInputElement>(null);
//     const handlePaseLink = () => {
//       if (refInput.current?.value.trim() !== "") {
//         onPaseLink(refInput.current!.value);
//         refInput.current!.value = "";
//       }
//     };
//     return (
//       <div className="mt-[20px] w-full">
//         <div className="flex justify-center items-center relative">
//           <div className=" h-[1px] bg-br_E9ECEF flex-1" />
//           <span className="text-_12 text-text_secondary mx-2">
//             {" "}
//             {t("common._or")}
//           </span>
//           <div className=" h-[1px] bg-br_E9ECEF flex-1" />
//         </div>
//         <div className="w-full flex mt-[12px]">
//           <Input
//             ref={refInput}
//             className="flex-1"
//             placeholder="common._pase_link"
//           />
//           <Button
//             onClick={handlePaseLink}
//             className=" border border-secondary ml-[24px] max-w-[86px] text-_14 font-bold !px-[12px]"
//             color="empty"
//             text="button._next"
//           />
//         </div>
//       </div>
//     );
//   }
// );

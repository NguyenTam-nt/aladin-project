import { UploadFileIcon } from "@assets/icons";
import { FormikErrors } from "formik";
import { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  fileImage: React.MutableRefObject<File | undefined>
  name: string,
  setValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<{
    content: string;
  }>>,
  value: string
}
export default function UploadImageComp(props: Props) {
  const { fileImage, name, setValue, value } = props
  const defaultImage = '/images-raw/default-image.png';

  const handleChoseFile = (file: File) => {
    const src = URL.createObjectURL(file)
    fileImage.current = file
    setValue(name, src)
  };

  const changeInputFileImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      handleChoseFile(file[0]);
      event.target.value = "";
    }
  };

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };

  return (

    <div className="py-5 px-5 rounded-md border border-gray-200 flex justify-between h-[201px]">
      <div className="flex flex-col items-start justify-between h-full">
        <p className="text-wap-regular2 ">
          Tải lên ảnh định dạng PNG, JPEG.
        </p>
        <div
          className={`px-4 py-2 border rounded-md border-main `}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(event) => changeInputFileImage(event)}
            />
            <UploadFileIcon className="mr-5" />
            <span className="text-[#F31A1A] text-lg font-bold">
              Tải lên
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-col mr-32 ">
        <p className="  text-wap-regular2 mb-3">
          Xem trước ảnh tải lên:
        </p>
        <div className="flex items-center justify-center bg-gray rounded-md w-[204px]">
          <img src={value} className="w-full h-full rounded-md aspect-video object-cover" alt="imagedefault" onError={addImageFallback}/>
        </div>
      </div>
    </div>
  )
}
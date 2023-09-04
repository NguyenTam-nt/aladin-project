import { isUrl } from "@utility/types";
import Item from "antd/es/list/Item";
import { forEach } from "lodash";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

interface FileContent {
  index: number;
  imagePrev?: string;
  file?: File;
}
export const useHandleListImage = (
  images?: string[],
  onChange?: (file: File) => void
) => {
  const [files, setFiles] = useState<FileContent[]>([]);
  const [messageError, setMessageError] = useState("");
  const [plainFiles, setPlainFiles] = useState<FileContent[]>([]);

  useEffect(() => {
    if (images) {
    }
  }, [images]);

  //   useEffect(() => {
  //     return () => {
  //       listPreviewImage.forEach((item) => {
  //         URL.revokeObjectURL(item);
  //       });
  //     };
  //   }, []);

  const handleChangeImages = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const indexFile = e.target.files![0];
    if (files.length > 0 && !files[index]) {
      setMessageError("Vui lòng chọn ảnh theo thứ tự");
      return;
    }
    setFiles((prevState) => {
      return [
        ...prevState,
        {
          index,
          imagePrev: URL.createObjectURL(indexFile),
          file: indexFile,
        },
      ];
    });
  };

  const handleDeleteImgPreview = (index: number) => {
    setFiles((prevState) => {
      return prevState.map((item) => {
        if (item.index == index) {
          URL.revokeObjectURL(item.imagePrev!);
          item = { ...item, imagePrev: undefined, file: undefined };
        }
        return item;
      });
    });
  };
  const hanldeDelete = (indexDel: number) => {
    setFiles((prevState) => prevState.filter((item) => item.index != indexDel));
  };

  const handleRemoveByIndex = (index: number) => {
    setPlainFiles((previousPlainFiles) => [
      ...previousPlainFiles.slice(0, index),
      ...previousPlainFiles.slice(index + 1),
    ]);
  };

  const resetImage = () => {};

  return {
    files,
    messageError,
    hanldeDelete,
    handleDeleteImgPreview,
    resetImage,
    handleRemoveByIndex,
    handleChangeImages,
  };
};

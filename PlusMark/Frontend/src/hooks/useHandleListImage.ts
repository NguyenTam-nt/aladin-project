import { isUrl } from "@utility/types";
import Item from "antd/es/list/Item";
import { forEach } from "lodash";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

interface FileContent {
  index: number;
  imagePrev: string;
  file?: File;
}
export const useHandleListImage = (
  images?: string[],
  onChange?: (file: File) => void,
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
    setFiles((prevState)=> {
        return [...prevState, {
            index,
            imagePrev: URL.createObjectURL(indexFile),
            file: indexFile
        }]
    })
  };

  const handleDelete = (index: number)=> {
    setFiles((prevState)=> {
        return prevState.filter((item)=> item.index != index)
    })
  }

  const handleRemoveByIndex = (index: number) => {
    setPlainFiles((previousPlainFiles) => [
      ...previousPlainFiles.slice(0, index),
      ...previousPlainFiles.slice(index + 1),
    ]);
  };


  const resetImage = () => {
  };

  return {
    files,
    messageError,
    handleDelete,
    resetImage,
    handleRemoveByIndex,
    handleChangeImages,
  };
};

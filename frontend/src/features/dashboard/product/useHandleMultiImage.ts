import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const limitImage = 5

export type ImagePreviewType = {
  id: number | string,
  previewImage: string
}

export type FilePreviewType = {
  id: number | string,
  file: File
}

export const useHandleMultiImage = (
  images: ImagePreviewType[],
  onChange?: (file: File[]) => void,
  handleDeleteLogin?: (index:number | string) => void
) => {
  const [preViewImage, setPreViewImage] = useState<ImagePreviewType[]>(images ?? []);
  const refInput = useRef<HTMLInputElement>(null);
  const [file, setCurrentFile] = useState<FilePreviewType[]>([]);
  const [message, setMessage] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  const handleClickInput = useCallback(() => {
    refInput.current?.click();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files && preViewImage.length < 5) {
      const dataFile = Array.from(files)
      const newData = dataFile.slice(0, limitImage - preViewImage.length)
      let listFile:FilePreviewType[] = []
      let listImage:ImagePreviewType[] = []
       newData.forEach((file, index) => {
        const id = uuidv4()
        listImage.push({
          id: `${index}-${id}`,
          previewImage: URL.createObjectURL(file)
        })
        listFile.push({
          id: `${index}-${id}`,
          file
        })
      })

      setCurrentFile([...file, ...listFile]);
      setPreViewImage([...listImage, ...preViewImage]);
      // onChange?.(newArrayList);
    }
  };

  const handleDelete = (id: string | number ) => {
    handleDeleteLogin?.(id);
    const newListImage = [...preViewImage]
    const index = newListImage.findIndex(i => i.id == id)
    if(index !== -1) {
      newListImage.splice(index, 1)
    }
    
    if(file.length) {
      const newArrayList = [...file]
      const index = newArrayList.findIndex(i => i.id == id)
      if(index !== -1 && index < newListImage.length) {
        newArrayList.splice(index, 1)
        setCurrentFile([...newArrayList])
      }
    }
    setPreViewImage([...newListImage]);
  };

  const handleMessageFile = () => {
    setMessage("message.form.required");
  };

  console.log({file})

  return {
    preViewImage,
    handleChange,
    handleDelete,
    file,
    handleMessageFile,
    message,
    // handlePaste,
    isVideo,
    handleClickInput,
    refInput,
    setPreViewImage
  };
};

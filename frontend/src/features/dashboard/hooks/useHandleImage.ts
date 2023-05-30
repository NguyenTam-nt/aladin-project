import { ChangeEvent, useEffect, useState } from "react";


export const useHandleImage = (image?:string, onChange?: (file:File) => void, handleDeleteLogin?: () => void) => {

    const [preViewImage, setPreViewImage] = useState<string>(image ?? "");
    const [file, setCurrentFile] = useState<File>()
    const [message, setMessage] = useState("")

    useEffect(() => {
      if(!preViewImage.trim()) {
        setPreViewImage(image ?? "")
      }
    }, [image, preViewImage])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];
      setCurrentFile(file)
      const link = URL.createObjectURL(file);
      setPreViewImage(link);
      onChange?.(file)
    };
  
    const handleDelete = () => {
      handleDeleteLogin?.()
      setPreViewImage(" ");
      setCurrentFile(undefined)
    };

    const handleMessageFile = () => {
      setMessage("message.warn._required")
    }

    return {
        preViewImage,
        handleChange,
        handleDelete,
        file,
        handleMessageFile,
        message
    }
}

import { ChangeEvent, useEffect, useState } from "react";


export const useHandleMultiImage = (images?:string[], onChange?: (files:File[]) => void, handleDeleteLogin?: () => void) => {

    const [preViewImage, setPreViewImage] = useState<string[]>(images??[]);
    const [linkPasteImage, setLinkPasteImage] = useState<string[]>([])
    const [files, setCurrentFiles] = useState<File[]>([])
    const [message, setMessage] = useState("")

    useEffect(() => {
      if(!preViewImage) {
        setPreViewImage(images ?? [])
      }
    }, [images, preViewImage])
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const filesList = event.target.files;

        if(filesList) {
            const listImage =  Array.from(filesList);
            setCurrentFiles([...listImage, ...files])
           setPreViewImage([...listImage.map(file => URL.createObjectURL(file)), ...preViewImage])
        }
    };

    const onDeleteItem = (index:number) => {
        if(!preViewImage) return
        const newPreViewImage = [...preViewImage]
        newPreViewImage.splice(index, 1)
        setPreViewImage([...newPreViewImage])
    }
  
    const handleDelete = () => {
      setPreViewImage([]);
      handleDeleteLogin?.()
      setCurrentFiles([])
      setLinkPasteImage([])
    };

   const handlePastLink = (link:string) => {
    setLinkPasteImage([link, ...linkPasteImage])
   }

    const handleMessageFile = () => {
      setMessage("message.warn._required")
    }
console.log([...linkPasteImage, ...preViewImage])
    return {
        preViewImage: [...linkPasteImage, ...preViewImage],
        handleChange,
        handleDelete,
        files,
        linkPasteImage,
        handleMessageFile,
        message,
        handlePastLink,
        onDeleteItem
    }
}

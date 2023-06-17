import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

const limitImage = 5

export const useHandleMultiImage = (
  images?: string[],
  onChange?: (file: FileList) => void,
  handleDeleteLogin?: () => void
) => {
  const [preViewImage, setPreViewImage] = useState<string[]>(images ?? []);
  const refInput = useRef<HTMLInputElement>(null);
  const [file, setCurrentFile] = useState<FileList>();
  const [message, setMessage] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    // if(!preViewImage.trim()) {
    setPreViewImage(images ?? []);
    // }
  }, [images]);

  const handleClickInput = useCallback(() => {
    refInput.current?.click();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files && preViewImage.length < 5) {
      const dataFile = Array.from(files)
      const listImage = dataFile.slice(0, limitImage - preViewImage.length).map(file => {
        return URL.createObjectURL(file)
      })

      setCurrentFile(files);
      setPreViewImage([...listImage, ...preViewImage]);
      onChange?.(files);
    }
  };

  const handleDelete = () => {
    handleDeleteLogin?.();
    setPreViewImage([]);
    setCurrentFile(undefined);
  };

  const handleMessageFile = () => {
    setMessage("message.warn._required");
  };

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
    refInput
  };
};

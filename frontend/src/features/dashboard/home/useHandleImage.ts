import { isUrl, validateVideo } from "@commons/common";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export const useHandleImage = (
  image?: string,
  onChange?: (file: File) => void,
  handleDeleteLogin?: () => void,
  handlePasteLink?: (link:string) => void
) => {
  const [preViewImage, setPreViewImage] = useState<string>(image ?? "");
  const refInput = useRef<HTMLInputElement>(null);
  const [file, setCurrentFile] = useState<File>();
  const [message, setMessage] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    // if(!preViewImage.trim()) {
      if(!isUrl(image || "")) {
        setIsVideo(true)
      }else {
        setIsVideo(false)
      }
      setPreViewImage(image ?? "");

    // }
  }, [image]);

  const handleClickInput = useCallback(() => {
    refInput.current?.click();
  }, []);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const file = event.target.files![0];

    if (file.type.includes("video")) {
      setIsVideo(true);
      const messageVideo = await validateVideo(file);
      if (messageVideo) {
        setMessage(messageVideo);
        return;
      }
    } else {
      setIsVideo(false);
    }

    setCurrentFile(file);
    if(!onChange) {
      const link = URL.createObjectURL(file);
      console.log({link})
      setPreViewImage(link);
    }
    onChange?.(file);
  };

  const handleDelete = () => {
    handleDeleteLogin?.();
    setPreViewImage("");
    setCurrentFile(undefined);
  };

  const handleMessageFile = () => {
    setMessage("message.form.required");
  };

  const handlePaste = (link: string) => {
    if (link.includes("https://www.youtube.com/watch?v=")) {
      const splitLink = link.split("v=")[1];
      if (splitLink.trim()) {
        setPreViewImage(splitLink);
        setIsVideo(true);
        handlePasteLink?.(splitLink)
        return;
      }
    }
    setIsVideo(false);
    setPreViewImage(link);
    handlePasteLink?.(link)
  };

  const resetImage = () => {
    setPreViewImage(image || "")
  }

  return {
    preViewImage,
    handleChange,
    handleDelete,
    file,
    handleMessageFile,
    message,
    handlePaste,
    isVideo,
    handleClickInput,
    refInput,
    resetImage
  };
};

import { isUrl } from "@utility/types";
import Item from "antd/es/list/Item";
import { forEach } from "lodash";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

interface FileContent {
  id?: any;
  link?: string;
  file?: File;
}
export const useHandleImage = (
  image?: string,
  images?: string[],
  onChange?: (file: File) => void,
  handleDeleteLogin?: () => void,
  handlePasteLink?: (link: string) => void
) => {
  const [preViewImage, setPreViewImage] = useState<string>(image ?? "");
  const [listPreviewImage, setListPreviewImage] = useState<string[]>(
    images ?? []
  );
  const refInput = useRef<HTMLInputElement>(null);
  const [file, setCurrentFile] = useState<File>();
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [plainFiles, setPlainFiles] = useState<FileContent[]>([]);

  useEffect(() => {
    if (!preViewImage.trim()) {
      if (!isUrl(image || "")) {
        setIsVideo(true);
      } else {
        setIsVideo(false);
      }
      setPreViewImage(image ?? "");
    }
    if (images) {
      setListPreviewImage(images);
    }
  }, [image, images]);

  // chọn nhiều files
  useEffect(() => {
    if (files.length > 0) {
      let listPreview = [];
      for (let i = 0; i < files.length; i++) {
        listPreview.push(URL.createObjectURL(files[i]));
      }
      setListPreviewImage(listPreview);
    }
    return () => {};
  }, [files]);
  useEffect(() => {
    return () => {
      listPreviewImage.forEach((item) => {
        URL.revokeObjectURL(item);
      });
    };
  }, [listPreviewImage]);

  const handleChangeImages = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const indexFile = e.target.files![0];
    if (files.length > 0) {
      const newFiles = [...files];
      if (index == 0) {
        newFiles[0] = indexFile;
        setFiles(newFiles);
      } else {
        const beforeFile = files[index - 1];
        if (beforeFile) {
          newFiles[index] = indexFile;
          setFiles(newFiles);
        } else {
          setMessageError("Chưa chọn file trước đó");
        }
      }
    } else {
      if (index == 0) return setFiles([indexFile]);
      return setMessageError("Chưa chọn file đầu tiên");
    }
  };
  // const handleDeleteFile = (index:number)=> {
  //   if(index ==)
  // }
  // kết thúc chọn nhiều files
  const handleClickInput = useCallback(() => {
    refInput.current?.click();
  }, []);

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>,
    validate?: boolean
  ) => {
    setMessage("");
    const file = event.target.files![0];

    if (file.type.includes("video")) {
      setIsVideo(true);
      //   const messageVideo = await validateVideo(file);
      //   if (messageVideo) {
      //     setMessage(messageVideo);
      //     return;
      //   }
    } else {
      setIsVideo(false);
    }
    if (validate) {
      const regexFile = /(jpeg|jpg|png)/i;
      const maxSizeFile = 5120000;
      if (!regexFile.test(file.type)) {
        return setMessage("Không đúng định dạng");
      } else if (file.size > maxSizeFile) {
        return setMessage("Dung lượng quá 5mb");
      }
    }
    setCurrentFile(file);
    // if (!onChange) {
    const link = URL.createObjectURL(file);
    setPreViewImage(link);
    setPlainFiles([...plainFiles, { id: "id", link: link, file: file }]);
    // }
    onChange?.(file);
    setMessage("");
  };

  const handleDelete = () => {
    handleDeleteLogin?.();
    setPreViewImage("");
    setCurrentFile(undefined);
  };

  const handleRemoveByIndex = (index: number) => {
    setPlainFiles((previousPlainFiles) => [
      ...previousPlainFiles.slice(0, index),
      ...previousPlainFiles.slice(index + 1),
    ]);
  };

  const handleMessageFile = () => {
    setMessage("message.form.required");
  };

  const handlePaste = (link: string) => {
    if (link.includes("https://www.youtube.com/watch?v=")) {
      const splitLink = link.split("?")[1];
      const linkI = new URLSearchParams(splitLink);
      if (linkI.get("v")) {
        setPreViewImage(linkI.get("v") ?? "");
        setIsVideo(true);
        handlePasteLink?.(linkI.get("v") ?? "");
        return;
      }
    }
    setIsVideo(false);
    setPreViewImage(link);
    handlePasteLink?.(link);
  };

  const resetImage = () => {
    setPreViewImage(image || "");
  };

  return {
    file,
    files,
    isVideo,
    message,
    messageError,
    refInput,
    plainFiles,
    preViewImage,
    listPreviewImage,
    handleChange,
    handleDelete,
    handleMessageFile,
    handlePaste,
    handleClickInput,
    resetImage,
    handleRemoveByIndex,
    handleChangeImages,
  };
};

import { ICFileExcel } from "@assets/icons/ICFileExcel";
import { ICFileDOC } from "@assets/icons/ICFileDOC";
import { ICFileImage } from "@assets/icons/ICFileImage";
import { ICFileOther } from "@assets/icons/ICFileOther";
import { ICFilePDF } from "@assets/icons/ICFilePDF";
import { ICFileVideo } from "@assets/icons/ICFileVideo";
import type { IFileList } from "@features/dashboard/documents/hooks/useHandleCreateDocuments";
import React, {useCallback} from "react"

export const GetFileType = (file: IFileList , size : number) => {
  const type = file.type;
  switch (type) {
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return <ICFileImage height={size} width={size}></ICFileImage>;
    case "video/mp4":
    case "video/mpeg":
    case "video/avi":
      return <ICFileVideo height={size} width={size}></ICFileVideo>;
    case "application/pdf":
      return <ICFilePDF height={size} width={size}></ICFilePDF>;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <ICFileDOC height={size} width={size}></ICFileDOC>;
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <ICFileExcel height={size} width={size}></ICFileExcel>;
    default:
      return <ICFileOther height={size} width={size}></ICFileOther>;
  }
};

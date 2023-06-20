import { ICStar } from "@assets/icons/ICStar";
import { Colors } from "@constants/color";
import { fileBytes } from "@constants/index";

export const renderStar = (rate: number, size = 14) => {
  let xhtml: any[] = [];

  for (let i = 1; i <= 5; i++) {
    xhtml.push(
      <span key={i}>
        <ICStar width={size} height={size} color={rate >= i ? Colors.bg_F4A118 : Colors.text_A1A0A3} />
      </span>
    );
  }

  return xhtml;
};

export const getVideoDuration = (file: File) => {
  const video = document.createElement("video");
  video.preload = "metadata";

  const onLoadedMetaDataPromise = new Promise((resolve) => {
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
      video.remove();
    };
  });

  video.src = window.URL.createObjectURL(file);

  return onLoadedMetaDataPromise;
};

export const validateVideo = async (file: File) => {

    if (!file.type.includes("mp4")) {
      return "message.video.type";
    }

    if (file.size > fileBytes._20) {
      return "message.video.size_20";
    }
    const duration = (await getVideoDuration(file)) as number;
    if (duration < 10 || duration > 60) {
      return "message.video.duration";
    }

    return "";
};

export const validateImage = async (file: File) => {

    if (!file.type.includes("image")) {
      return "message.image.type";
    }

    if (file.size > fileBytes._20) {
      return "message.image.size_20";
    }

    return "";
  }



  export const isUrl = (url: string) => {
    const regexp = /(ftp|http|https|blog|data:image):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(url)
  }  

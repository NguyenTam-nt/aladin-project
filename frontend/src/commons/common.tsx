import { ICStar } from "@assets/icons/ICStar"
import { Colors } from "@constants/color"
import { fileBytes } from "@constants/index"

export const renderStar = (rate: number, size = 14) => {
  let xhtml: any[] = []

  for (let i = 1; i <= 5; i++) {
    xhtml.push(
      <span key={i}>
        <ICStar
          width={size}
          height={size}
          color={rate >= i ? Colors.bg_F4A118 : Colors.text_A1A0A3}
        />
      </span>
    )
  }

  return xhtml
}

export const getVideoDuration = (file: File) => {
  const video = document.createElement("video")
  video.preload = "metadata"

  const onLoadedMetaDataPromise = new Promise((resolve) => {
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src)
      resolve(video.duration)
      video.remove()
    }
  })

  video.src = window.URL.createObjectURL(file)

  return onLoadedMetaDataPromise
}

export const validateVideo = async (file: File) => {
  if (!file.type.includes("mp4")) {
    return "message.video.type"
  }

  if (file.size > fileBytes._20) {
    return "message.video.size_20"
  }
  const duration = (await getVideoDuration(file)) as number
  if (duration < 5 || duration > 60) {
    return "message.video.duration"
  }

  return ""
}

export const validateImage = async (file: File) => {
  if (!file.type.includes("image")) {
    return "message.image.type"
  }

  if (file.size > fileBytes._20) {
    return "message.image.size_20"
  }

  return ""
}

export const isUrl = (url: string) => {
  const regexp =
    /(ftp|http|https|blog|data:image):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(url)
}

export const formatDateComment = (stringDate: string) => {
  const dateFomat = new Date(stringDate)
  let year: any = dateFomat.getFullYear()
  let month: any = dateFomat.getMonth() + 1
  let day: any = dateFomat.getDate()
  let hour: any = dateFomat.getHours()
  let minus: any = dateFomat.getMinutes()
  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }

  if (hour < 10) {
    hour = `0${hour}`
  }
  if (minus < 10) {
    minus = `0${minus}`
  }
  return `${year}/${month}/${day}-${hour}:${minus}`
}
// export const FomatDateYY_MM_DD = (stringDate: string) => {
//   const dateFomat = new Date(stringDate);
//   let year: any = dateFomat.getFullYear();
//   let month: any = dateFomat.getMonth() + 1;
//   let day: any = dateFomat.getDate();
//   if (month < 10) {
//     month = `0${month}`;
//   }
//   if (day < 10) {
//     day = `0${day}`;
//   }
//   return `${year}-${month}-${day}`;
// };

export function iOS() {
  if (!navigator) {
    return false
  }
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator?.platform) ||
    // iPad on iOS 13 detection
    (navigator?.userAgent.includes("Mac") && "ontouchend" in document)
  )
}

export const getLinkImageUrl = (
  url: string | undefined,
  width: number,
  height: number,
  quanlity = 100
) => {
  return `${url}/${Math.floor(width)}/${Math.floor(height)}/${quanlity}`
}

const from =
  "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;"
const to =
  "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------"

export function convertToLug(str: string) {
  str = str.replace(/^\s+|\s+$/g, "") // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // remove consecutive hyphens
}

export const convertToSlugFunc = (name: string, id?: number) => {
  return `${convertToLug(name)}-${id ?? 0}`
}

export const getSlugId = (name: string) => {
  return Number(name.split("-").pop())
}

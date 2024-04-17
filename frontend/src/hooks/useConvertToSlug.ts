import { convertToLug } from "@commons/common"

export const useConvertToSlug = () => {
  const convertToSlugFunc = (name: string, id: number) => {
    return `${convertToLug(name)}-${id}`
  }
}

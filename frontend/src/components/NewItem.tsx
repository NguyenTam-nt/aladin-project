import { convertToSlugFunc } from "@commons/common"
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D"
import { pathsAdmin } from "@constants/routerManager"
import type { newItem_type } from "@typeRules/new"
import { Link } from "react-router-dom"
import { Image } from "./Image"

interface Props {
  itemNew: newItem_type
}
const NewItem = ({ itemNew }: Props) => {
  return (
    <Link
      to={`/${pathsAdmin.news.prefix}/${convertToSlugFunc(
        itemNew.title,
        itemNew.id
      )}`}
      className="col-span-1 h-[176px] bg-white min-h-[302px] radius-tl-br cursor-pointer overflow-hidden"
    >
      <Image alt={itemNew.linkMedia || ""} className="w-full h-[176px]" />
      <div className="py-6 px-4 min-h-[126px]">
        <p className="text-base font-semibold mb-1 text-GreyPrimary line-clamp-2 sm:h-12">
          {itemNew?.title ?? ""}
        </p>
        <p className="text-sm leading-5 font-normal text-text_secondary">
          {FomatDateYY_MM_DD(itemNew.createdDate!)}
        </p>
      </div>
    </Link>
  )
}

export default NewItem

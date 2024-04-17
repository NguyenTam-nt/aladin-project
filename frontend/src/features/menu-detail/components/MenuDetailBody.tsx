import { getSlugId } from "@commons/common"
import { Loading } from "@features/dashboard/components/Loading"
import { productService } from "@services/product"
import type { IProduct } from "@typeRules/product"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GroupStar } from "./GroupStar"
import { MenuDetailInfo } from "./MenuDetailInfo"
import { MenuDetailSlider } from "./MenuDetailSlider"
export const MenuDetailBody = () => {
  const [product, setProduct] = useState<IProduct>()
  const params = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params?.id) {
      setLoading(true)
      productService
        .getById(getSlugId(params?.id))
        .then((data) => {
          setProduct(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [params?.id])

  return product ? (
    <div className="w-rp py-[24px] lg:py-[120px]">
      <div className="flex flex-col lg:flex-row gap-x-[24px]">
        <div className=" w-full lg:w-[424px]">
          <MenuDetailSlider data={product?.listMedia ?? []} />
        </div>
        <div className=" lg:w-[calc(100%_-_424px)]">
          <MenuDetailInfo data={product} />
        </div>
      </div>
      <GroupStar />
    </div>
  ) : loading ? (
    <div className="flex justify-center items-center">
      {" "}
      <Loading />
    </div>
  ) : null
}

import { ICEye } from "@assets/icons/ICEye"
import { ICEyeOff } from "@assets/icons/ICEyeOff"
import { ICStar } from "@assets/icons/ICStar"
import { formatNumberDotSlice } from "@commons/formatMoney"
import { Colors } from "@constants/color"
import { prefixRootRoute } from "@constants/index"
import { pathsAdmin } from "@constants/routerManager"
import { useModalContext } from "@contexts/hooks/modal"
import { Button } from "@features/dashboard/components/Button"
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete"
import { useShowMessage } from "@features/dashboard/components/DiglogMessage"
import { DiscountItem } from "@features/home/components/DiscountItem"
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough"
import { productService } from "@services/product"
import type { IProduct } from "@typeRules/product"
import clsx from "clsx"
import React, { memo } from "react"
import { useNavigate } from "react-router-dom"
import { DiglogComfirm } from "./DiglogComfirm"
import { DiglogMessage } from "./DialogMessage"
import { getLinkImageUrl } from "@commons/common"
import { Image } from "@components/Image"

type Props = {
  data: IProduct
  onDelete: (id: number) => void
  onUpdate: (data: IProduct) => void
}

export const ProductItem = memo(({ data, onDelete, onUpdate }: Props) => {
  const navigate = useNavigate()
  const { setElementModal } = useModalContext()
  const { showSuccess, showError } = useShowMessage()
  const handleNavigation = () => {
    navigate(`${prefixRootRoute.admin}/${pathsAdmin.product.prefix}/${data.id}`)
  }

  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete
        message="adminProduct.message_delete"
        onClick={handleDelete}
      />
    )
  }

  const handleDelete = () => {
    onDelete(Number(data.id))
  }

  const handleShowHome = () => {
    productService
      .patchHome(Number(data.id))
      .then((data) => {
        onUpdate(data)
        showSuccess("message.actions.success.update")
      })
      .catch((error) => {
        if (error?.response?.data.status !== 500) {
          showError(
            error?.response?.data?.message ||
              "message.actions.error.delete_banner"
          )
        } else {
          showError("message.actions.error.delete_banner")
        }
      })
  }

  const handleDisplayModal = () => {
    if (data.show) {
      if (data.priority) {
        setElementModal(
          <DiglogMessage message="adminProduct.messsge_confirm_hide" />
        )
      } else {
        setElementModal(
          <DiglogComfirm
            message="adminProduct.message_eye"
            onClick={handleDisplay}
          />
        )
      }
    } else {
      handleDisplay()
    }
  }

  const handleDisplay = () => {
    productService
      .patchShow(Number(data.id))
      .then((data) => {
        onUpdate(data)
        showSuccess("Cập nhật thành công.")
      })
      .catch((error) => {
        if (error?.response?.data.status !== 500) {
          showError(
            error?.response?.data?.message ||
              "message.actions.error.delete_banner"
          )
        } else {
          showError("message.actions.error.delete_banner")
        }
      })
  }

  return (
    <div className=" bg-white flex flex-col h-[524px]">
      <div className="relative h-[288px]">
        {Number(data?.percent) > 0 && data.price !== data.pricePromotion ? (
          <DiscountItem discount={Math.ceil(data?.percent || 0)} />
        ) : null}
        <div className="flex absolute top-[20px] right-[20px] z-[1]  items-center gap-x-[18px]">
          {data?.isStar ? (
            <button onClick={handleShowHome}>
              <ICStar
                width={19}
                height={19}
                color={data.priority ? Colors.bg_F4A118 : Colors.text_white}
              />
            </button>
          ) : null}
          <button onClick={handleDisplayModal}>
            {data.show ? <ICEye /> : <ICEyeOff color={Colors.text_white} />}
          </button>
        </div>
        <div className=" absolute inset-0 bg-header_bg" />
        <Image
          className="w-full h-full object-cover"
          alt={getLinkImageUrl(data?.linkMedia + "", 200, 288)}
        />
      </div>
      <div
        className={clsx("p-[16px] flex-1 flex flex-col", {
          "opacity-40": !data.show,
        })}
      >
        <p className="text-_16 line-clamp-2 font-semibold text-black">
          {data?.name}
        </p>
        <div className="mt-2 flex line-clamp-1 items-center">
          <span className=" text-_18  font-bold text-text_EA222A">
            {formatNumberDotSlice(Number(data?.pricePromotion))}
          </span>
          {data.price !== data.pricePromotion &&
          data?.pricePromotion.toString().length <= 8 ? (
            <MoneyLineThrough money={Number(data.price)} />
          ) : null}
        </div>
        <div className="mt-auto">
          <Button
            onClick={handleNavigation}
            color="empty"
            className=""
            text="adminProduct.update"
          />
          <Button
            onClick={handleDeleteModal}
            color="empty"
            className="mt-2 border-bg_E73F3F text-bg_E73F3F"
            text="adminProduct.delete"
          />
        </div>
      </div>
    </div>
  )
})

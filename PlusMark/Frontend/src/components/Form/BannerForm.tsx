import UploadBannerItem from "@components/AdminComponents/Banner/UploadBannerItem";
import { Banner } from "@services/BannerServices";
import { useCallback } from "react";

function ItemRender({
  banner,
  index
}: {
  banner: Banner
  index: number
}) {
  const UploadItemRender = useCallback(() => {
    return (
      <UploadBannerItem {...banner} index={index} />
    )
  }, [banner.images])

  return <UploadItemRender />
}

interface Props {
  banners: Array<Banner>
}

export default function BannerForm(props: Props) {
  const { banners } = props

  return (
    <>
      {Object.values(banners).map((item, key) => (
        <ItemRender
          key={key}
          index={key}
          banner={item}
        />
      ))}
    </>
  )
}
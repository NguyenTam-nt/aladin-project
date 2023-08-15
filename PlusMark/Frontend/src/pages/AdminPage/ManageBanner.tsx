import BannerForm from "@components/Form/BannerForm";
import LoadingScreen from "@components/LoadingScreen";
import BannerServices, { Banner } from "@services/BannerServices";
import { useEffect, useState } from "react";

function ManageBanner() {
  const [banners, setBanners] = useState<Array<Banner>>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const activedBanner: {
    [x: string]: Banner
  } = {
    'HOMEPAGE': {
      id: 'HOMEPAGE',
      label: 'Quản lý banner trang chủ',
      max: 5,
      images: []
    },
    'RECENTLY_HOMEPAGE': {
      id: 'RECENTLY_HOMEPAGE',
      label: 'Quản lý ảnh hàng mới về ở trang chủ',
      max: 5,
      images: []
    },
    'HOTSOLD_HOMEPAGE': {
      id: 'HOTSOLD_HOMEPAGE',
      label: 'Quản lý ảnh sản phẩm bán chạy ở trang chủ',
      max: 5,
      images: []
    },
    'SEARCH': {
      id: 'SEARCH',
      label: 'Quản lý banner trang tìm kiếm',
      max: 1,
      images: []
    },
    'NEWS': {
      id: 'NEWS',
      label: 'Quản lý banner trang tin tức',
      max: 1,
      images: []
    },
    'PRODUCT': {
      id: 'PRODUCT',
      label: 'Quản lý banner trang sản phẩm',
      max: 5,
      images: []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await BannerServices.get()
        if (response.status == 200) {
          const data = response.data.data

          const objBanners = data.reduce(
            (obj: Banner, item: Banner) => Object.assign(obj, { [item.id]: item }), {})

          const newBanners = Object.keys(activedBanner).map((item) => {
            const idx = Object.keys(objBanners).indexOf(item)
            if (idx !== -1) {
              return {
                ...activedBanner[item],
                images: objBanners[item].images,
                id: item
              }
            }
            return activedBanner[item]
          })

          setBanners(newBanners)
        }
      } catch (ex) {
        console.log(ex)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="pt-9 pb-10px flex-1 xl:pl-8">
      <h2 className="titlePage">Quản lý banner</h2>
      <p className="text-base leading-5 font-normal text-gray-300 mb-6 mt-1">
        Lưu ý: hình ảnh dưới 20MB. Định dạng đuôi jpg, png.
      </p>
      <BannerForm
        banners={banners}
      />
    </div>
  );
}

export default ManageBanner;

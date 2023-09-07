import BannerForm from "@components/Form/BannerForm";
import LoadingScreen from "@components/LoadingScreen";
import { ToastContex } from "@contexts/ToastContex";
import BannerServices, { Banner } from "@services/BannerServices";
import { useContext, useEffect, useState } from "react";

function ManageBanner() {
  const [banners, setBanners] = useState<Array<Banner>>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const activedBanner: {
    [x: string]: Banner
  } = {
    'HOMEPAGE': {
      id: 'HOMEPAGE',
      name: 'HOMEPAGE',
      label: 'Quản lý banner Trang chủ',
      max: 5,
      images: []
    },
    'ABOUTUS': {
      id: 'ABOUTUS',
      name: 'ABOUTUS',
      label: 'Quản lý banner Giới thiệu',
      max: 5,
      images: []
    }
    // ,
    // 'HOTSOLD_HOMEPAGE': {
    //   id: 'HOTSOLD_HOMEPAGE',
    //   name: 'HOTSOLD_HOMEPAGE',
    //   label: 'Quản lý ảnh sản phẩm bán chạy ở trang chủ',
    //   max: 5,
    //   images: []
    // }
    // ,
    // 'SEARCH': {
    //   id: 'SEARCH',
    //   label: 'Quản lý banner trang tìm kiếm',
    //   max: 1,
    //   images: []
    // },
    // 'NEWS': {
    //   id: 'NEWS',
    //   label: 'Quản lý banner trang tin tức',
    //   max: 1,
    //   images: []
    // },
    // 'PRODUCT': {
    //   id: 'PRODUCT',
    //   label: 'Quản lý banner trang sản phẩm',
    //   max: 5,
    //   images: []
    // }
  }
  const { onAddToast } = useContext(ToastContex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await BannerServices.get()
          const data = response.data

          const objBanners = data.reduce(
            (obj: Banner, item: Banner) => Object.assign(obj, { [item.name]: item }), {})
          const newBanners = Object.keys(activedBanner).map((item) => {
            const idx = Object.keys(objBanners).indexOf(item)
            if (idx !== -1) {
              return {
                ...activedBanner[item],
                images: objBanners[item].images,
                id: objBanners[item].id
              }
            }
            return activedBanner[item]
          })
          newBanners.forEach(async (newBanner: Banner) => {
            if (typeof newBanner.id !== 'number') {
              const newBannerData = {
                name: newBanner.name,
                images: []
              };
              await BannerServices.post(newBannerData);
            }
          });
          setBanners(newBanners)
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

      <BannerForm
        banners={banners}
      />
    </div>
  );
}

export default ManageBanner;

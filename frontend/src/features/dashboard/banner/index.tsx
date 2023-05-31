import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { SubHeaderTopic } from "../home/components/SubHeaderTopic";
import { ICAdd } from "@assets/icons/ICAdd";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "../components/ImagePreview";
import { ModalContext } from "@contexts/ModalContext";
import { ModalBanner } from "./ModalBanner";
import { bannerService } from "@services/banner";
import { BannerType, IBanner } from "@typeRules/banner";
import { PopUpContext } from "@contexts/PopupContext";

const titlebanners = [
  {
    type: BannerType.about,
    name: "Quản lý banner giới thiệu",
    nameKo: "소개 배너 관리",
  },
  {
    type: BannerType.news,
    name: "Quản lý banner Tin tức",
    nameKo: "뉴스 배너 관리",
  },
  {
    type: BannerType.notice,
    name: "Quản lý banner thông báo",
    nameKo: "알림 배너 관리",
  },
  {
    type: BannerType.file_document,
    name: "Quản lý banner tài liệu văn bản",
    nameKo: "텍스트 문서 배너 관리",
  },
  {
    type: BannerType.cadres,
    name: "Quản lý banner Cán bộ",
    nameKo: "임원 배너 관리",
  },
  {
    type: BannerType.subject,
    name: "Quản lý banner môn học",
    nameKo: "제목 배너 관리",
  },
  {
    type: BannerType.library_image,
    name: "Quản lý banner thư viên hình ảnh",
    nameKo: "이미지 갤러리 배너 관리",
  },
  {
    type: BannerType.library_video,
    name: "Quản lý banner thư viện video",
    nameKo: "동영상 갤러리 배너 관리",
  },
];

export const Banner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    const listRequests = [
      bannerService.getByType(BannerType.about),
      bannerService.getByType(BannerType.news),
      bannerService.getByType(BannerType.notice),
      bannerService.getByType(BannerType.file_document),
      bannerService.getByType(BannerType.cadres),
      bannerService.getByType(BannerType.subject),
      bannerService.getByType(BannerType.library_image),
      bannerService.getByType(BannerType.library_video),
    ]
    Promise.all(listRequests).then((data) => {
      const listBanner = data.map(item => item?.data?.[0])
      setBanners([...listBanner]);
    })
  }, []);


  const handlePutBanner = (data:IBanner) => {
    const newBanners = [...banners]
    const index = newBanners.findIndex(item => item.id === data.id)
    newBanners.splice(index, 1, data)
    setBanners([...newBanners])
  }

  const handleDeleteBanner = (id:number) => {
    const newBanners = [...banners]
    const index = newBanners.findIndex(item => item.id === id)
    newBanners.splice(index, 1, {
      ...newBanners[index],
      link: ""
    })
    setBanners([...newBanners])
  }

  return (
    <>
      <HeaderAdmin title="admin._banner._title" />
      {banners.map((item) => {
        return <BannerItem onDelete={handleDeleteBanner} onPut={handlePutBanner} key={item.id} data={item} />;
      })}
    </>
  );
};

type Props = {
  data: IBanner;
  onPut: (data:IBanner) => void;
  onDelete: (id:number) => void
};

export const BannerItem = memo(({ data, onPut, onDelete }: Props) => {
  const { t, isVn } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);
  const {showError, showSuccess} = useContext(PopUpContext)
  const handleShowModal = () => {
    setElementModal(<ModalBanner onSubmit={onPut} data={data} />);
  };

  const title = useMemo(() => {
    const item = titlebanners.find((_i) => _i.type === data.type);
    return isVn ? item?.name : item?.nameKo;
  }, [data.type, isVn]);

  const handleDelete = useCallback(() => {
    bannerService.putBanner({
      ...data,
      link: " "
    }).then(() => {
      onDelete(Number(data.id))
      showSuccess("message.success._success")
    }).catch(() => {
      showError("message.error._error")
    })
  }, [data, onDelete, showError, showSuccess])


  return (
    <div>
      <SubHeaderTopic title={title ?? ""} />
      <div className="flex gap-[24px]">
        <div className="flex flex-col items-center flex-1">
          <div className="w-full bg-bg_F5F7F9 flex items-center justify-center h-[168px]">
            <button onClick={handleShowModal}>
              <ICAdd width={48} height={48} />
            </button>
          </div>
          <p className="mt-[16px] text-_18 font-semibold text-text_primary">
            {t("button._add_banner")}
          </p>
        </div>
        <div className="flex-1 h-[168px]">
          <ImagePreview onDelete={handleDelete} url={data?.link ?? ""} />
        </div>
      </div>
    </div>
  );
});

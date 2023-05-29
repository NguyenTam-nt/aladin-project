import React, { useContext, useEffect, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";

import Pagination from "../components/Pagination";
import { ModalContext } from "@contexts/ModalContext";
import { ModalCreate } from "./components/ModalCreate";
import { TranslateContext } from "@contexts/Translation";
import { ICAdd } from "@assets/icons/ICAdd";
import { ICClear } from "@assets/icons/ICClear";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { galleryService } from "@services/gallery";
import { IVideo } from "@typeRules/gallery";
import { PAGE_SIZE } from "@constants/contain";

export const ManageLibraryVideo = () => {
  const { t  ,isVn} = useContext(TranslateContext);
  const [currenPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isShow, setIsShow] = useState<number>(-1);
  const [data, setData] = useState<IVideo[]>([]);
  const { setElementModal } = useContext(ModalContext);
  const handleShowModalDelete = (id : number) => {
    setElementModal(
      <DialogConfirmDelete onClick={() => onDeleteById(id)} message={t("video.delete_album", { name:  data.filter((item) => item.id === id)?.[0]?.nameKo,})} />
    );
  };
  const getVideos = (page : number) => { 
    galleryService.getVideo({ page: 0, size: PAGE_SIZE }).then((video) => {
      setData(video.data);
      setTotalPage(Math.ceil(video.total / PAGE_SIZE));
    });
  }

  const onDeleteById = (id: number) => {
    galleryService
      .deleteVideo(id)
      .then(() => {
     
        if (currenPage === totalPage && totalPage !== 1) {
          if ((id && data.length === 1) ) {
            getVideos(currenPage - 1);
            setCurrentPage(currenPage - 1);
          }
        } else {
          getVideos(currenPage);
        }
      
      });
  };
  const handleShowModal = () => {
    setElementModal(<ModalCreate />);
  };


  useEffect(() => {
    getVideos(0)
  }, []);
  const changePage = (page: number) => {
    setCurrentPage(page);
    getVideos(page - 1);
  };

  return (
    <div className="px-[24px]">
      <HeaderAdmin title="video._title" />
      <p className="text-_24 text-text_primary mt-[-10px]">
        {t("video.title_list")}
      </p>
      <div className="grid grid-cols-2 gap-[24px] mt-[40px]">
        <div>
          <button
            className="flex h-[312px] w-full items-center   justify-center  bg-bg_F5F7F9"
            onClick={handleShowModal}
          >
            <ICAdd></ICAdd>
          </button>
          <p className="text-_24 text-text_primary  text-center line-clamp-2 mt-[16px]">
            {t("video.title_create_new")}
          </p>
        </div>
        {data.map((item, index) => (
          <div key={ item.id}>
            <button
              onMouseEnter={() => setIsShow(index)}
              onMouseLeave={() => setIsShow(-1)}
              onClick={() => {
                handleShowModalDelete(item.id);
              }}
              className="relative w-full"
            >
              {isShow === index && (
                <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-30px] translate-y-[-37px]">
                  <ICClear height={75} width={60}></ICClear>
                </div>
              )}
              <img
                className="h-[312px] w-[648px]  items-center justify-center object-cover"
                style={{
                  opacity: isShow === index ? 0.5 : 1,
                }}
                src="https://s3-alpha-sig.figma.com/img/b69c/0ba2/adc1ec8c23b20a5518839269dfe8aa70?Expires=1685923200&Signature=ly2GkZoIgjvlhGwucbrz7id6XWMI2dR29waQ8NgQbPIvn8jlwZs3h8CL7PwYRQBY~z1ZG3mTqzckMM6DQZR1dOti8n-OIcd~oKZK0kpW89tSv8RTrMcLj3Kb~b3zywMc8d4ncPdq3UEm7w10Yqzr47VXeirP3WRQ6VG-upChaORlVMXef7T2K4izdUNM53J4BGt7niD7WNh62dDxYngEISJIgQ1FnXUKskjekY0viBF75Ad4EhM9BWwAaj2TGH2X1XihSW02vyBPp9YbmXO0Ovxp1OEjHwrJijWpo8cqQaNNYosCjBQdox~Iy5fYH9w7c-cRIBmcN1vomo7kcQDPGw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              ></img>
            </button>

            <p className="text-_24 text-text_primary   line-clamp-2 mt-[16px]">
             {isVn && item?.name || item.nameKo}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-[120px] flex justify-end">
        <Pagination
          currenPage={currenPage}
          setCurrentPage={changePage}
          total={totalPage}
        />
      </div>
    </div>
  );
};

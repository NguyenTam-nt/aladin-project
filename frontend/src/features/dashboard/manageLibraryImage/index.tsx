import React, { useContext, useEffect, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import Pagination from "../components/Pagination";
import { ModalContext } from "@contexts/ModalContext";
import { ModalCreate } from "./components/ModalCreate";
import { TranslateContext } from "@contexts/Translation";
import { ICAdd } from "@assets/icons/ICAdd";
import { ICClear } from "@assets/icons/ICClear";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { Link } from "react-router-dom";
import { pathsAdmin } from "@constants/routerAdmin";
import type { IGallery } from "@typeRules/gallery";
import { PopUpContext } from "@contexts/PopupContext";
import { galleryService } from "@services/gallery";
import { PAGE_SIZE } from "@constants/contain";

export const ManageLibraryImage = () => {
  const { t  , isVn} = useContext(TranslateContext);
  const [currenPage, setCurrentPage] = useState(1);
  const [isShow, setIsShow] = useState<number>(-1);
  const { setElementModal } = useContext(ModalContext);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [data, setData] = useState<IGallery[]>([]);
  const { showSuccess } = useContext(PopUpContext)

  const handleShowModalDelete = (id: number) => {
    setElementModal(
      <DialogConfirmDelete
        onClick={() => onDeleteById(id)}
        message={t("image.delete_album", {
          name: isVn
            ? data.filter((item) => item.id === id)?.[0]?.name
            : data.filter((item) => item.id === id)?.[0]?.nameKo,
        })}
      />
    );
  };
  const getImages = (page : number) => { 
    galleryService.getImage({ page: page, size: PAGE_SIZE ,sort: "createdDate,desc"  }).then((image) => {
      setData(image.data);
      setTotalPage(Math.ceil(image.total / PAGE_SIZE));
    });
  }
  const changePage = (page: number) => {
    setCurrentPage(page);
    getImages(page - 1);
  };



  const onDeleteById = (id: number) => {
    galleryService
      .deleteVideo(id)
      .then(() => {
        if (currenPage === totalPage && totalPage !== 1) {
          if ((id && data.length === 1) ) {
            getImages(currenPage - 2);
            setCurrentPage(currenPage - 1);
          }
        } else {
          getImages(currenPage -1);
        }
        showSuccess("message.success._success");
      
      });
  };
  const handleShowModal = () => {
    setElementModal(
      <ModalCreate
        callback={() => {
          getImages(0);
          setCurrentPage(1);
        }}
      />
    );
  };
  useEffect(() => {
    getImages(0)
  }, []);


  return (
    <div className="px-[24px]">
      <HeaderAdmin title="image._title" />
      <p className="text-_24 text-text_primary mt-[-10px]">
        {t("image.title_list")}
      </p>
      <div className="grid grid-cols-4 gap-[24px] mt-[40px]">
        <div>
          <button
            className="flex h-[312px] w-full items-center   justify-center  bg-bg_F5F7F9"
            onClick={handleShowModal}
          >
            <ICAdd></ICAdd>
          </button>
          <p className="text-_24 text-text_primary  text-center line-clamp-2 mt-[16px]">
            {t("image.title_create_new")}
          </p>
        </div>
        {data.map((item, index) => (
          <div key={item.id}> 
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
                className="h-[312px] w-[312px]  items-center justify-center object-cover"
                style={{
                  opacity: isShow === index ? 0.5 : 1,
                }}
                src={item.files?.[0]?.link ? item.files?.[0]?.link : "https://liftlearning.com/wp-content/uploads/2020/09/default-image.png" }
              ></img>
            </button>
            <Link to={pathsAdmin.library_image.detail + "?id="+ item.id}>
              <p className="text-_24 text-text_primary   line-clamp-2 mt-[16px]">
                {isVn ? item.name : item.nameKo}
              </p>
            </Link>
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

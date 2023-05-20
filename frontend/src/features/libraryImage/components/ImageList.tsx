import { ImageTranslation } from "@components/ImageTranslation";
import { ModalContext } from "@contexts/ModalContext";
import React, { useContext } from "react";
import ModalImage from "./ModalImage";
import useInView from "@hooks/useInView";
import clsx from "clsx";

const ImagesData = [
  "https://media.istockphoto.com/id/1363664395/vi/anh/sao-bi%E1%BB%83n-v%C3%A0-v%E1%BB%8F-s%C3%B2-tr%C3%AAn-b%C3%A3i-bi%E1%BB%83n-m%C3%B9a-h%C3%A8-trong-n%C6%B0%E1%BB%9Bc-bi%E1%BB%83n-n%E1%BB%81n-m%C3%B9a-h%C3%A8.jpg?s=1024x1024&w=is&k=20&c=20U3sH2E1iqZxhRDpqZrpYDW-6Xykgde2520SJIrfYs=",
  "https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/07/05/22/16/panorama-3519309_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/25/18/48/watercolor-2681039_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/12/17/18/51/spices-1914130_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/02/21/12/09/heart-1213475_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/08/31/11/58/woman-6588614_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/09/11/18/23/tower-bridge-441853_960_720.jpg",
  "https://cdn.pixabay.com/photo/2023/05/10/18/20/plant-7984681_640.jpg",
  "https://cdn.pixabay.com/photo/2023/05/10/16/50/squirrel-7984541_640.jpg",
  "https://cdn.pixabay.com/photo/2023/05/11/11/05/glass-sphere-7986102_640.jpg",
  "https://cdn.pixabay.com/photo/2023/05/02/18/13/london-7965770_640.jpg",
  "https://cdn.pixabay.com/photo/2023/04/30/17/31/fish-7961064_640.png",
  "https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_640.jpg",
];

const ImageItem = ({ item, index }: { item: string, index:number }) => {
  const {setElementModal} = useContext(ModalContext)
  const showModal = () => {
    setElementModal(<ModalImage currentIndex={index} />)
  }
  const {ref, isInView} = useInView()
  return (
    <div className="xl:max-h-[461px]  bg-bg_FAFAFA " onClick={showModal}>
      <div ref={ref} className={clsx("pics overflow-hidden  max-h-[468px] xl:max-h-[461px] relative", {"animate__animated animate__fadeInUp": isInView})}>
        <ImageTranslation link={item}></ImageTranslation>
      </div>
    </div>
  );
};

const ImagesList = () => {
  return (
    <div className="flex w-rp  pb-[41px] xl:pb-[120px]  mt-[32px] xl:mt-[70px]">
      <div className="gallery">
        <div className="flex h-[461px]  bg-bg_272E35 items-center mb-[12px]">
          <div className="mx-[24px]">
            <p className="text-text_white text-_18 font-bold line-clamp-1">Tên album</p>
            <p className="text-text_white text-_14 mt-[8px] line-clamp-3">
              Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.
              Tortor velit orci a mi ac nibh.
            </p>
          </div>
        </div>
        {ImagesData.map((item, index) => (
          <ImageItem index={index} key={index} item={item}></ImageItem>
        ))}
      </div>
    </div>
  );
};

export default ImagesList;

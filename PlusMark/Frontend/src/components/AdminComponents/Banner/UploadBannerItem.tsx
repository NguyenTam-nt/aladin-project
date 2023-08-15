import { AddImage, SwiperSlideButton, TrashCanIcon } from "@assets/icons";
import { ModalContext } from "@contexts/contextModal";
import { ToastContex } from "@contexts/ToastContex";
import BannerServices from "@services/BannerServices";
import UploadImage from "@services/UploadImage";
import {
  ALLOW_IMAGE_FILE_TYPE,
  MAX_IMAGE_BANNER_SIZE,
} from "@utility/constants";
import ConfirmBox from "commons/ConfirmBox";
import { url } from "inspector";
import { ChangeEvent, useContext, useRef } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function UploadBannerItem({
  images,
  label,
  max,
  id,
  index,
}: {
  images: Array<{ id?: number; url: string }>;
  label: string;
  max: number;
  id: string;
  index: number;
}) {
  const { setShowModal, setContentModal } = useContext(ModalContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onAddToast } = useContext(ToastContex);

  const onClick = (e: any) => {
    if (images && images?.length >= max) {
      e.preventDefault();
      return;
    }

    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      let file;
      if (files) {
        file = files[0];
      }

      if (inputRef.current) {
        if (!file) {
          inputRef.current.value = "";
          return;
        }

        if (ALLOW_IMAGE_FILE_TYPE.indexOf(file.type) === -1) {
          onAddToast({
            type: "success",
            message: "Yêu cầu định dạng ảnh: jpg, png",
          });
          inputRef.current.value = "";
          return;
        }

        if (file.size > MAX_IMAGE_BANNER_SIZE) {
          onAddToast({ type: "success", message: "Kích thước tối đa 20MB" });
          inputRef.current.value = "";
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        const image = await UploadImage.uploadImage(formData);
        if (image) {
          images.push({ url: image });
          const response = await BannerServices.put(id, {
            id: id,
            images: images,
          });
          if (response.status == 200) {
            return onAddToast({ type: "success", message: `Thêm thành công` });
          }
          return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
        }
      }
    } catch (ex) {
      console.log(ex);
      onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } finally {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setShowModal(true);
    setContentModal(
      <ConfirmBox
        message="Bạn có chắc chắn muốn xóa ảnh này khỏi hệ thống?"
        typeBox="WARNING"
        handleConfirm={() => handleConfirm(index)}
      />
    );
  };

  const handleConfirm = async (index: number) => {
    try {
      images.splice(index, 1);
      const response = await BannerServices.put(id, {
        id: id,
        images: images,
      });
      if (response.status == 200) {
        return onAddToast({ type: "success", message: `Xoá thành công` });
      }
      return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } catch (ex) {
      console.log(ex);
      onAddToast({ type: "error", message: `Có lỗi xảy ra` });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div>
      <p className="mb-5 text-lg leading-6 font-bold">{label}</p>
      <div className="mb-[42px] flex gap-18px">
        <div
          className={`w-[274px] h-[148px] border-[2px] border-dashed rounded flex flex-col justify-end items-center pb-8
            ${images?.length < max ? "cursor-pointer" : ""}
          `}
          onClick={onClick}
        >
          <AddImage />
          <p className="text-normal text-gray-300 mt-10px">
            Tải lên banner ({images?.length}/{max})
          </p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={false}
            accept={"image/jpeg, image/png"}
            onChange={onChange}
          />
        </div>
        <div className="2xl:w-[80%] xl:w-[70%] ">
          <div className="w-full h-full relative">
            <Swiper
              slidesPerView={4}
              autoplay={false}
              spaceBetween={30}
              navigation={{
                nextEl: `.review-swiper-button-next-${index}`,
                prevEl: `.review-swiper-button-prev-${index}`,
              }}
              breakpoints={{
                992: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1536: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1920: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {images &&
                images.map((item, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div className="text-center w-full h-[148px] rounded border-[2px] relative">
                        <img
                          src={item?.url}
                          className="w-full h-full rounded object-cover"
                          loading="lazy"
                        />
                        <TrashCanIcon
                          onClick={() => handleDeleteImage(key)}
                          width={18}
                          className="absolute top-3 right-4 cursor-pointer"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div
              className={`review-swiper-button-prev-${index} absolute top-[50%] left-5 z-40 cursor-pointer -translate-y-[50%]`}
            >
              <SwiperSlideButton className="rotate-180" />
            </div>
            <div
              className={`review-swiper-button-next-${index} absolute top-[50%] right-5 z-40 cursor-pointer -translate-y-[50%]`}
            >
              <SwiperSlideButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

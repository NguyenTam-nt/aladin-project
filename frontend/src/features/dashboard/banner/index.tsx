import React, { useContext } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { SubHeaderTopic } from "../home/components/SubHeaderTopic";
import { ICAdd } from "@assets/icons/ICAdd";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "../components/ImagePreview";
import { ModalContext } from "@contexts/ModalContext";
import { ModalBanner } from "./ModalBanner";

export const Banner = () => {
    const {t} = useContext(TranslateContext)
    const {setElementModal} = useContext(ModalContext)
    const handleShowModal = () => {
        setElementModal(<ModalBanner />)
    }
  return (
    <>
      <HeaderAdmin title="admin._banner._title" />
      <div>
        <SubHeaderTopic title="Quản lý banner giới thiệu" />
        <div className="flex gap-[24px]">
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-bg_F5F7F9 flex items-center justify-center h-[168px]">
                <button onClick={handleShowModal}>
                <ICAdd width={48} height={48} />
                </button>
            </div>
            <p className="mt-[16px] text-_18 font-semibold text-text_primary">{t("button._add_banner")}</p>
          </div>
          <div className="flex-1 h-[168px]">
            <ImagePreview onDelete={() => {}} onActive={() =>{}} url="" />
          </div>
        </div>
      </div>
    </>
  );
};

import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { listStarColor } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import React from "react";
import { useTranslation } from "react-i18next";
import { ModalEvaluation } from "./ModalEvaluation";

const listStar = [
  {
    type: 5,
    persent: 40,
  },
  {
    type: 4,
    persent: 20,
  },
  {
    type: 3,
    persent: 10,
  },
  {
    type: 2,
    persent: 20,
  },
  {
    type: 1,
    persent: 10,
  },
];

export const MenuDetailStar = () => {
  const { t } = useTranslation();
  const { setElementModal, hideModal } = useModalContext();
  const handleShowModal = () => {
    setElementModal(<ModalEvaluation />);
  };
  return (
    <div className="mt-[40px] lg:mt-[80px]">
      <div className="flex items-center justify-between">
        <h3 className="title-48 text-secondary">{t("menu.comment_title")}</h3>
        <Button
          classNameParent="min-w-[167px] "
          onClick={handleShowModal}
          className="max-w-[167px] h-[48px] bg-transparent text-_14 font-bold border border-primary"
          color="empty"
          text="menu.btn_evaluation"
          imageLeft={
            <span className="mr-2">
              <ICPlus />
            </span>
          }
        />
      </div>
      <div className="mt-[40px] flex flex-col lg:flex-row gap-[24px] items-center">
        <div className="w-full lg:w-[200px] bg-secondary text-text_white flex flex-col items-center justify-center h-[200px] rounded-[32px_0_32px_0]">
          <p className="text-_64 font-iCielBC_Cubano">4.8</p>
          <p className="text-_24 font-bold">trên 5</p>
        </div>
        <div className="w-full lg:w-auto lg:flex-1 grid grid-cols-1 gap-y-[24px]">
          {listStar.map((item, index) => {
            return (
              <div
                key={index}
                className="flex w-full h-[16px] items-center gap-x-[24px]"
              >
                <span className="text-_14 lg:text-_16 font-semibold text-text_black">
                  {item.type} sao
                </span>
                <div className="flex-1 h-[16px] overflow-hidden rounded-[8px_0_8px_0] bg-white">
                  <div
                    className="h-[16px] rounded-[8px_0_8px_0]"
                    style={{
                      width: `${item.persent}%`,
                      backgroundColor: listStarColor[item.type - 1],
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { ICStar } from "@assets/icons/ICStar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const ModalEvaluation = () => {
  const { t } = useTranslation();
  const [stars, setStars] = useState(4);
  const { hideModal } = useModalContext();
  const pushStar = useCallback((number: number) => {
    setStars(number);
  }, []);

  const popStar = useCallback(
    (number: number) => {
      if (stars > 1 && number !== 5) {
        setStars(5 - (5 - number));
      }
    },
    [stars]
  );

  const renderStar = useCallback(() => {
    let xhtml: any[] = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = stars !== 0 && stars >= i;
      xhtml.push(
        <button key={i} onClick={() => (isActive ? popStar(i) : pushStar(i))}>
          <ICStar
            width={40}
            height={38}
            color={isActive ? Colors.bg_F4A118 : Colors.bg_CBCBCB}
          />
        </button>
      );
    }

    return xhtml;
  }, [stars, pushStar, popStar]);

  return (
    <div className="w-[872px]  bg-white py-[64px] px-[24px]">
      <h2 className="text-center text-_24 font-bold text-GreyPrimary">
        {t("menu.modal.title")}
      </h2>
      <div className="flex justify-center items-center gap-x-[16px] mt-[37px]">
        {renderStar()}
      </div>
      <div className="grid grid-cols-2 gap-[24px] mt-[45px]">
        <div>
          <TitleInput forId="menu.modal.name" name="menu.modal.name" />
          <Input
            id="menu.modal.name"
            placeholder="menu.modal.name_placeholder"
          />
        </div>
        <div>
          <TitleInput forId="menu.modal.email" name="menu.modal.email" />
          <Input
            id="menu.modal.email"
            placeholder="menu.modal.email_placeholder"
          />
        </div>
        <div className=" col-span-2">
          <TitleInput forId="menu.modal.evaluate" name="menu.modal.evaluate" />
          <Textarea
            id="menu.modal.evaluate"
            placeholder="menu.modal.evaluate_placeholder"
          />
        </div>
        <div className="flex col-span-2 items-center gap-x-[24px] justify-center">
          <Button
            onClick={hideModal}
            color="empty"
            text="button.cancel"
            className="border border-primary max-w-[154px]"
          />
          <Button
            color="primary"
            text="button.evaluate"
            className="border border-primary max-w-[154px]"
          />
        </div>
      </div>
    </div>
  );
};

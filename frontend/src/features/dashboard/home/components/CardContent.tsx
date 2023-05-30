import { ICStarActive } from "@assets/icons/ICStarActive";
import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import { TranslateContext } from "@contexts/Translation";
import type { IPost } from "@typeRules/post";
import React, { useContext } from "react";

type Props = {
  onModalEdit: () => void;
  onModalDelete: () => void;
  onActive?: () => void;
  data: IPost
};

export const CardContent = ({
  onModalDelete,
  onModalEdit,
  onActive,
  data
}: Props) => {
  const { t, isVn } = useContext(TranslateContext);

  return (
    <div className="h-auto border flex flex-col border-br_E9ECEF">
      <div className="w-full h-[145px] relative">
        {onActive ? (
          <button
            onClick={onActive}
            className="absolute top-[16px] left-[16px] z-[1]"
          >
            <ICStarActive color={data?.outstanding ? Colors.bg_FFE600 : Colors.text_white} />
          </button>
        ) : null}
        <img
          alt=""
          src={data?.image}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg_card_admin" />
      </div>
      <div className="p-[16px] flex flex-col flex-1">
        <p className="text-_18 font-semibold text-secondary">
         {isVn ? data?.title : data?.titleKo}
        </p>
        <div>
          <p className="text-_14 font-semibold text-text_primary my-[12px]">
            {t("common._des_post")}
          </p>
          <p className="text-_14 text-text_secondary line-clamp-4">
            {isVn ? data?.description : data?.descriptionKo}
          </p>
        </div>
        <div className="mt-auto">
          <Button
            onClick={onModalEdit}
            color="primary"
            text="button._edit_post"
          />

          <Button
            onClick={onModalDelete}
            color="empty"
            text="button._delete_post"
            className=" text-text_C53434 border-text_C53434 mt-2 border"
          />
        </div>
      </div>
    </div>
  );
};

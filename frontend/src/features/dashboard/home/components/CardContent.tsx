import { ICStarActive } from "@assets/icons/ICStarActive";
import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";

type Props = {
  onModalEdit: () => void;
  onModalDelete: () => void;
  onActive?: () => void;
  isActive?: boolean
};

export const CardContent = ({
  onModalDelete,
  onModalEdit,
  onActive,
  isActive
}: Props) => {
  const { t } = useContext(TranslateContext);

  return (
    <div className="h-auto border border-br_E9ECEF">
      <div className="w-full h-[145px] relative">
        {onActive ? (
          <button
            onClick={onActive}
            className="absolute top-[16px] left-[16px] z-[1]"
          >
            <ICStarActive color={isActive ? Colors.bg_FFE600 : Colors.text_white} />
          </button>
        ) : null}
        <img
          alt=""
          src="https://s3-alpha-sig.figma.com/img/c7df/b40a/022f858a8f7b1be63cccf08a5d9474d0?Expires=1685923200&Signature=MoDhEx9kCgnjKBMUlpkCOpeKnNm7zDa46WsW5HE7rXhiJK4KvrJetJYvlHFW5vAQeHQdquXqnLv5~eYZO9Xz5FJPtnajI5aibhIIMIPtWjirJayjZNYQ8GweB4hGrcW3TQEPc5szqICVnfnx2QAftbz5IOPd8b0kEcOnxGnvfAkIIFvX7aHXbLsFgaYbI85~4gh4K6OBp7NyqtmyWsiUcHJ8lzvt47V09O5tE7-yDCMtXniRUmjUQY5~vEu-iZEQ-89dTjZ1m9k66LKunzMXlI4Z0Ck9g4NYtSxkf3iOablWsOjeVUjekG7eTU3WZpT99X3rMHPsX6hzpPlJmAUzUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg_card_admin" />
      </div>
      <div className="p-[16px]">
        <p className="text-_18 font-semibold text-secondary">
          Neque odio hendrerit
        </p>
        <div>
          <p className="text-_14 font-semibold text-text_primary my-[12px]">
            {t("common._des_post")}
          </p>
          <p className="text-_14 text-text_secondary line-clamp-4">
            Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum
            nunc at.Sem pharetra viverra morbi mi.
          </p>
        </div>
        <div className="mt-[16px]">
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

import { ICDeleteSibar } from "@assets/icons/ICDeleteSibar";
import {
  dataSortProduct,
  windownSizeWidth,
  withResponsive,
} from "@constants/index";
import clsx from "clsx";
import React, { memo } from "react";

type Props = {
  onChange: (id: string) => void;
  onClose: () => void;
};

export const MenuBodySortMobile = memo(({ onChange, onClose }: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3
          className="text-_16 font-semibold lg:font-normal lg:title-32 text-secondary w-fit lg:mb-[32px] cursor-pointer"
          //   onClick={handleClear}
        >
          Sắp xếp theo
        </h3>
        {windownSizeWidth <= withResponsive._1024 ? (
          <button onClick={onClose}>
            <ICDeleteSibar />
          </button>
        ) : null}
      </div>
      <div className="flex flex-col items-start">
        {dataSortProduct.map((item, index) => {
          return (
            <div
              onClick={() => {
                onChange(item.action);
                onClose();
              }}
              key={index}
              className={clsx(
                "h-[60px] cursor-pointer flex items-center w-full text-_14 border-b border-br_CBCBCB",
                {
                  " border-transparent": index === dataSortProduct.length - 1,
                }
              )}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
});

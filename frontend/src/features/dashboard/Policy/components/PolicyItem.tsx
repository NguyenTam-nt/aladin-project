import { Button } from "@features/dashboard/components/Button";
import React from "react";

export const PolicyItem = () => {
  return (
    <div className="h-[223px] flex flex-col p-[16px] bg-white">
      <p className=" text-_16 font-semibold text-text_black line-clamp-1">
        Hỗ trợ đặt bàn
      </p>
      <p className=" line-clamp-2 text-_14 mr-[16px] text-text_secondary">
        Nhà hàng chúng tôi luôn sẵn sàng hỗ trợ quý khách hàng đặt bàn theo ...
      </p>
      <div className="mt-auto">
        <Button color="empty" className="" text="adminPolicy.update" />
        <Button
          color="empty"
          className="mt-2 border-bg_E73F3F text-bg_E73F3F"
          text="adminPolicy.delete"
        />
      </div>
    </div>
  );
};

import CricleButton from "@components/common/CricleButton";
import React from "react";

const LocationBox = () => {
  return (
    <div className="max-w-spc510 ">
      <div className="p-spc14 bg-aqua-aq02">
        <div className="flex items-center justify-between">
          <p className="text_base text-white max-w-3/4">
            Quý khách vui lòng cho biết{" "}
            <span className="font-bold">Địa Chỉ Nhận Hàng</span> để biết chính
            xác thời gian giao hàng
          </p>
          <CricleButton className="!border-white " />
        </div>
        <div className="mt-6">
          <input
            className="w-full rounded-full px-3 h-8 text-xs placeholder:text-gray-300"
            placeholder="Tìm nhanh tỉnh thành, quận huyện, phường xã"
          />
        </div>
      </div>

      <div className="bg-[#E9E9E9]">
        <p className="text-base font-bold text-center h-[50px]">
          Hoặc chọn tỉnh, thành phố
        </p>
        <div className="h-[500px] overflow-y-auto"></div>
      </div>
    </div>
  );
};

export default LocationBox;

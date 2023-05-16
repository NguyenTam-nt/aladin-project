import React from "react";
import LogoLarge from "@assets/images/logo_large.jpg";
import { GeneralDetail } from "../general/GeneralDetail";

export const BrandLogo = () => {
  return (
    <div className="flex items-center xl:items-start flex-col xl:flex-row">
      <div className="w-[311px] h-[366px] mr-[24px]">
        <img className="w-full h-full object-cover" src={LogoLarge} alt="" />
      </div>
      <div className="flex-1 mt-[-32px]">
        <GeneralDetail
          title="1. Logo"
          content='Logo Khoa Hàn Quốc học do họa sĩ Nguyễn Tri Phương Đông thiết kế. Không chỉ là hậu duệ của người anh hùng Nguyễn Tri Phương, anh còn là một họa sĩ tài năng khi được vinh danh trong cuộc thi Giải thưởng Thiết kế Đồ họa Hoa Kỳ 2014 (American Graphic Design Awards 2014) với cuốn Saigon Zoom In, một tác phẩm quảng bá du lịch Việt Nam.</br></br>Logo Khoa Hàn Quốc học sử dụng ba màu xanh - đỏ - trắng đặc trưng của quốc kỳ Hàn Quốc. Biểu tượng âm dương thái cực đồ được biến tấu linh hoạt, tạo hình một pho sách mở trang, diễn đạt chức năng đào tạo và nghiên cứu hàn lâm các lĩnh vực về Hàn Quốc. Gáy sách được thể hiện với một chấm tròn lớn, đậm nét, đang liên tục phát triển và hoàn thiện quanh một trục, hình tượng hóa sự mềm mại mà mạnh mẽ - nét đặc trưng của Khoa Hàn Quốc học với tập thể giảng viên và sinh viên đầy sức sống, đầy tiềm năng, năng động và sáng tạo.</br></br>Với hình vuông làm nền, hình tròn trong tâm tượng trưng trời tròn đất vuông, ý niệm vũ trụ của triết học cổ phương đông, logo Khoa Hàn Quốc học làm nổi bật tâm tròn như điểm nhấn của hòa điệu, tương tác. Chữ “hòa” trong tiếng Việt phát âm hầu như không khác chữ “화” (hwa) trong tiếng Hàn, đều là một trong những giá trị cốt lõi của cả hai dân tộc. Chữ "hòa" biểu đạt tinh thần gắn kết, hòa hợp trong quan hệ Việt Nam - Hàn Quốc, cùng phát triển thịnh vượng.'
        />
      </div>
    </div>
  );
};

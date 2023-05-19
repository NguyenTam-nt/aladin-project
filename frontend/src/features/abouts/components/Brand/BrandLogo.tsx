import React from "react";
import LogoLarge from "@assets/images/logo_large.jpg";
import { GeneralDetail } from "../general/GeneralDetail";

const data = {
  title_vn: "1. Logo",
  content_vn: 'Logo Khoa Hàn Quốc học do họa sĩ Nguyễn Tri Phương Đông thiết kế. Không chỉ là hậu duệ của người anh hùng Nguyễn Tri Phương, anh còn là một họa sĩ tài năng khi được vinh danh trong cuộc thi Giải thưởng Thiết kế Đồ họa Hoa Kỳ 2014 (American Graphic Design Awards 2014) với cuốn Saigon Zoom In, một tác phẩm quảng bá du lịch Việt Nam.</br></br>Logo Khoa Hàn Quốc học sử dụng ba màu xanh - đỏ - trắng đặc trưng của quốc kỳ Hàn Quốc. Biểu tượng âm dương thái cực đồ được biến tấu linh hoạt, tạo hình một pho sách mở trang, diễn đạt chức năng đào tạo và nghiên cứu hàn lâm các lĩnh vực về Hàn Quốc. Gáy sách được thể hiện với một chấm tròn lớn, đậm nét, đang liên tục phát triển và hoàn thiện quanh một trục, hình tượng hóa sự mềm mại mà mạnh mẽ - nét đặc trưng của Khoa Hàn Quốc học với tập thể giảng viên và sinh viên đầy sức sống, đầy tiềm năng, năng động và sáng tạo.</br></br>Với hình vuông làm nền, hình tròn trong tâm tượng trưng trời tròn đất vuông, ý niệm vũ trụ của triết học cổ phương đông, logo Khoa Hàn Quốc học làm nổi bật tâm tròn như điểm nhấn của hòa điệu, tương tác. Chữ “hòa” trong tiếng Việt phát âm hầu như không khác chữ “화” (hwa) trong tiếng Hàn, đều là một trong những giá trị cốt lõi của cả hai dân tộc. Chữ "hòa" biểu đạt tinh thần gắn kết, hòa hợp trong quan hệ Việt Nam - Hàn Quốc, cùng phát triển thịnh vượng.',
  title_ko: "1. 로고",
  content_ko: 'Nguyen Tri Phuong Dong 작가가 디자인한 한국학부 로고. 그는 영웅 Nguyen Tri Phuong의 후예일 뿐만 아니라 베트남 관광을 홍보하는 작품인 Saigon Zoom In으로 American Graphic Design Awards 2014 대회에서 수상한 재능 있는 예술가이기도 합니다.</br></br>한국학부 로고는 태극기의 대표적인 청-적-백 3색을 사용하고 있습니다. 음양태극도의 상징은 유연하게 변형되어 열린 책을 형성하여 한국의 다양한 분야에서 훈련과 학술 연구의 기능을 표현합니다. 책의 등뼈에는 축을 중심으로 지속적으로 발전하고 완성되는 크고 굵은 둥근 점으로 표현되어 한국학부의 특징인 부드러움과 강인함을 교직원과 함께 상징하고 있습니다. , 역동성과 창의성.</br></br>정사각형을 배경으로 중앙의 원은 고대 철학의 우주적 개념인 둥근 하늘과 네모난 땅을 상징합니다. 조화와 상호 작용의 하이라이트로 라운드 센터. 베트남어의 "호아"라는 단어는 한국어의 "화"(화)라는 단어와 거의 동일하게 발음되며 두 민족의 핵심 가치 중 하나입니다. "조화"라는 단어는 상호 발전과 번영을 위한 베트남과 한국의 관계에서 화합과 화합의 정신을 표현합니다.',
}

export const BrandLogo = () => {
  return (
    <div className="flex items-center xl:items-start flex-col xl:flex-row">
      <div className="w-[311px] h-[366px] mr-[24px]">
        <img className="w-full h-full object-cover" src={LogoLarge} alt="" />
      </div>
      <div className="flex-1 mt-[-32px]">
        <GeneralDetail
        data={data}
       />
      </div>
    </div>
  );
};

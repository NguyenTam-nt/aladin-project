import React from "react";
import { GeneralDetail } from "../general/GeneralDetail";
import BrandIniForm from "@assets/images/brand_uniform.jpg";
import BrandIniForm1 from "@assets/images/brand_uniform1.jpg";

export const BrandUniform = () => {
  return (
    <div className="mt-[32px]">
      <GeneralDetail
        title="3. Đồng phục Khoa Hàn Quốc học"
        content='Đồng phục sinh viên Khoa Hàn Quốc học do chính sinh viên thiết kế. Bộ đồng phục được phối hài hoà giữa hai màu trắng và xám. Màu trắng chính là gam màu của sự tươi trẻ, trong sáng tượng trưng cho lứa tuổi đôi mươi của các bạn sinh viên. Hơn nữa, người Hàn Quốc khi xưa và cho đến tận ngày nay vẫn tự xem là “dân tộc với trang phục trắng”. Màu trắng trong tư tưởng của người Hàn thể hiện “ánh sáng”, sự trong sạch và thuần khiết. Màu xám là biểu tượng cho sự trưởng thành và đáng tin cậy, bao hàm cả ý thức trách nhiệm và tính cách độc lập, vững vàng. Với gam màu này, sinh viên muốn tự nhắc nhở bản thân rằng mình đã trưởng thành, đã hoàn toàn đủ khả năng để chịu trách nhiệm cho tương lai của mình, đã sẵn sàng tự đứng trên đôi chân của chính mình. Màu xám cũng là màu người Hàn ưa thích do sự trang nhã của nó. Logo của Khoa Hàn Quốc học được in trên ngực áo phía bên trái, nơi trái tim. Bộ đồng phục thể hiện những nét đặc trưng của sinh viên Khoa Hàn Quốc học.'
      />
      <div className="mt-[24px] grid grid-cols-1 md:grid-cols-2 gap-x-[24px] h-auto md:h-[342px]">
        <div className="h-full">
            <img className="w-full max-h-[342px] object-cover" src={BrandIniForm} alt="" />
        </div>
        <div className="h-full mt-[24px] md:mt-0">
            <img className="w-full max-h-[342px] object-cover" src={BrandIniForm1} alt="" />
        </div>
      </div>
    </div>
  );
};

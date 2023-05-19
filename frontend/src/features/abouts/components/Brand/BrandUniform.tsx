import React from "react";
import { GeneralDetail } from "../general/GeneralDetail";
import BrandIniForm from "@assets/images/brand_uniform.jpg";
import BrandIniForm1 from "@assets/images/brand_uniform1.jpg";

const data = {
  title_vn: "3. Đồng phục Khoa Hàn Quốc học",
  content_vn:
    "Đồng phục sinh viên Khoa Hàn Quốc học do chính sinh viên thiết kế. Bộ đồng phục được phối hài hoà giữa hai màu trắng và xám. Màu trắng chính là gam màu của sự tươi trẻ, trong sáng tượng trưng cho lứa tuổi đôi mươi của các bạn sinh viên. Hơn nữa, người Hàn Quốc khi xưa và cho đến tận ngày nay vẫn tự xem là “dân tộc với trang phục trắng”. Màu trắng trong tư tưởng của người Hàn thể hiện “ánh sáng”, sự trong sạch và thuần khiết. Màu xám là biểu tượng cho sự trưởng thành và đáng tin cậy, bao hàm cả ý thức trách nhiệm và tính cách độc lập, vững vàng. Với gam màu này, sinh viên muốn tự nhắc nhở bản thân rằng mình đã trưởng thành, đã hoàn toàn đủ khả năng để chịu trách nhiệm cho tương lai của mình, đã sẵn sàng tự đứng trên đôi chân của chính mình. Màu xám cũng là màu người Hàn ưa thích do sự trang nhã của nó. Logo của Khoa Hàn Quốc học được in trên ngực áo phía bên trái, nơi trái tim. Bộ đồng phục thể hiện những nét đặc trưng của sinh viên Khoa Hàn Quốc học.",
  title_ko: "3. 한국학부 교복",
  content_ko:
    '한국학부 "학생복" 은 학생들이 직접 디자인한 것입니다. 유니폼은 흰색과 회색의 조화로운 조합입니다. 흰색은 젊음과 순수함의 색으로 20대 학생을 상징합니다. 더군다나 한국인들은 과거나 지금이나 스스로를 "백의민족" 이라고 생각한다. 한국 사상의 흰색은 "빛", 순수함, 순수함을 나타냅니다. 그레이는 성숙함과 믿음직함의 상징으로 책임감과 독립적이고 꾸준한 성격을 모두 담고 있습니다. 이 색 구성표를 통해 학생들은 자신이 성숙하고, 미래에 대한 책임을 완전히 질 수 있고, 두 발로 설 준비가 되어 있음을 스스로에게 상기시키고 싶어합니다. 그레이는 우아함 때문에 한국인들이 가장 좋아하는 색이기도 하다. 하트가 있는 왼쪽 가슴 부분에는 한국학부 로고가 프린트되어 있습니다. 교복은 한국학부 학생들의 특징을 보여준다.',
};

export const BrandUniform = () => {
  return (
    <div className="mt-[32px]">
      <GeneralDetail data={data} />
      <div className="mt-[24px] grid grid-cols-1 md:grid-cols-2 gap-x-[24px] h-auto md:h-[342px]">
        <div className="h-full">
          <img
            className="w-full max-h-[342px] object-cover"
            src={BrandIniForm}
            alt=""
          />
        </div>
        <div className="h-full mt-[24px] md:mt-0">
          <img
            className="w-full max-h-[342px] object-cover"
            src={BrandIniForm1}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

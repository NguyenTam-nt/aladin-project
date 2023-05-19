import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import YouTube from "react-youtube";
import { GeneralDetail } from "../general/GeneralDetail";

const data = {
  title_vn: "2. Bài ca Khoa Hàn Quốc học",
  content_vn: 'Bài ca Khoa Hàn Quốc học Tiến sĩ - Nhạc sĩ Trần Thanh Hà, Trưởng Khoa Lý luận – Sáng tác – Chỉ huy của Nhạc viện Thành phố Hồ Chí Minh sáng tác, Nhạc sĩ Trần Ngọc phụ trách phần hòa âm, lời dịch tiếng Hàn do TS. Nguyễn Thị Hiền, ThS. Yoon Han Yeol và ThS. Lim Si Youn cùng thực hiện.</br></br>Bài ca mở đầu bằng hình ảnh hoa mugung (무궁화) - quốc hoa Hàn Quốc và hình ảnh hoa sen vốn được đông đảo nhân dân Việt Nam xem như quốc hoa, qua đó gợi lên hai đất nước với cảnh quan thiên nhiên đặc trưng: Việt Nam sông nước và Hàn Quốc núi non. Theo dòng lịch sử như dòng sông lớn, Việt Nam và Hàn Quốc đã có những liên hệ, gắn bó lâu đời, ít nhất cũng từ dấu mốc đầu thế kỷ XIII, khi hoàng tử Lý Long Tường cùng gia thuộc qua Cao Ly, ở lại lập nghiệp, tham gia lãnh đạo quân dân địa phương hai lần chống xâm lược Nguyên Mông. Những dấu ấn đầu tiên có thể mờ xa, ký ức có thể phai mờ… Song, suốt trường kỳ lịch sử, Việt Nam và Hàn Quốc đã chia sẻ rất nhiều điểm tương đồng quan trọng: hai dân tộc đã cùng kiên cường vượt qua bao thác ghềnh, giông bão, cùng tranh đấu cho hòa bình và cùng từ hàn vi phấn đấu cho phồn vinh đất nước. Tình thân Việt Nam – Hàn Quốc đã có từ ngàn xưa chính là nền tảng vững vàng để hôm nay chúng ta cùng xây đắp cho ước mơ, hạnh phúc của hai dân tộc. Với ý nghĩa như vậy, Khoa Hàn Quốc học vun bồi tâm hồn, tri thức cho các thế hệ sinh viên có trách nhiệm với đất nước, tự hào làm nhịp cầu hòa hợp gắn kết hai dân tộc để cùng phát triển.</br></br>Giai điệu tha thiết, tự hào, trang trọng phù hợp với chữ "tình" của hai dân tộc cũng như truyền thống của Khoa Hàn Quốc học, Trường ĐH KHXH&NV, ĐHQG-HCM.',
  title_ko: "2. 한국학부 노래",
  content_ko: '한국학박사 - 음악가 Tran Thanh Ha, 이론학부 학장 - 작곡 - 호치민시 음악원 지휘자, 작곡가 Tran Ngoc이 믹싱, Dr. Nguyen Thi Hien, MSc. 윤한열과 MSc. 임시윤이 함께 노래를 불렀다. 한국의 국화인 무궁화와 베트남 사람들이 많이 생각하는 연꽃의 이미지로 곡이 시작된다. 강이 있는 베트남과 산이 있는 한국의 전형적인 자연경관을 가진 두 나라를 떠올리게 합니다. 큰 강과 같은 역사적 궤적에 따르면 베트남과 한국은 적어도 13세기 초 리롱뚜옹(Ly Long Tuong) 왕자와 그의 가족이 고려에 속해 다시 경력을 쌓은 이래로 오랜 관계와 유대 관계를 유지해 왔습니다. Nguyen Mong의 침략에 맞서 지역 군대와 사람들의 지도력에 두 번 참여했습니다. 첫인상이 흐려질 수 있고 기억이 흐려질 수 있습니다... 하지만 역사를 통틀어 베트남과 한국은 많은 중요한 유사점을 공유했습니다: 두 민족은 함께 힘차게 극복했습니다. 많은 급류, 폭풍, 함께 평화를 위해 싸우고 과거부터 국가의 번영. 수천 년 동안 이어온 베트남과 한국의 우정은 오늘날 양국의 꿈과 행복을 위해 함께 만들어가는 든든한 기반입니다. 그런 의미에서 한국학부는 국가를 책임지는 후손들에게 영혼과 지식을 길러주고 상생 발전을 위해 두 나라를 잇는 화합의 다리임을 자랑스럽게 생각합니다.</br ></br>진심 , 자랑스럽고 엄숙한 멜로디는 두 민족의 "사랑"이라는 단어와 한국학부, 인문사회과학대학, VNU-HCM의 전통과 잘 어울립니다.'
}

export const BrandSong = () => {
  const { width } = useWindowResize();
  return (
    <div className="mt-[32px]">
      <GeneralDetail
        data={data}
     />
      <div className="mt-[24px]">
        <YouTube
          videoId="2tTlusUnZmE"
          className="w-full"
          opts={{
            width: "100%",
            height: width >= withResponsive._640 ? "564px" : width >= withResponsive._420 ? "250px" : "144px",
          }}
        />
      </div>
    </div>
  );
};

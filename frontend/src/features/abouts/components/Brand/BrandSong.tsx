import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import YouTube from "react-youtube";
import { GeneralDetail } from "../general/GeneralDetail";

export const BrandSong = () => {
  const { width } = useWindowResize();
  return (
    <div className="mt-[32px]">
      <GeneralDetail
        title="2. Bài ca Khoa Hàn Quốc học"
        content='Bài ca Khoa Hàn Quốc học Tiến sĩ - Nhạc sĩ Trần Thanh Hà, Trưởng Khoa Lý luận – Sáng tác – Chỉ huy của Nhạc viện Thành phố Hồ Chí Minh sáng tác, Nhạc sĩ Trần Ngọc phụ trách phần hòa âm, lời dịch tiếng Hàn do TS. Nguyễn Thị Hiền, ThS. Yoon Han Yeol và ThS. Lim Si Youn cùng thực hiện.</br></br>Bài ca mở đầu bằng hình ảnh hoa mugung (무궁화) - quốc hoa Hàn Quốc và hình ảnh hoa sen vốn được đông đảo nhân dân Việt Nam xem như quốc hoa, qua đó gợi lên hai đất nước với cảnh quan thiên nhiên đặc trưng: Việt Nam sông nước và Hàn Quốc núi non. Theo dòng lịch sử như dòng sông lớn, Việt Nam và Hàn Quốc đã có những liên hệ, gắn bó lâu đời, ít nhất cũng từ dấu mốc đầu thế kỷ XIII, khi hoàng tử Lý Long Tường cùng gia thuộc qua Cao Ly, ở lại lập nghiệp, tham gia lãnh đạo quân dân địa phương hai lần chống xâm lược Nguyên Mông. Những dấu ấn đầu tiên có thể mờ xa, ký ức có thể phai mờ… Song, suốt trường kỳ lịch sử, Việt Nam và Hàn Quốc đã chia sẻ rất nhiều điểm tương đồng quan trọng: hai dân tộc đã cùng kiên cường vượt qua bao thác ghềnh, giông bão, cùng tranh đấu cho hòa bình và cùng từ hàn vi phấn đấu cho phồn vinh đất nước. Tình thân Việt Nam – Hàn Quốc đã có từ ngàn xưa chính là nền tảng vững vàng để hôm nay chúng ta cùng xây đắp cho ước mơ, hạnh phúc của hai dân tộc. Với ý nghĩa như vậy, Khoa Hàn Quốc học vun bồi tâm hồn, tri thức cho các thế hệ sinh viên có trách nhiệm với đất nước, tự hào làm nhịp cầu hòa hợp gắn kết hai dân tộc để cùng phát triển.</br></br>Giai điệu tha thiết, tự hào, trang trọng phù hợp với chữ "tình" của hai dân tộc cũng như truyền thống của Khoa Hàn Quốc học, Trường ĐH KHXH&NV, ĐHQG-HCM.'
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

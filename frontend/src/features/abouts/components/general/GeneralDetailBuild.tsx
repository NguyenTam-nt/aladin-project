import React from "react";
import { GeneralDetail } from "./GeneralDetail";

const data = [
  {
    title_vn: "2. Chi tiết hình thành",
    title_ko: "2. 포메이션 상세 정보",
    content_vn:
      "Việt Nam và Hàn Quốc chính thức thiết lập quan hệ ngoại giao vào ngày 22 tháng 12 năm 1992, "
      + "từ đó mối quan hệ hợp tác hữu nghị giữa hai nước không ngừng phát triển về mọi phương diện. Trước tình hình đó, nhiệm vụ đào tạo và nghiên cứu về Hàn Quốc học được đặt ra một cách thiết thực, ngành Hàn quốc học lần lượt được thành lập tại các trường đại học trải khắp ba miền bắc trung"
      +"nam. Đến nay, Hàn Quốc học ở Việt Nam vẫn tiếp tục phát triển và đã đạt được nhiều thành tựu đáng kể về nhiều phương diện."
      +"</br></br>Ngành Hàn Quốc học thuộc Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia Tp. Hồ Chí Minh là một trong những ngành khoa học nghiên cứu về đất nước Hàn Quốc được thành lập sớm nhất ở Việt Nam. Sau khi Khoa Đông phương học được thành lập thì ngành Hàn Quốc học trực thuộc Bộ môn Đông Á (gồm Nhật Bản học và Trung Quốc học) cũng chính thức ra đời. Ngành bắt đầu tuyển sinh khóa thứ nhất từ niên học 1994–1995 với 35 sinh viên, những sinh viên này thi đỗ kỳ thi tuyển sinh đại học vào Khoa Đông phương học, sau đó đăng ký nguyện vọng vào ngành Hàn Quốc học."
      +"</br></br>Những năm đầu tiên mới đi vào hoạt động, ngành Hàn Quốc học gặp muôn vàn khó khăn: thiếu đội ngũ giảng viên tiếng Hàn lẫn giảng viên các môn Hàn Quốc học; cơ sở vật chất thiếu thốn; giáo trình cũng như giáo án còn nhiều bất cập... Tuy nhiên, trong bối cảnh mối quan hệ hữu nghị giữa hai quốc gia Hàn Quốc và Việt Nam ngày càng phát triển tốt đẹp, được sự giúp đỡ tích cực của Tổng Lãnh sự quán Hàn Quốc tại Tp. Hồ Chí Minh, các tổ chức thuộc chính phủ Hàn Quốc (KOICA, Korea Foundation, Korean Research Foundation…), các trường đại học phía Hàn Quốc, các doanh nghiệp và doanh nhân Hàn Quốc, bên cạnh đó là sự động viên của Ban Giám hiệu nhà trường, sự quan tâm của Ban Chủ nhiệm Khoa Đông phương học, đặc biệt là nỗ lực vượt khó của đội ngũ giảng viên người Việt lẫn người Hàn, ngành Hàn Quốc học chúng tôi đã từng bước khắc phục những khó khăn, không ngừng vươn lên để trở thành một ngành học mạnh về chất lượng đào tạo vốn đã được minh chứng trong thực tế suốt những năm qua."
      +"</br></br>Tuy quá trình phát triển chưa lâu nhưng đến cuối năm 2009 ngành Hàn Quốc học chúng tôi đã xây dựng được đội ngũ giảng viên người Việt khá vững mạnh với hơn 90 % giảng viên có học vị thạc sĩ trở lên. Các giảng viên của ngành có nhiều công trình nghiên cứu tiêu biểu về Hàn Quốc học, tham gia nhiều hội thảo cấp quốc gia và quốc tế về Hàn Quốc học và giáo dục tiếng Hàn, biên soạn được một số giáo trình và sách công cụ phục vụ thiết thực cho công tác đào tạo của ngành."
      +"</br></br>Trải qua các thời kỳ phát triển của giai đoạn 1994 - 2010, ngành Hàn Quốc học được dẫn dắt bởi các giảng viên có nhiều kinh nghiệm giảng dạy, trưởng ngành qua các thời kỳ là ThS. Lý Kính Hiền (2000 – 2007), ThS. Đỗ Ngọc Luyến (2007 – 2008), ThS. Nguyễn Thị Hương Sen (2008 – 2010). Bên cạnh đó, điều đáng tự hào là ngành đã đào tạo được số lượng cử nhân Hàn Quốc học nhiều nhất nước với gần 500 sinh viên tốt nghiệp thuộc 12 khóa (từ niên khóa 1994 - 1998 đến niên khóa 2006 - 2009), 100% sinh viên tốt nghiệp có việc làm ổn định và vị trí khá tốt tại các doanh nghiệp Hàn Quốc, cơ quan và đoàn thể của Hàn Quốc cũng như của Việt Nam. Ngoài chương trình đào tạo cử nhân chính quy, ngành cũng tuyển sinh hệ đào tạo cử nhân Văn bằng 2 từ năm 2014."
      +"</br></br>Với những thành tựu đó, ngày 15 tháng 3 năm 2010, PGS.TS. Võ Văn Sen - Hiệu trưởng Nhà trường đã ký quyết định tách Bộ môn Hàn Quốc học ra khỏi khoa Đông Phương học, thành lập Bộ môn Hàn Quốc học trực thuộc trường. Đây là Bộ môn Hàn Quốc học tương đương cấp khoa độc lập đầu tiên và là duy nhất trong hệ thống giáo dục đại học Việt Nam."
      +"</br></br>Đến ngày 20 tháng 01 năm 2015, PGS.TS. Phan Thanh Bình - Giám đốc Đại học Quốc gia TP. HCM đã ký quyết định nâng cấp Bộ môn Hàn Quốc học thành Khoa Hàn Quốc học trực thuộc trường Đại học Khoa học Xã hội và Nhân văn. Đây là Khoa Hàn Quốc học (với chương trình đào tạo đúng nghĩa Hàn Quốc học) đầu tiên ở một trường đại học uy tín quốc gia, của Việt Nam và toàn bộ châu Á. Sự kiện quan trọng này đánh dấu bước trưởng thành của ngành Hàn Quốc học, mở ra thời kỳ phát triển mới để Khoa Hàn Quốc học ngày càng khẳng định thương hiệu của mình, đóng góp ngày càng hiệu quả cho xã hội."
      +"</br></br>Suốt hơn 25 năm qua, Khoa Hàn Quốc học đã không ngừng vươn lên trở thành một cơ sở đào tạo uy tín và quy mô. Đội ngũ giảng viên phát triển về lượng và chất (100% giảng viên có trình độ từ thạc sĩ trở lên). Quy mô và chất lượng đào tạo tăng, sinh viên Hàn Quốc học giành nhiều giải xuất sắc trong các kỳ thi toàn quốc và khu vực, được các nhà tuyển dụng ngày càng đánh giá cao, tăng tỷ lệ tiếp tục học sau đại học. Bên cạnh đó, Khoa đã tổ chức nhiều hội thảo và tọa đàm khoa học quốc tế về các đề tài Hàn Quốc học và quan hệ Việt - Hàn; các sự kiện lớn mang tầm khu vực như Lễ hội Chữ Hàn (Hangeul Festival) với sự tham gia của tất cả cơ sở đào tạo tiếng Hàn và Hàn Quốc học ở khu vực phía Nam. Với sự giúp đỡ của các cơ quan tổ chức và trường đại học Hàn Quốc, hệ thống các phòng tư liệu Hàn Quốc học tăng nhanh số đầu sách và băng đĩa phục vụ đào tạo, nghiên cứu. Hợp tác quốc tế phát triển nhanh chóng, Trường ĐH KHXH&NV, ĐHQG-HCM đến nay đã ký hơn 50 MOU và MOA với hơn 60 đối tác Hàn Quốc và nhiều văn bản hợp tác đã được triển khai hiệu quả. Ngành Hàn Quốc học ở Trường ĐH KHXH&NV, ĐHQG-HCM khẳng định vị thế là đơn vị đào tạo Hàn Quốc học hàng đầu Việt Nam, một đầu mối (hub) đào tạo, nghiên cứu khoa học, hợp tác quốc tế về Hàn Quốc học trong nước và ở Đông Nam Á.",
      content_ko: "베트남과 한국은 1992년 12월 22일 공식적으로 수교를 맺었습니다."
      + "그 이후로 두 나라의 우호 협력 관계는 모든 면에서 지속적으로 발전해 왔습니다. 이러한 상황에 직면하여 한국학 교육 및 연구 과제가 실질적으로 제시되고 한국 산업이 설립되었습니다. 세 개의 북부 중부 지역에 걸쳐 있는 대학에서."
      + "남. 지금까지 베트남의 한국학은 계속해서 발전해왔고 여러 방면에서 눈부신 성과를 많이 이뤘다."
      +"</br></br>호찌민시 베트남국립대학교 인문사회과학대학 한국학과는 한국을 연구하는 과학 분야 중 하나입니다. 동양학부 이후 동아시아학과(일본학과 중국학과 포함) 산하에 한국학과가 정식으로 출범 1994-1995학년도 첫 35명으로 이 학생들이 대학입학시험에 합격하여 동양학을 전공하고 한국학 전공에 지원했습니다."
      +"</br></br>운영 초기 한국학 산업은 한국어 교사 및 한국학 강사 부족, 시설 부족 등 많은 어려움에 직면했습니다. 여전히 커리큘럼과 수업에 많은 단점이 있습니다. 그러나 주호찌민총영사관의 적극적인 도움으로 한국과 베트남의 우호관계가 점점 좋아지고 있는 상황에서 한국 정부기관(KOICA, Korea 재단, 한국연구재단...), 한국 대학, 한국 기업 및 기업인, 학교 이사회의 격려 외에도 동양학부 학장의 관심, 특히 베트남과 한국 강사의 극복 노력 우리 한국학전공은 점차 어려움을 극복하고 수년에 걸쳐 실무에서 입증된 교육 품질 측면에서 강력한 학문으로 끊임없이 성장하고 있습니다."
      +"</br></br>개발 과정은 길지 않지만 2009년 말까지 90% 이상의 강사가 대학 학위를 가진 강력한 베트남 강사 팀을 구성했습니다. 업계 강사 한국학에 대한 많은 전형적인 연구 작업을 수행했으며, 한국학 및 한국어 교육에 관한 많은 국내 및 국제 회의에 참여했으며, 수많은 교과서, 교육 프로그램 및 서적, 업계 교육을 위한 실용적인 도구를 편찬했습니다."
      +"</br></br>1994년부터 2010년까지의 발전 기간 동안 한국학은 풍부한 교육 경험을 가진 강사들이 이끌었고, 이 기간 동안 현장 책임자는 MSc였습니다. . Ly Kinh Hien(2000 - 2007), MSc. Do Ngoc Luyen (2007 - 2008), MSc. Nguyen Thi Huong Sen (2008 - 2010) 또한 업계에서 많은 지원자를 양성한 것을 자랑스럽게 생각합니다. 12개 과정(1994-1998학년도부터 2006-2009학년도)에 약 500명의 졸업생이 배출되어 졸업생의 100%가 대학에서 안정된 직장과 좋은 자리를 얻고 있습니다. 2014년부터 정규 학사 교육과정 외에 2급 학사 교육제도도 업계에 등록하고 있다."
      +"</br></br>이러한 성과를 바탕으로 2010년 3월 15일 보 반 센(Vo Van Sen) 총장은 한국학과를 동양학부에서 분리하는 결정에 서명했습니다. . 대학 산하에 한국학과가 신설되었다.베트남 고등교육 체계에서 최초이자 유일한 독립 교수급 한국학과이다."
      +"</br></br>2015년 1월 20일 호치민시 베트남 국립대학교 Phan Thanh Binh 부교수는 한국학과를 한국어학부로 승격하는 결정에 서명했습니다. 베트남 국내 명문 국립대 최초의 한국학부(진정한 한국학 연수 프로그램 포함)로, 한국학 산업의 성숙을 알리는 중요한 행사로, 한국학부의 새로운 발전의 시대는 점점 더 그 브랜드를 알리고 사회에 더욱 효과적인 공헌을 하기 위한 것입니다."
      +"</br></br>지난 25년 동안 한국학부는 명문 대규모 교육기관으로 거듭 성장해 왔습니다. 강사의 %는 석사 이상입니다)의 규모와 질은 훈련이 증가하고, 한국 학생들은 국가 및 지역 대회에서 많은 우수상을 수상했으며, 고용주들로부터 점점 더 높이 평가되고 있습니다.게다가 교수진은 한국학 및 베트남-한국 관계에 관한 많은 국제 과학 세미나와 세미나를 조직했으며, 학비, 대학원 진학률 제고 한국어 및 한국어 교육기관 전체 참여 한글축제 등 지역적 규모"
  },
  {
    title_vn: "3. Mục tiêu và sứ mệnh",
    title_ko: "3. 목표 및 사명",
    content_vn:
      "Việt Nam và Hàn Quốc chính thức thiết lập quan hệ ngoại giao vào ngày 22 tháng 12 năm 1992, từ đó mối quan hệ hợp tác hữu nghị giữa hai nước không ngừng phát triển về mọi phương diện. Trước tình hình đó, nhiệm vụ đào tạo và nghiên cứu về Hàn Quốc học được đặt ra một cách thiết thực, ngành Hàn quốc học lần lượt được thành lập tại các trường đại học trải khắp ba miền bắc trung nam. Đến nay, Hàn Quốc học ở Việt Nam vẫn tiếp tục phát triển và đã đạt được nhiều thành tựu đáng kể về nhiều phương diện."
      +"</br></br>Khoa Hàn Quốc học, Trường ĐH KHXH&NV, ĐHQG-HCM cũng xác định sứ mệnh của mình là tích hợp toàn cầu hóa và địa phương hóa Hàn Quốc học, đào tạo và nghiên cứu Hàn Quốc học theo hướng khu vực học, góp phần xúc tiến quan hệ Việt-Hàn, phát triển kinh tế - xã hội Việt Nam, đồng thời cống hiến những nghiên cứu có giá trị khoa học và thực tiễn về những giá trị Hàn Quốc có ý nghĩa khu vực và nhân loại, về những diễn ngôn Đông Á, diễn ngôn Đông phương có ý nghĩa hệ trọng trong thời đại gắn kết khu vực và hội nhập toàn cầu.",
    content_ko: "베트남과 한국은 1992년 12월 22일 공식적으로 수교를 맺은 이후 양국간 우호 협력 관계는 모든 면에서 지속적으로 발전해 왔습니다. 북, 중, 남 3개 지역에 산재한 대학에 한국학이 자리잡고 있으며, 지속적으로 발전하여 여러 방면에서 괄목할 만한 성과를 거두고 있습니다."
    +"</br></br>VNU-HCM 인문사회과학대학 한국학부도 한국학, 훈련 및 한국학의 세계화와 현지화를 통합하는 것을 사명으로 정의합니다. 지역 연구 방향 연구 , 베트남-한국 관계 증진, 베트남의 사회경제적 발전에 기여함과 동시에 한국의 의미 있는 가치, 지역적 의미와 인간성, 동아시아 담론, 동양 담론은 지역 통합과 글로벌 통합 시대에 큰 의미"  
  },
];

const GeneralDetailBuild = () => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <GeneralDetail
            key={index}
            data={item}
          />
        );
      })}
    </>
  );
};

export default GeneralDetailBuild;

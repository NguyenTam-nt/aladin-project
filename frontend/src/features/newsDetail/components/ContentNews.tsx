import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";

const contentData = {
  title_vn: `Đẩy mạnh nghiên cứu về chính trị Hàn Quốc trong bối cảnh Việt Nam - Hàn Quốc trở thành Đối tác chiến lược toàn diện`,
  title_ko: `베트남의 맥락에서 한국 정치에 대한 연구 촉진 - 한국은 포괄적인 전략적 동반자 관계가 됨` ,
  time: "25/12/2023",
  content_vn:
    "Vào chiều ngày 15/5/2023, trong khuôn khổ Dự án “Xây dựng trường đại học trọng điểm về Hàn Quốc học tại Việt Nam” do Viện Nghiên cứu Hàn Quốc học Trung ương tài trợ, Hội thảo khoa học quốc gia “Nghiên cứu chính trị Hàn Quốc tại Việt Nam: Một số vấn đề lý luận và thực tiễn” do Khoa Hàn Quốc học, Trường ĐH KHXH&NV, ĐHQG-HCM tổ chức đã diễn ra thành công tốt đẹp." +
    "</br></br> Phát biểu khai mạc hội thảo, TS. Lê Hoàng Dũng - Phó Hiệu trưởng Trường ĐH KHXH&NV, ĐHQG-HCM đã gửi lời cảm ơn chân thành vào nhiệt liệt chào mừng sự có mặt của tất cả đại biểu đến tham dự. TS. Lê Hoàng Dũng khẳng định:" +
    "</br></br> Đến tham dự chương trình, Ban Tổ chức hội thảo hân hạnh đón tiếp sự hiện diện của bà Kim Mi-yeon - Lãnh sự phụ trách Giáo dục & Văn hóa, Tổng Lãnh sự quán Hàn Quốc tại TP.HCM, ông Gil Ho Jin - Giám đốc Trung tâm Ngôn ngữ tiếng Hàn tại TP.HCM, ông Shin Dong Min - Phó Chủ tịch Hiệp hội Thương mại và Công nghiệp Hàn Quốc (KOCHAM) tại miền Trung và Nam Việt Nam và ông Ahn Ji Bok - Giám đốc kiêm Tổng Biên tập Tạp chí Life Plaza. Bên cạnh đó, Hội thảo cũng là dịp quy tụ các học giả, nghiên cứu viên cao cấp trong lĩnh vực chính trị Việt Nam - Hàn Quốc đến từ Viện Hàn lâm Khoa học xã hội Việt Nam, Học viện Chính trị quốc gia Hồ Chí Minh và các trường đại học, cơ sở đào tạo trong nước." +
    "</br></br>  Hội thảo hôm nay cũng là sự kiện tái khẳng định cam kết của Trường ĐH KHXH&NV, ĐHQG-HCM đối với các đối tác Hàn Quốc trên tinh thần của bộ giá trị cốt lõi “Sáng tạo – Dẫn dắt – Trách nhiệm” và triết lý giáo dục “Toàn diện – Khai phóng – Đa văn hóa”. Chúng tôi tin tưởng trong thời gian tới, với sự quan tâm và hỗ trợ của Tổng Lãnh sự quán Hàn Quốc tại TP.HCM, Trung tâm Ngôn ngữ tiếng Hàn tại TP.HCM cùng các cơ quan, đơn vị và những người bạn Hàn Quốc thân thiết." +
    `</br></br> <img className="my-[24px]"  src="https://s3-alpha-sig.figma.com/img/f646/dc4f/2a6db8c1626eb03d1e3e7dff78eae957?Expires=1685318400&Signature=FvrtWEgG5EIqeCHYN3kpNQxKOl68Gm14yakFEoffpmydgeG~W6-QndzRSpKjp~Aqr2iEFHrzhTfu3215GRgUQ5z8qYtwX9WSOTl7PUmcGA28jEPr-f4TwfzgGBSOa38kbdrG6Q3STV9DlhQpvl76OXiG1iOgYiai2BR3-lNKu2LaeFv6UvYJCCSPpo0FC9SDTF4wvf-~-oXWXemmMiUaj15JUw6b33xsq-mwZ8QGIM0wCs2CqmdPbwV1l1YTrARaTzxAn2U-oWKDWVovdL10jcIZV4DdrtuE5LzJZuo82ggXLLaRg2Wduthrgomd3xMGugcBi520kK806GTOjWMCBQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>` +
    "<br></br> Là một trong những đại biểu đến tham dự hội thảo, bà Lãnh sự Kim Mi-yeon đã gửi lời cảm ơn đến Ban Giám hiệu Trường ĐH KHXH&NV, ĐHQG-HCM cùng toàn thể đội ngũ tổ chức sự kiện. Bà Lãnh sự cho biết:" +
    "<br></br> Quan hệ Việt-Hàn không tập trung vào một lĩnh vực nhất định mà phát triển sâu rộng toàn diện trên tất cả các lĩnh vực trọng điểm như kinh tế, an ninh, văn hóa, giao lưu nhân dân... Phạm vi nghiên cứu về Hàn Quốc tại Việt Nam giờ đâyđã mở rộng ra tất cả các lĩnh vực như văn hóa xã hội và kinh tế chính trị... Hội thảo ngày hôm nay với chủ đề cũng là minh chứng rõ nét nhất cho điều này." +
    `</br></br> <img className="my-[24px]" src="https://s3-alpha-sig.figma.com/img/5042/230c/31973b904448965eec653fbddc35c86f?Expires=1685318400&Signature=oQbK8hEQdeueEeFK2OvxzSTASLmoVIuEKYxgl0~UVzmxp8Kt19LjAKdFan8h~TqDb-RjhHSIGfCYAHnKHsj4fn5o6kofnYggtAACYvrfMOjdcdlXodzv5kq3DlAVLBJbs55XGxNlfx-wIMXZVTyYimL-qErL6jKR5jqYuV4U8AT4QjoXv9qcrCumRHWqulVcikrkZsmLnJ7ArmX3ovZE2ZLrbTEMi6Z70FcVZ-k-37zPXYoVyIO6drpYGtNd4qYLiw5KJyl4RkRlLaKr9q-hAOo43ByjvkMUSkl4YLJ0bW1410NJJICtfKj3W4wjN1vYucEuT43Mb5M5YHt5GnwZ9Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>` +
    `</br></br> Nội dung chính của hội thảo được bắt đầu với báo cáo đề dẫn "Tình hình nghiên cứu chính trị Hàn Quốc tại Việt Nam" của TS. Bùi Hải Đăng - Trưởng khoa Quan hệ Quốc tế kiêm Giám đốc Trung tâm Hàn Quốc học. Theo đó, báo cáo đã chỉ ra việc nghiên cứu về chính trị Hàn Quốc ở trong nước chủ yếu tập trung vào nội dung về quan hệ quốc tế của Hàn Quốc, hoạt động nghiên cứu còn ít và ở quy mô nhỏ. Tuy nhiên, TS. Bùi Hải Đăng nhận định trong bối cảnh hai quốc gia đã nâng cấp quan hệ lên Đối tác chiến lược toàn diện, việc nghiên cứu và giảng dạy về chính trị Hàn Quốc ở Việt Nam sẽ được thúc đẩy mạnh mẽ, chương trình đào tạo Hàn Quốc học sẽ có sự chuyển dịch từ việc lấy ngôn ngữ - văn hóa làm nền tảng như hiện nay sang dần chú trọng đến chính trị và kinh tế.` +
    `</br></br> <img className="my-[24px]"  src="https://s3-alpha-sig.figma.com/img/b43b/8583/1e60c84cfaf21f5d6c122ae5b5ff9efe?Expires=1685318400&Signature=cr0TfCC9apub5gM2y3Dflg265nIPCALiTzKa~4HomTLbfgJehFppZoSWldIRVdtPOf9OkAe48t0pjrmUkLuN17sxLY3-Q8DS2iF47WbiMvkJ7~KkCRkg~yO9M9b-W-zfqdQFjqEJNBh4f2mAvN5vXXPmdBoBsx-KgBxlghPya-s8M1dPfIOYg4Ky4AnrqpmEbxsXj-SP3BN1AtQgDdE06BgBrSIt8laldPHLjxY3C-CbFGy-NePuKk5bG3xnJmg2TbV3fr4aOVXee0BHD7Lu4GmT45j3J4xaE0J~4MPlXDUBQbRmKt24KXxGub~DuzQbmSZszQjkziMB23VDiNQqqQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>` +
    `</br> </br> Sau đó, Hội thảo được tiến hành theo ba tiểu ban với các chủ đề "Đặc trưng hệ thống và văn hóa chính trị Hàn Quốc", "Quan hệ chính trị - ngoại giao của Hàn Quốc" và "Tình hình nghiên cứu, giảng dạy chính trị Hàn Quốc tại Việt Nam". Với sự dẫn dắt của các chủ tọa là những giáo sư đầu ngành trong lĩnh vực nghiên cứu chính trị Hàn Quốc, ba tiểu ban đã hoạt động vô cùng sôi nổi với phần trình bày của các báo cáo viên cũng như ý kiến trao đổi, thảo luận từ các đại biểu tham dự.` +
    `</br><div style="display: flex">
     <div style='flex: 50% ;padding: 5px'>
      <img src="https://s3-alpha-sig.figma.com/img/4a06/5950/385a4c2224d7cad768ed9b5ec83145a5?Expires=1685318400&Signature=AgNUWZB89x5ncp8calmXKLC8XCD2MmD-xzhg-HVkJJiTTZAJAPy5kdL6osScAY4vjgQ9bEvMiqBIGjs91zZrxkCS43XWftdYtIC2fzxpP5jMokIl1wYCNqm~-oxVxzsfThlXBB7rHjt22Lx09zAoPyvYtnzO3VcH5PK-YlnebuGyWNxdkGNWuSiCxsC87A4OJzU9utH-15Ix~t-1sD20wGd573G4RxVkA5FG93EqRTXoFeCGL~GlBdFwkh6TsiB-dchGilFHei6G66tncJs0hpwIUMKWN8TLU~A0jaMmVglIGTlmenCaToiT58e4kz~QNSgTyMLwWtsfHJ6AG3IbhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
     </div>
     <div style='flex: 50% ; padding: 5px'>
      <img src="https://s3-alpha-sig.figma.com/img/fca8/dc99/3be3a77deba2121656447fde580a8dff?Expires=1685318400&Signature=Ph3NzYu0YnU5dd6NlGMk2AIHnV8xLFNmzVuI4VMT7u0qemM7oprAAy-xx84VQb8J7gcQ8XaHcxizhcpmtLW4o-wicBGazLp4UMiSTfcx3OlmCGKiRJabVgy4eMIRDfYt8MJBhqOlRKiQX8CJzgBYYHE6l1trJhBZeBBfFmhg64jByni~PhBj~5DRPOybjE1zWVkXcMPRfv6PksS6P9BxP0RIfkOilDARJZW8TqdlL0j~tVZLNHjtKnkSRgPtfaCM3rBEl8hcj7M3F8tfu4ZrBFrw2L8SINQGR-rSYzdn6bdHS17DoOmUFSDCA3-fMex5TGo~0-UpOMYnGLStE-6-7g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
    </div>
    </div>` +
    `</br> </br> Trong phần bế mạc của hội thảo, TS. Nguyễn Thị Phương Mai - Trưởng khoa Hàn Quốc học kiêm Giám đốc dự án "Xây dựng Trường Đại học Trọng điểm về Hàn Quốc học tại Việt Nam" đã phát biểu tổng kết những nội dung và kết quả đạt được thông qua hội thảo lần này, cũng như giới thiệu về những chương trình trong khuôn khổ dự án sẽ diễn ra trong thời gian tới.` +
    `</br></br> <img className="my-[24px]" src="https://s3-alpha-sig.figma.com/img/698d/38c9/e57701ea211ff234e389e516b5eb4496?Expires=1685318400&Signature=BNCSbYYHUwKIVrQ-G2tXrlw5EXIrnSUz9pNQ6QXKDzueinbT7xJpczg71i6FMIKC1Y9RJxV97g1N2c2iQ~kfIiYQFXxNXLWbg3EakUYZWPKRPJROsPTB2gY6-XbwftiXeajrM~dRABVSLGgXUPc-8i2xJkX~9qUSc6ix68XEBj-lvjNMDoCIfVdecb2BsMKEW~Sph0B0dB4sniRKMLrRo7w0wSz1YDsJc3l5A2GHDfZxV1sAWPKLv9o~6x6OkmmwXvKmYbOMNflTtz4rZ1q7xh0YVuX23LeXk9LOFm6GvP~R45ZEfsoAH8vQBVVMEWSnE1bXuMm-Ir7DBSF6aFChsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>`
    + ` </br></br> Chương trình Đại học Trọng điểm dành cho ngành Hàn Quốc học tại Việt Nam là một dự án của Viện Nghiên cứu Hàn Quốc học Trung ương (AKS) và Trường ĐH KHXH&NV, ĐHQG-HCM là đơn vị được chọn để thực hiện. Dự án kéo dài 05 năm (2022 - 2027) với các nội dung chính như sau:
    Xuất bản bộ giáo trình Hàn Quốc học và hệ thống bài giảng online về Chính trị, Văn hóa, Lịch sử, Xã hội, Kinh tế Hàn Quốc
    Phát triển Trung tâm Hàn Quốc học Ứng dụng để hỗ trợ các học giả trẻ nghiên cứu về Hàn Quốc học.
    Tổ chức các Hội thảo quốc tế và trong nước nghiên cứu về Hàn Quốc học để thiết lập mạng lưới nghiên cứu Hàn Quốc tại Việt Nam.
    Hỗ trợ các thế hệ sau nghiên cứu Hàn Quốc: tổ chức các tọa đàm, workshop về học thuật cho sinh viên đại học và học viên sau cao học định kỳ, cấp học bổng cho học viên cao học và nghiên cứu sinh.
    Trường ĐH KHXH&NV, ĐHQG-HCM: <a href='https://hcmussh.edu.vn/tin-tuc/hoi-thao-nghien-cuu-chinh-tri-han-quoc' target='_blank' >https://hcmussh.edu.vn/tin-tuc/hoi-thao-nghien-cuu-chinh-tri-han-quoc</a>
    Yonhap News: <a href='https://www.yna.co.kr/view/AKR20230516152100371' target='_blank' >https://www.yna.co.kr/view/AKR20230516152100371</a> `
    ,
  content_ko:
  `2023년 5월 15일 오후, 중앙한국학연구원이 후원하는 "베트남 한국학 거점대학 건립" 프로젝트의 틀 내에서, 전국학술대회 "베트남 한국정치 연구: 일부 이론적 VNU-HCM 인문사회과학대학 한국학부 주관` +
  `</br></br> 세미나 개회 연설에서 VNU-HCM 인문사회과학대학교 부총장 Le Hoang Dung 박사는 진심 어린 감사를 전하고 모든 참석자들을 따뜻하게 환영했습니다. 대표단 Le Hoang Dung 박사는 다음과 같이 단언했습니다.` +
  `</br></br> 프로그램에 참석한 컨퍼런스 조직위원회는 김미연 주한총영사관 교육문화담당영사가 호치민시에 참석한 것을 환영했습니다. 길호진 - 호치민시 한국어센터 원장, 신동민 - 베트남 중남부 대한상공회의소(KOCHAM) 부회장, 안지복 원장 라이프플라자 매거진의 편집장을 역임하였으며, 또한 이번 세미나는 연구소에서 베트남-한국 정치 분야의 고위 학자 및 연구자들을 한자리에 모을 수 있는 기회이기도 했습니다. 국가의 정치, 대학 및 교육 기관.` +
  `</br></br> 오늘 세미나는 인문사회과학대학 VNU-HCM이 핵심 가치인 "창의성 - 리더십 - 책임"과 교육철학 “종합-자유-다문화” 주호찌민총영사관, 주호찌민한국어학원의 관심과 성원으로 다가올 때를 믿습니다. 친구.` +
  `</br></br> <img className="my-[24px]"  src="https://s3-alpha-sig.figma.com/img/f646/dc4f/2a6db8c1626eb03d1e3e7dff78eae957?Expires=1685318400&Signature=FvrtWEgG5EIqeCHYN3kpNQxKOl68Gm14yakFEoffpmydgeG~W6-QndzRSpKjp~Aqr2iEFHrzhTfu3215GRgUQ5z8qYtwX9WSOTl7PUmcGA28jEPr-f4TwfzgGBSOa38kbdrG6Q3STV9DlhQpvl76OXiG1iOgYiai2BR3-lNKu2LaeFv6UvYJCCSPpo0FC9SDTF4wvf-~-oXWXemmMiUaj15JUw6b33xsq-mwZ8QGIM0wCs2CqmdPbwV1l1YTrARaTzxAn2U-oWKDWVovdL10jcIZV4DdrtuE5LzJZuo82ggXLLaRg2Wduthrgomd3xMGugcBi520kK806GTOjWMCBQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>` +
  "<br></br> 김미연 영사는 세미나 대표로서 인문사회과학대학 이사회와 VNU-HCM 및 전체 조직팀에 감사를 표했다. 영사가 말했다: " +
  `<br></br> 베트남과 한국의 관계는 특정 영역에 집중하지 않고 경제, 안보, 문화, 인적교류 등 모든 핵심 분야에서 포괄적으로 발전하고 있다. 베트남에서 한국에 대한 연구는 이제 사회문화, 정치경제 등 모든 분야로 확대됐다...오늘 주제세미나도 분명한 증거다.`+
  `</br></br> <img className="my-[24px]" src="https://s3-alpha-sig.figma.com/img/5042/230c/31973b904448965eec653fbddc35c86f?Expires=1685318400&Signature=oQbK8hEQdeueEeFK2OvxzSTASLmoVIuEKYxgl0~UVzmxp8Kt19LjAKdFan8h~TqDb-RjhHSIGfCYAHnKHsj4fn5o6kofnYggtAACYvrfMOjdcdlXodzv5kq3DlAVLBJbs55XGxNlfx-wIMXZVTyYimL-qErL6jKR5jqYuV4U8AT4QjoXv9qcrCumRHWqulVcikrkZsmLnJ7ArmX3ovZE2ZLrbTEMi6Z70FcVZ-k-37zPXYoVyIO6drpYGtNd4qYLiw5KJyl4RkRlLaKr9q-hAOo43ByjvkMUSkl4YLJ0bW1410NJJICtfKj3W4wjN1vYucEuT43Mb5M5YHt5GnwZ9Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>` +
  `</br></br> 세미나의 주요 내용은 박 박사의 "베트남 한국 정치 연구 현황" 보고서로 시작됐다. Bui Hai Dang - 국제관계학부 학장 겸 한국학센터 소장. 이에 따라 보고서는 국내 한국정치에 대한 연구는 주로 한국의 국제관계 내용에 초점을 맞추고 연구활동은 적고 규모가 작다고 지적했다. 그러나 박사. Bui Hai Dang은 양국이 포괄적 전략적 동반자관계로 관계를 업그레이드한 맥락에서 베트남에서 한국 정치에 대한 연구와 교육이 강력하게 추진될 것이라고 말했다. 점차 정치와 경제에 집중할 수 있는 토대.`+
  `</br></br> <img className="my-[24px]"  src="https://s3-alpha-sig.figma.com/img/b43b/8583/1e60c84cfaf21f5d6c122ae5b5ff9efe?Expires=1685318400&Signature=cr0TfCC9apub5gM2y3Dflg265nIPCALiTzKa~4HomTLbfgJehFppZoSWldIRVdtPOf9OkAe48t0pjrmUkLuN17sxLY3-Q8DS2iF47WbiMvkJ7~KkCRkg~yO9M9b-W-zfqdQFjqEJNBh4f2mAvN5vXXPmdBoBsx-KgBxlghPya-s8M1dPfIOYg4Ky4AnrqpmEbxsXj-SP3BN1AtQgDdE06BgBrSIt8laldPHLjxY3C-CbFGy-NePuKk5bG3xnJmg2TbV3fr4aOVXee0BHD7Lu4GmT45j3J4xaE0J~4MPlXDUBQbRmKt24KXxGub~DuzQbmSZszQjkziMB23VDiNQqqQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>` +
  `</br> </br> 이후 워크숍은 "한국 정치문화와 제도의 특징", "한국의 외교정치관계", "한국의 상황 베트남의 정치 연구 및 교육". 한국정치학 분야의 교수들을 이끌고 있는 위원장들을 중심으로 3개 분과위원회는 보고자들의 발표와 참석자들의 의견교환으로 열띤 토론을 벌였습니다.` +
  `</br><div style="display: flex">
  <div style='flex: 50% ;padding: 5px'>
   <img src="https://s3-alpha-sig.figma.com/img/4a06/5950/385a4c2224d7cad768ed9b5ec83145a5?Expires=1685318400&Signature=AgNUWZB89x5ncp8calmXKLC8XCD2MmD-xzhg-HVkJJiTTZAJAPy5kdL6osScAY4vjgQ9bEvMiqBIGjs91zZrxkCS43XWftdYtIC2fzxpP5jMokIl1wYCNqm~-oxVxzsfThlXBB7rHjt22Lx09zAoPyvYtnzO3VcH5PK-YlnebuGyWNxdkGNWuSiCxsC87A4OJzU9utH-15Ix~t-1sD20wGd573G4RxVkA5FG93EqRTXoFeCGL~GlBdFwkh6TsiB-dchGilFHei6G66tncJs0hpwIUMKWN8TLU~A0jaMmVglIGTlmenCaToiT58e4kz~QNSgTyMLwWtsfHJ6AG3IbhA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
  </div>
  <div style='flex: 50% ; padding: 5px'>
   <img src="https://s3-alpha-sig.figma.com/img/fca8/dc99/3be3a77deba2121656447fde580a8dff?Expires=1685318400&Signature=Ph3NzYu0YnU5dd6NlGMk2AIHnV8xLFNmzVuI4VMT7u0qemM7oprAAy-xx84VQb8J7gcQ8XaHcxizhcpmtLW4o-wicBGazLp4UMiSTfcx3OlmCGKiRJabVgy4eMIRDfYt8MJBhqOlRKiQX8CJzgBYYHE6l1trJhBZeBBfFmhg64jByni~PhBj~5DRPOybjE1zWVkXcMPRfv6PksS6P9BxP0RIfkOilDARJZW8TqdlL0j~tVZLNHjtKnkSRgPtfaCM3rBEl8hcj7M3F8tfu4ZrBFrw2L8SINQGR-rSYzdn6bdHS17DoOmUFSDCA3-fMex5TGo~0-UpOMYnGLStE-6-7g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
 </div>
 </div>` +
     `</br> </br> 워크숍의 마지막 부분에서 Dr. Nguyen Thi Phuong Mai 한국학부 학장 겸 "베트남 한국학 거점대학 건립" 프로젝트 책임자가 이번 세미나를 통해 달성한 내용과 성과를 요약하는 연설을 하고, 가까운 미래에 진행될 프로젝트` +
     `</br></br> <img className="my-[24px]" src="https://s3-alpha-sig.figma.com/img/698d/38c9/e57701ea211ff234e389e516b5eb4496?Expires=1685318400&Signature=BNCSbYYHUwKIVrQ-G2tXrlw5EXIrnSUz9pNQ6QXKDzueinbT7xJpczg71i6FMIKC1Y9RJxV97g1N2c2iQ~kfIiYQFXxNXLWbg3EakUYZWPKRPJROsPTB2gY6-XbwftiXeajrM~dRABVSLGgXUPc-8i2xJkX~9qUSc6ix68XEBj-lvjNMDoCIfVdecb2BsMKEW~Sph0B0dB4sniRKMLrRo7w0wSz1YDsJc3l5A2GHDfZxV1sAWPKLv9o~6x6OkmmwXvKmYbOMNflTtz4rZ1q7xh0YVuX23LeXk9LOFm6GvP~R45ZEfsoAH8vQBVVMEWSnE1bXuMm-Ir7DBSF6aFChsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" ></img>`
     + ` </br></br> 베트남 한국학 핵심대학 프로그램은 중앙한국학연구소(AKS)와 인문사회과학대학 VNU-HCM의 프로젝트로 선정되어 실행된다. 이 프로젝트는 다음과 같은 주요 내용으로 5년(2022-2027) 동안 지속됩니다.
     한국의 정치, 문화, 역사, 사회, 경제에 대한 한국어 학습 교재 및 온라인 강의 시스템 발간
     한국학 분야의 젊은 학자들을 지원하기 위해 응용한국학센터를 발전시킨다.
     베트남 내 한국 연구 네트워크 구축을 위한 국내외 한국학 세미나 개최
     차세대 한국 유학 지원 : 학부 및 대학원생을 대상으로 학술 세미나 및 워크숍을 정기적으로 개최하고 대학원생 및 대학원생에게 장학금을 제공합니다.
     인문사회과학대학교, VNU-HCM: <a href='https://hcmussh.edu.vn/tin-tuc/hoi-thao-nghien-cuu-chinh-tri-han-quoc' target='_blank ' >https://hcmussh.edu.vn/tin-tuc/hoi-thao-nghien-cuu-chinh-tri-han-quoc</a>
     연합뉴스 : <a href='https://www.yna.co.kr/view/AKR20230516152100371' target='_blank' >https://www.yna.co.kr/view/AKR20230516152100371</a> `
};

const ContentNews = () => {

  const {t ,isVn} = useContext(TranslateContext)
  return (
    <div className="flex flex-1 flex-col">
      <p className="mt-[32px] text-_24 xl:text-_40  font-semibold text-text_primary line-clamp-4">
        {isVn ? contentData.title_vn : contentData.title_ko}
      </p>
      <p className="text-_14  font-normal mt-1 text-text_secondary ">
        {t("common.create_day") + ": " + contentData.time}
      </p>
      <div className="h-[1px] bg-bg_7E8B99 my-1 "></div>
      <div
        className="text-_14 text-_text-primary text-justify mt-[24px]"
        dangerouslySetInnerHTML={{
          __html: isVn ? contentData.content_vn : contentData.content_ko,
        }}
      />
    </div>
  );
};

export default ContentNews;

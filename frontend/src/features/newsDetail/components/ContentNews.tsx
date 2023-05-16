import React from "react";

const contentData = {
  title: `  Tăng cường mối quan hệ hợp tác Việt - Hàn thông qua các hoạt động giao
    lưu văn hóa. Nâng cao phát triển.`,
  time: "Ngày đăng tải: 25/12/2023",
  content: `Vào chiều ngày 27 tháng 3 năm 2023, Lễ Công bố quyết định và trao giấy chứng nhận Kiểm định chất lượng cấp chương trình đào tạo (CTĐT) đã diễn ra tại Hội trường Văn khoa, Trường ĐH KHXH&NV, ĐHQG-HCM với sự tham gia của đại diện Trung tâm Kiểm định chất lượng giáo dục Sài Gòn, Ban Giám hiệu Nhà trường cùng các thầy cô là trưởng phòng ban, khoa/bộ môn.`,
};

const ContentNews = () => {
  return (
    <div className="flex flex-1 flex-col">
      <p className="mt-[32px] text-_24 xl:text-_40  font-semibold text-text_primary line-clamp-4">
        {contentData.title}
      </p>
      <p className="text-_14  font-normal mt-1 text-text_secondary ">
        {contentData.time}
      </p>
      <div className="h-[1px] bg-bg_7E8B99 my-1 "></div>
      <p className="text-_14  font-normal text-text_secondary mt-[24px]">
        {contentData.content}
      </p>
      <img
        className="my-[24px]"
        src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
      ></img>
      <p className="text-_14  font-normal mt-1 text-text_secondary">
        {contentData.content}
      </p>
      <p className="text-_14  font-normal mt-1 text-text_secondary">
        {contentData.content}
      </p>
    </div>
  );
};

export default ContentNews;

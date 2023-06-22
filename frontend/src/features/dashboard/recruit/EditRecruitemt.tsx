import { recruitService } from "@services/recruitService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecruitmentForm from "./component/RecruitmentForm";
import type { Recruit_type } from "@typeRules/recruit";

const EditRecruitemt = () => {
  const { id } = useParams();
  const [recruiItem, setRecruiItem] = useState<Recruit_type | undefined>(
    undefined
  );
  const getRecruitmentById = async () => {
    try {
      if (id) {
        const resultRecruit = await recruitService.getRecruitById(Number(id));
        setRecruiItem(resultRecruit);
      }
    } catch (error) {
      console.log("Có lỗi không thể lấy thông tin tuyển dụng");
    }
  };
  useEffect(() => {
    getRecruitmentById();
  }, [id]);
  return (
    <div>
      <RecruitmentForm itemRecruit={recruiItem} />
    </div>
  );
};

export default EditRecruitemt;

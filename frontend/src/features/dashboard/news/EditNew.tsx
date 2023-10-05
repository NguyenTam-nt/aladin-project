import React, { useEffect, useState } from "react";
import NewForm from "./component/NewForm";
import type { newItem_type } from "@typeRules/new";
import { useParams } from "react-router-dom";
import { newService } from "@services/newService";

const EditNew = () => {
  const { id } = useParams();
  const [dataNew, setDataNew] = useState<newItem_type>();
  const getNewById = async (id: number) => {
    try {
      const resultNew = await newService.getNewById(id);
      setDataNew(resultNew);
    } catch (error) {
      // console.log("Không thể lấy dược dữ liệu tin tức.");
    }
  };

  useEffect(() => {
    if (id) {
      getNewById(+id);
    }
  }, [id]);
  return (
    <div>
      <NewForm newItemProps={dataNew} />
    </div>
  );
};

export default EditNew;

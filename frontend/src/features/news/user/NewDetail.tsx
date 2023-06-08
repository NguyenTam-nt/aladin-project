import React from "react";
import { useParams } from "react-router-dom";
import Banner from "./Banner";
import WapperContent from "@components/WapperContent";

const NewDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Banner
        dataBanner={{
          name: "navigation.header.news",
          listNavigate: [
            { name: "navigation.header.news", path: "/tin-tuc" },
            { name: "navigation.header.newDetail", path: `/tin-tuc/${id}` },
          ],
        }}
      />
      <WapperContent>
        <div className="pb-spc120"></div>
      </WapperContent>
    </div>
  );
};

export default NewDetail;

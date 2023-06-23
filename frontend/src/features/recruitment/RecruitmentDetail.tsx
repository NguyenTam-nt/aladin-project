import { AddressWork } from "@assets/icons/AddressWork";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import WapperContent from "@components/WapperContent";
import Banner from "@features/news/user/Banner";
import RecuireImage from "@assets/images/imageRecuire.png";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recruit_type } from "@typeRules/recruit";
import { recruitService } from "@services/recruitService";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";

const RecruitmentDetail = () => {
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
      <Banner
        dataBanner={{
          name: "navigation.header.ecruitment",
          listNavigate: [
            { name: "navigation.header.ecruitment", path: "/tuyen-dung" },
            {
              name: "navigation.header.recruimentDetail",
              path: `/tuyen-dung/${id}`,
            },
          ],
        }}
      />
      {recruiItem && (
        <WapperContent>
          <div className="lg:pb-spc120 pb-20 px-5">
            <h3 className="lg:title-32 title-24 leading-[36px] text-secondary uppercase lg:mb-6 mb-4">
              {recruiItem?.title}
            </h3>
            <div className="flex lg:flex-row lg:gap-5 flex-col">
              <div className="flex gap-2 2xl:mb-0 mb-[18px]">
                <DolarIcon width={20} height={20} />
                <p className="text-lg text-secondary leading-22 font-semibold">
                  {recruiItem?.salary}
                </p>
              </div>
              <div className="flex gap-2 2xl:mb-0 mb-[18px]">
                <CalendarIcon width={20} height={20} />
                <p className="text-lg leading-22 font-normal">
                  Hết hạn: {FomatDateYY_MM_DD(recruiItem?.expirationDate!)}
                </p>
              </div>
              <div className="flex gap-2">
                <AddressWork width={20} height={20} />
                <p className="text-lg leading-22 font-normal">
                  {recruiItem?.address}
                </p>
              </div>
            </div>
            <div className="lg:radius-tl-br48 radius-tl-br24 my-6 overflow-hidden">
              <img
                src={recruiItem?.linkMedia || RecuireImage}
                className="w-full lg:min-h-[742px]"
                alt=""
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: JSON.parse(recruiItem?.content!),
              }}
            ></div>
          </div>
        </WapperContent>
      )}
    </div>
  );
};

export default RecruitmentDetail;

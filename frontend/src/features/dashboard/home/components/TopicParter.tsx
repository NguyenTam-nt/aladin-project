import React, { ChangeEvent, useState } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import Company1 from "@assets/images/Company1.png"

export const TopicParter = () => {
  const [preViewImage, setPreViewImage] = useState<string>(
    "https://s3-alpha-sig.figma.com/img/968d/c70b/c6cac33f1cd2ca478db3b9f0575b7b0a?Expires=1685923200&Signature=htLYrPDTyGzA6Mg0tYLGNhWI~LiGkh8COZ-~I~P3RaMqNjG78zuzLz1PKV~a7dyj1M4BHUI77HBVMGmmNkRx1zepOBI1K2sfWK3Hc9cY1~bGgZrofppXRmzA1HFzZhfVxZArK3hzPBzvstuyEvxNZJibEvIfDReDolCz1gLeI2MKHDz87QEMBNXr9EMBhNWZO7hs6usMpnepg-8W1obUD3JmOdFa3ihschWQJdl7cerDuKGGth3PqDUCknaytw-VcXevUy7-PSuMDjbsbQ2m7ceU-CQHluNXQvTsva03YlDrt9vMumIzc0nc8p4iUpJh-BrIn9445734slg-6AtZCQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const link = URL.createObjectURL(file);
    setPreViewImage(link);
  };

  const handleDelete = () => {
    setPreViewImage("");
  };
  return (
    <>
      <SubHeaderTopic title="admin._home._topic._banner_partner" />
      <div>
        <div className="flex items-center h-[168px] ">
          <div className="w-[312px] h-full mr-[24px]">
            <InputUploadFile onChange={handleChange} />
          </div>
          {preViewImage ? (
            <div className="flex-1 h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
      <PartnerLogo />
    </>
  );
};

const PartnerLogo = () => {
  const [preViewImage, setPreViewImage] = useState<string>(
    "https://s3-alpha-sig.figma.com/img/968d/c70b/c6cac33f1cd2ca478db3b9f0575b7b0a?Expires=1685923200&Signature=htLYrPDTyGzA6Mg0tYLGNhWI~LiGkh8COZ-~I~P3RaMqNjG78zuzLz1PKV~a7dyj1M4BHUI77HBVMGmmNkRx1zepOBI1K2sfWK3Hc9cY1~bGgZrofppXRmzA1HFzZhfVxZArK3hzPBzvstuyEvxNZJibEvIfDReDolCz1gLeI2MKHDz87QEMBNXr9EMBhNWZO7hs6usMpnepg-8W1obUD3JmOdFa3ihschWQJdl7cerDuKGGth3PqDUCknaytw-VcXevUy7-PSuMDjbsbQ2m7ceU-CQHluNXQvTsva03YlDrt9vMumIzc0nc8p4iUpJh-BrIn9445734slg-6AtZCQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const link = URL.createObjectURL(file);
    setPreViewImage(link);
  };

  const handleDelete = () => {
    setPreViewImage("");
  };

  return (
    <>
    <SubHeaderTopic title="admin._home._topic._partner" />
        <div className=" grid  grid-cols-3 2xl:grid-cols-4 gap-[24px]">
        <div className="h-[168px]">
            <InputUploadFile onChange={handleChange} />
        </div>
        <div className="h-[168px]">
         <ImagePreview className=" !object-contain !w-auto !h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" onDelete={handleDelete} url={Company1} />
        </div>
        <div className="h-[168px]">
         <ImagePreview className=" !object-contain !w-auto !h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" onDelete={handleDelete} url={Company1} />
        </div>
        <div className="h-[168px]">
         <ImagePreview className=" !object-contain !w-auto !h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" onDelete={handleDelete} url={Company1} />
        </div>
        <div className="h-[168px]">
         <ImagePreview className=" !object-contain !w-auto !h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" onDelete={handleDelete} url={Company1} />
        </div>
        <div className="h-[168px]">
         <ImagePreview className=" !object-contain !w-auto !h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" onDelete={handleDelete} url={Company1} />
        </div>
        
        </div>
    </>
  );
};

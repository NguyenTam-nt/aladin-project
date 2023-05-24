import React, { ChangeEvent, useContext, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "../components/ImagePreview";
import { InputUploadFile } from "../components/InputUploadFIle";

export const Login = () => {
  const { t } = useContext(TranslateContext);
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
    <div>
      <HeaderAdmin title="admin._login_page.title" />
      <div>
        <p className="text-_24 text-text_primary font-semibold mb-[24px]">
          {t("admin._login_page._des")}
        </p>
        <div className="flex items-center h-[168px] ">
          <InputUploadFile onChange={handleChange} />
          {preViewImage ? (
            <div className="w-[312px] h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

import TitleInput from "@components/TitleInput";
import { Input } from "@features/dashboard/components/Input";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import React, { ChangeEvent, useState } from "react";
import { ProductHandlerImages } from "./ProductHandlerImages";
import { ProductHandlerVideo } from "./ProductHandlerVideo";
import { formatNumberDot } from "@commons/formatMoney";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { ProductHandlerCategory } from "./ProductHandlerCategory";
import { ProductHandlerPlace } from "./ProductHandlerPlace";
import { Textarea } from "@features/dashboard/components/Textarea";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";

// "adminProduct": {
//     "title": "Món ăn",
//     "add": "Thêm món ăn",
//     "update": "Sửa món ăn",
//     "delete": "Xóa món ăn",
//     "filter": "Lọc món ăn theo nhóm hàng",
//     "form": {
//         "title_add": "Tạo mới món ăn",
//         "title_edit": "Chỉnh sửa món ăn",
//         "code": "Mã món ăn",
//         "code_placeholder": "Nhập món ăn",
//         "name": "Tên món ăn",
//         "name_placeholder": "Nhập tên món ăn",
//         "upload_product": "Tải ảnh món ăn",
//         "maxItem": "Tối đa 5 hình ảnh",
//         "upload_video_product": "Tải video món ăn",
//         "maxVideo": "Tối đa 1 video",
//         "cost": "Giá gốc",
//         "discount": "Giá khuyến mãi",
//         "category": "Danh mục",
//         "choose_place": "Chọn cơ sở bán",
//         "info": "Thông tin món ăn"
//     }

// }


export const ProductHandler = () => {
//   const [value, setValue] = useState("");
//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setValue(event.currentTarget.value.replaceAll(".", ""));
//   };

  return (
    <div>
      <TitleTopic isRequired={false} name="adminProduct.form.title_add" />
      <div className="grid grid-cols-2 gap-[24px]">
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.code" />
          <Input placeholder="adminProduct.form.code_placeholder" />
        </div>
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.name" />
          <Input placeholder="adminProduct.form.name_placeholder" />
        </div>
        <ProductHandlerImages />
        <ProductHandlerVideo />
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.cost" />
          <Input placeholder="adminProduct.form.cost_placeholder" />
        </div>
        <div className=" col-span-1">
          <TitleInput name="adminProduct.form.discount" />
          <Input placeholder="adminProduct.form.discount_placeholder" />
        </div>
       <ProductHandlerCategory />
       <ProductHandlerPlace />
       <div className=" col-span-2">
          <TitleInput name="adminProduct.form.info" />
          <Textarea maxLength={2000} placeholder="adminProduct.form.info_placeholder" />
        </div>
        <div className="col-span-2 flex justify-end">
          <GroupButtonAdmin isAdd />
        </div>
      </div>
    </div>
  );
};

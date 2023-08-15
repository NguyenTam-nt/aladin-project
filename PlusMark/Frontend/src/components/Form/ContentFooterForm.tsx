import {
  FaceBookIconBorder,
  InstagramOutlineIcon,
  TicktokIcon,
  YoutubeOutlineIcon,
} from "@assets/icons";
import InputSocial from "@components/AdminComponents/ContentFooter/InputSocial";
import BtnLoading from "@components/btn-loading/BtnLoading";
import { ToastContex } from "@contexts/ToastContex";
import FooterServices, { ContentFooter } from "@services/FooterService";
import InputFieldArrayElement from "commons/components/InputComponent/InputFieldArrayElement";
import { FormikProvider, useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";

export default function ContentFooterForm({
  contentFooter,
}: {
  contentFooter: ContentFooter | undefined;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onAddToast } = useContext(ToastContex);
  const socialList = [
    {
      name: "facebook",
      icon: <FaceBookIconBorder width={30} height={30} />,
      placeHorder: "Nhập tên miền trang Facebook",
    },
    {
      name: "instagram",
      icon: <InstagramOutlineIcon width={30} height={30} fill="#F45538" />,
      placeHorder: "Nhập tên miền trang Instagram",
    },
    {
      name: "youtube",
      icon: <YoutubeOutlineIcon width={30} height={30} fill="#F45538" />,
      placeHorder: "Nhập tên miền trang Youtube",
    },
    {
      name: "tiktok",
      icon: <TicktokIcon width={30} height={30} />,
      placeHorder: "Nhập tên miền trang Tiktok",
    },
  ];

  const formik = useFormik({
    initialValues: {
      comanyName: contentFooter?.comanyName || "",
      address: contentFooter?.address.concat([""]) || [""],
      phoneNumber: contentFooter?.phoneNumber.concat([""]) || [""],
      email: contentFooter?.email || "",
      facebook: contentFooter?.facebook || "",
      instagram: contentFooter?.instagram || "",
      youtube: contentFooter?.youtube || "",
      tiktok: contentFooter?.tiktok || "",
    },
    validationSchema: yup.object({
      comanyName: yup.string().trim().required("Vui lòng điền tên công ty."),
      email: yup
        .string()
        .trim()
        .required("Vui lòng điền email.")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Vui lòng nhập đúng email."
        ),
      address: yup.array().strict().requiredAtLeast("Vui lòng điền địa chỉ"),
      phoneNumber: yup
        .array()
        .strict()
        .requiredAtLeast("Vui lòng điền số điện thoại"),
    }),
    onSubmit: async (values) => {
      console.log("aaaa");
      try {
        setIsLoading(true);
        values = {
          ...values,
          address: values.address.filter((item) => item.length),
          phoneNumber: values.phoneNumber.filter((item) => item.length),
        };
        const response = await FooterServices.put(values);
        if (response.status == 200) {
          return onAddToast({ type: "success", message: `Lưu thành công` });
        }
        return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
      } catch (ex) {
        console.log(ex);
        onAddToast({ type: "error", message: `Có lỗi xảy ra` });
      } finally {
        setIsLoading(false);
      }
    },
  });
  const { handleSubmit, handleChange, errors, values, resetForm, touched } =
    formik;

  const handleCancel = () => {
    resetForm();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <h2 className="titlePage mb-4">Thông tin chân trang</h2>
        <div className="mb-8 flex flex-col gap-[10px]">
          <label className="text-lg font-normal text-[#F45538]">
            Tên công ty*
          </label>
          <div className="flex flex-col gap-2">
            <input
              name="comanyName"
              value={values.comanyName}
              placeholder="Nhập tên công ty"
              onChange={handleChange}
              className="w-full py-3 px-5 textInput"
            />
            {errors.comanyName && touched.comanyName && (
              <small className="text-[14px] leading-3 text-[#F31A1A]">
                {errors.comanyName}
              </small>
            )}
          </div>
        </div>
        <div className="w-2/3">
          <div className="mb-8">
            <label className="text-lg font-normal text-[#F45538]">
              Địa chỉ*
            </label>
            <InputFieldArrayElement
              name="address"
              values={values}
              onChange={handleChange}
              placeholder="Nhập tên địa chỉ"
            />
            {errors.address && touched.address && (
              <small className="text-[14px] leading-3 text-[#F31A1A]">
                {errors.address}
              </small>
            )}
          </div>
          <div className="mb-8">
            <label className="text-lg font-normal text-[#F45538]">
              Số điện thoại*
            </label>
            <InputFieldArrayElement
              name="phoneNumber"
              values={values}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
            {errors.phoneNumber && errors.phoneNumber && (
              <small className="text-[14px] leading-3 text-[#F31A1A]">
                {errors.phoneNumber}
              </small>
            )}
          </div>
          <div className="mb-9 flex flex-col gap-[10px]">
            <label className="text-lg font-normal text-[#F45538]">Email*</label>
            <div className="flex flex-col gap-2">
              <input
                name="email"
                value={values.email}
                placeholder="Nhập đúng định dạng email"
                onChange={handleChange}
                className="py-3 px-5 w-4/5 textInput"
              />
              {errors.email && touched.email && (
                <small className="text-[14px] leading-3 text-[#F31A1A]">
                  {errors.email}
                </small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            {socialList.map((itemSocial, index) => (
              <InputSocial
                key={index}
                name={itemSocial.name}
                placeholder={itemSocial.placeHorder}
                icon={itemSocial.icon}
                values={values}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
        <div className="flex item-center mt-7 mb-[59px] gap-5">
          <button
            type="button"
            className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
            onClick={() => handleCancel()}
          >
            Hủy bỏ
          </button>
          <BtnLoading
            type="submit"
            isLoading={isLoading}
            className="btn-normal text-sm leading-18 mr-10px"
          >
            Lưu thông tin
          </BtnLoading>
        </div>
      </form>
    </FormikProvider>
  );
}

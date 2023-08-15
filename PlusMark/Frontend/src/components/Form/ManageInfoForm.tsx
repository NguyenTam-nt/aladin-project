import { UtilHome1Icon, UtilHome2Icon, UtilHome3Icon, UtilHome4Icon } from "@assets/icons";
import BtnLoading from "@components/btn-loading/BtnLoading";
import { ToastContex } from "@contexts/ToastContex";
import HomeServices, { HomeContent } from "@services/HomeServices";
import { useFormik } from "formik";
import { ChangeEvent, useContext, useState } from "react";

interface Props {
  homeContents: Array<HomeContent>
}

export default function ManageInfoForm(props: Props) {
  const { homeContents } = props;
  const titleMaxLength = 20;
  const contentMaxLength = 50;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onAddToast } = useContext(ToastContex);
  const {
    handleSubmit,
    resetForm,
    setFieldValue,
    values
  } = useFormik({
    initialValues: {
      homeContents: homeContents
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const dataHomeContent = values.homeContents.map(item => {
          return {
            id: item.id,
            title: item.title,
            content: item.content
          };
        })
        const response = await HomeServices.post(dataHomeContent)
        if (response.status == 200) {
          return onAddToast({ type: "success", message: `Lưu thành công` });
        }
        return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
      } catch (ex) {
        console.log(ex)
        onAddToast({ type: "error", message: `Có lỗi xảy ra` });
      } finally {
        setIsLoading(false)
      }
    }
  })

  const handleCancel = () => {
    resetForm();
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, name: string, maxLength: number) => {
    const v = e.target.value
    return setFieldValue(name, v.substring(0, maxLength), true);
  }

  return (
    <form onSubmit={handleSubmit}>
      {values.homeContents.map((item, index) => {
        return (
          <div className="flex gap-7 mb-8" key={index}>
            {item.icon}
            <div className="border border-gray-200 rounded-md relative">
              <input
                name={`homeContents[${index}].title`}
                value={values['homeContents'][index]['title']}
                placeholder="Nhập tiêu đề"
                className="text-normal border-b border-b-gray-200 w-full rounded-t-md py-6px pr-100 pl-4 placeholder:text-gray-300"
                onChange={(e) => handleOnChange(e, `homeContents[${index}].title`, titleMaxLength)}
                maxLength={titleMaxLength}
              />
              <div className="text-gray-300 text-small text-normal leading-18 absolute right-4 top-10px">
                {values['homeContents'][index]['title'].length}/{titleMaxLength}
              </div>
              <input
                name={`homeContents[${index}].content`}
                value={values['homeContents'][index]['content']}
                placeholder="Nhập nội dung"
                className="text-normal w-full rounded-b-md pt-6px pr-100 pl-4 pb-6 placeholder:text-gray-300"
                onChange={(e) => handleOnChange(e, `homeContents[${index}].content`, contentMaxLength)}
                maxLength={contentMaxLength}
              />
              <div className="text-gray-300 text-small text-normal absolute right-4 bottom-1">
                {values['homeContents'][index]['content'].length}/{contentMaxLength}
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex item-center mt-7 mb-[59px] gap-5">
        <button
          type="button"
          className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
          onClick={() => handleCancel()}
        >
          Hủy bỏ
        </button>
        <BtnLoading
          isLoading={isLoading}
          type="submit"
          className="btn-normal text-sm leading-18 mr-10px"
        >
          Lưu thông tin
        </BtnLoading>
      </div>
    </form>
  )
}
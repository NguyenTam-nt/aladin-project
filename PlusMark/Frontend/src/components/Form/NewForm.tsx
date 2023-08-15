import UploadImageComp from "@components/AdminComponents/New/UploadImageComp";
import BtnLoading from "@components/btn-loading/BtnLoading";
import MyEditor from "@components/MyEditor";
import { ToastContex } from "@contexts/ToastContex";
import { New } from "@pages/Newspage/ManageNews";
import NewsServices from "@services/NewsServices";
import UploadImage from "@services/UploadImage";
import { ROUTES } from "@utility/constants";
import { getEntityMap } from "@utility/editor";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function NewForm({ post }: { post?: New }) {
  const defaultContent =
    '{"entityMap": {}, "blocks": [{ "key": "637gr", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]}';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileImage = useRef<File>();
  const { onAddToast } = useContext(ToastContex);
  const editorRef = useRef<any>();
  const listImageFiles = useRef<
    {
      src: string;
      data: File;
    }[]
  >([]);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } =
    useFormik({
      initialValues: {
        title: post?.title || "",
        describe: post?.describe || "",
        imageUrl: post?.imageUrl || "",
        content: post?.content || defaultContent,
      },
      validationSchema: yup.object({
        title: yup.string().trim().required("Vui lòng điền tiêu đề"),
        describe: yup.string().trim().required("Vui lòng điền mô tả"),
        content: yup.string().trim().isEditorRequired("Vui lòng điền nội dung"),
        imageUrl: yup.string().trim().required("Vui lòng tải ảnh đại diện"),
      }),
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
          const formData = new FormData();
          let url = post?.imageUrl;
          if (fileImage.current) {
            formData.append("file", fileImage.current);
            url = await UploadImage.uploadImage(formData);
          }
          const content = values.content;
          var contentObj = JSON.parse(content.replace(/'/g, '"'));
          const listImage = listImageFiles.current;
          if (listImage.length) {
            const entityMap = contentObj.entityMap;
            const newEntityMap = await getEntityMap(listImage, entityMap);
            contentObj = {
              ...contentObj,
              entityMap: newEntityMap,
            };
          }
          const dataSubmit = {
            title: values.title,
            describe: values.describe,
            content: JSON.stringify(contentObj),
            imageUrl: url,
          };
          let response;
          if (post) {
            response = await NewsServices.put(post.id, dataSubmit);
          } else {
            response = await NewsServices.post(dataSubmit);
          }
          if (response.status == 200) {
            onAddToast({ type: "success", message: `Lưu thành công` });
            return navigate(`/admin/${ROUTES.admin.news.index}`);
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

  const handleCancel = () => {
    navigate(`/admin/${ROUTES.admin.news.index}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold text-[#F45538]">
            Tiêu đề tin tức*
          </label>
          <div>
            <input
              name="title"
              className="w-full p-4 textInput"
              onChange={handleChange}
              value={values.title}
            />
            {errors.title && touched.title && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.title}
              </small>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold text-[#F45538]">Mô tả*</label>
          <div>
            <textarea
              className="w-full p-4 textInput resize-none"
              name="describe"
              rows={5}
              onChange={handleChange}
              value={values.describe}
            ></textarea>
            {errors.describe && touched.describe && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.describe}
              </small>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-lg font-bold text-[#F45538]">
            Nội dung tin tức*
          </h4>
          <div>
            <MyEditor
              ref={editorRef}
              name="content"
              value={values.content}
              setValue={setFieldValue}
              listImageFiles={listImageFiles}
            />
            {errors.content && touched.content && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.content}
              </small>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-4">
          <p className="text-lg font-bold text-[#F45538]">
            Tải ảnh đại diện tin tức*
          </p>
          <div>
            <UploadImageComp
              fileImage={fileImage}
              name="imageUrl"
              setValue={setFieldValue}
              value={values.imageUrl}
            />
            {errors.imageUrl && touched.imageUrl && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.imageUrl}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="flex item-center justify-end mt-[70px] mb-[155px] gap-10px">
        <button
          type="button"
          className="w-fit h-full hover:cursor-pointer bg-[#FFEDE1] text-main text-normal1 px-5 py-2 rounded-sm border border-main"
          onClick={handleCancel}
        >
          Hủy
        </button>
        <BtnLoading
          isLoading={isLoading}
          type="submit"
          className="w-fit h-full hover:cursor-pointer text-white bg-main text-normal1 px-5 py-2 rounded-sm"
        >
          Lưu
        </BtnLoading>
      </div>
    </form>
  );
}

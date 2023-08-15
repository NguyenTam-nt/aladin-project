import BtnLoading from "@components/btn-loading/BtnLoading";
import MyEditor from "@components/MyEditor";
import { ToastContex } from "@contexts/ToastContex";
import { Policy } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import { ROUTES } from "@utility/constants";
import { getEntityMap } from "@utility/editor";
import yup from "custom/yup/yupInstance";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyForm({ policy }: { policy?: Policy }) {
  const defaultContent =
    '{"entityMap": {}, "blocks": [{ "key": "637gr", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]}';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onAddToast } = useContext(ToastContex);
  const editorRef = useRef<any>();
  const listImageFiles = useRef<
    {
      src: string;
      data: File;
    }[]
  >([]);
  const navigate = useNavigate();

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } =
    useFormik({
      initialValues: {
        title: policy?.title || "",
        describe: policy?.describe || "",
        content: policy?.content || defaultContent,
      },
      validationSchema: yup.object({
        title: yup.string().trim().required("Vui lòng điền tiêu đề"),
        describe: yup.string().trim().required("Vui lòng điền mô tả"),
        content: yup.string().trim().isEditorRequired("Vui lòng điền nội dung"),
      }),
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
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
          };
          let response;
          if (policy) {
            response = await PolicyServices.put(policy.id, dataSubmit);
          } else {
            response = await PolicyServices.post(dataSubmit);
          }
          if (response.status == 200) {
            onAddToast({ type: "success", message: `Lưu thành công` });
            return navigate(`/admin/${ROUTES.admin.policy.index}`);
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
    navigate(`/admin/${ROUTES.admin.policy.index}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold text-[#F45538]">
            Tiêu đề chính sách*
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
          <label className="text-lg font-bold text-[#F45538]">
            Mô tả chính sách*
          </label>
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
          <label className="text-lg font-bold text-[#F45538]">
            Nội dung chính sách*
          </label>
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
      </div>

      <div className="flex item-center justify-end mt-[70px] mb-[155px] gap-10px">
        <button
          type="button"
          className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
          onClick={() => handleCancel()}
        >
          Hủy
        </button>
        <BtnLoading
          type="submit"
          className="btn-normal text-sm leading-18"
          isLoading={isLoading}
        >
          Lưu
        </BtnLoading>
      </div>
    </form>
  );
}

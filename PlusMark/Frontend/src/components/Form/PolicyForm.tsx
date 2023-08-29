import BtnLoading from "@components/btn-loading/BtnLoading";
import MyEditor from "@components/MyEditor";
import { ToastContex } from "@contexts/ToastContex";
import useI18n from "@hooks/useI18n";
import { Policy } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import TranslateService from "@services/TranslateService";
import { ROUTES } from "@utility/constants";
import { getEntityMap } from "@utility/editor";
import yup from "custom/yup/yupInstance";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyForm({ policy }: { policy?: Policy }) {
  const { lang } = useI18n();
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

  const translateObjectContent = (contentObj: any, type: string) => {
    var blocksReturn: any = [];
    contentObj.blocks.forEach(async (block: any) => {
      if (type == 'ksl') {
        block.text = await TranslateService.translateToKorea({ content: block.text })
      }
      if (type == 'vi') {
        block.text = await TranslateService.translateToVietNam({ content: block.text })
      }
      blocksReturn.push(block);
    });
    return contentObj = {
      ...contentObj,
      blocks: blocksReturn
    }
  }

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
          const contentDefault = JSON.stringify(contentObj);

          contentObj = (lang === 'ksl') ? await translateObjectContent(contentObj, 'vi') : await translateObjectContent(contentObj, 'ksl');

          const dataSubmit = (lang === 'ksl') ? {
            titleVn: await TranslateService.translateToVietNam({ content: values.title }),
            titleKr: values.title,
            describeVn: await TranslateService.translateToVietNam({ content: values.describe }),
            describeKr: values.describe,
            contentKr: contentDefault,
            contentVn: JSON.stringify(contentObj),
          } : {
            titleVn: values.title,
            titleKr: await TranslateService.translateToKorea({ content: values.title }),
            describeVn: values.describe,
            describeKr: await TranslateService.translateToKorea({ content: values.describe }),
            contentVn: contentDefault,
            contentKr: JSON.stringify(contentObj),
          };

          console.log(dataSubmit)

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
    <form onSubmit={handleSubmit} className="px-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold ">
            Tiêu đề <span className="text-[#F45538]">*</span>
          </label>
          <div>
            <input
              name="title"
              className="w-full p-4 border-2 bg-inherit"
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
          <label className="text-lg font-bold">
            Mô tả <span className="text-[#F45538]">*</span>
          </label>
          <div>
            <input
              className="w-full p-4 border-2 bg-inherit"
              name="describe"
              onChange={handleChange}
              value={values.describe}
            />
            {errors.describe && touched.describe && (
              <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                {errors.describe}
              </small>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-lg font-bold">
            Nội dung <span className="text-[#F45538]">*</span>
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
          className="w-[8%] py-4 border border-[#0073E5] flex justify-center items-center  text-[#0073E5]  font-bold bg-white"
          onClick={() => handleCancel()}
        >
          Hủy
        </button>
        <BtnLoading
          type="submit"
          className="w-[8%] py-4 border border-[#0073E5] flex justify-center items-center  text-[#0073E5]  font-bold bg-white"
          isLoading={isLoading}
        >
          Lưu
        </BtnLoading>
      </div>
    </form>
  );
}

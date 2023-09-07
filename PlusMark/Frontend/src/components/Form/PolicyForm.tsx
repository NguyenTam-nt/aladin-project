import BtnLoading from "@components/btn-loading/BtnLoading";
import MyEditor from "@components/MyEditor";
import { ToastContex } from "@contexts/ToastContex";
import useI18n from "@hooks/useI18n";
import { Policy, PolicyWithLang } from "@pages/AdminPage/ManagePolicy";
import PolicyServices from "@services/PolicyServices";
import TranslateService from "@services/TranslateService";
import { ROUTES } from "@utility/constants";
import { getEntityMap } from "@utility/editor";
import yup from "custom/yup/yupInstance";
import { useFormik } from "formik";
import { t } from "i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyForm({ policy }: { policy?: PolicyWithLang }) {
  const { lang } = useI18n();
  const [defaultContent, setDefaultContent] = useState<string>('{"entityMap": {}, "blocks": [{ "key": "637gr", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]}');
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

  // Use the useEffect hook to update initial values when the language changes
  useEffect(() => {
    const initialValues = {
      title: "",
      describe: "",
      content: defaultContent,
    };

    // Check the language and update initial values accordingly
    if (lang === 'ksl') {
      initialValues.title = policy?.titleKr || "";
      initialValues.describe = policy?.describeKr || "";
      initialValues.content = policy?.contentKr || defaultContent;
    } else {
      initialValues.title = policy?.titleVn || "";
      initialValues.describe = policy?.describeVn || "";
      initialValues.content = policy?.contentVn || defaultContent;
    }

    setFieldValue("title", initialValues.title);
    setFieldValue("describe", initialValues.describe);
    setFieldValue("content", initialValues.content);
  }, [lang, policy]);

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
      initialValues: lang === 'ksl' ? {
        title: policy?.titleKr || "",
        describe: policy?.describeKr || "",
        content: policy?.contentKr || defaultContent,
      } : {
        title: policy?.titleVn || "",
        describe: policy?.describeVn || "",
        content: policy?.contentVn || defaultContent,
      },
      validationSchema: yup.object({
        title: yup.string().trim().required(t("text.form.policy.required_title")),
        describe: yup.string().trim().required(t("text.form.policy.required_description")),
        content: yup.string().trim().isEditorRequired(t("text.form.policy.required_content")),
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

          if (policy) {
            await PolicyServices.put(policy.id, dataSubmit);
            onAddToast({ type: "success", message: t("success.updated") });
          } else {
            await PolicyServices.post(dataSubmit);
            onAddToast({ type: "success", message: t("success.posted") });
          }
          return navigate(`/admin/${ROUTES.admin.policy.index}`);
        } catch (ex) {
          console.log(ex);
          return  onAddToast({ type: "error", message: t("error.post_error") });
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
            {t("text.section.title")} <span className="text-[#F45538]">*</span>
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
          {t("text.section.description")} <span className="text-[#F45538]">*</span>
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
          {t("text.section.content")} <span className="text-[#F45538]">*</span>
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
          {t("text.button.cancel")}
        </button>
        <BtnLoading
          type="submit"
          className="w-[8%] py-4 border border-[#0073E5] flex justify-center items-center  text-white  font-bold bg-[#0073E5]"
          isLoading={isLoading}
        >
           {t("text.button.save")}
        </BtnLoading>
      </div>
    </form>
  );
}

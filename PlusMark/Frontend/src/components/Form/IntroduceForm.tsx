import BtnLoading from "@components/btn-loading/BtnLoading";
import MyEditor from "@components/MyEditor";
import { ToastContex } from "@contexts/ToastContex";
import IntroServices from "@services/IntroServices";
import { getEntityMap } from "@utility/editor";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import * as yup from 'yup';

interface Props {
  content: string
}
export default function IntroduceForm(props: Props) {
  const { content } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onAddToast } = useContext(ToastContex);
  const editorRef = useRef<any>();
  const listImageFiles = useRef<{
    src: string,
    data: File
  }[]>([])
  const {
    handleSubmit,
    setFieldValue,
    errors,
    values,
    touched
  } = useFormik({
    initialValues: {
      content: content
    },
    validationSchema: yup.object({
      content: yup.string()
        .trim()
        .isEditorRequired("Vui lòng điền nội dung")
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const content = values.content;
        var contentObj = JSON.parse(content.replace(/'/g, '"'));
        const listImage = listImageFiles.current
        if (listImage.length) {
          const entityMap = contentObj.entityMap
          const newEntityMap = await getEntityMap(listImage, entityMap)
          contentObj = {
            ...contentObj,
            entityMap: newEntityMap
          }
        }
        const response = await IntroServices.put({
          content: JSON.stringify(contentObj)
        })
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
    editorRef.current.resetEditor()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5">
        <MyEditor
          ref={editorRef}
          name="content"
          value={values.content}
          setValue={setFieldValue}
          listImageFiles={listImageFiles}
        />
        {errors.content && touched.content && <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
          {errors.content}
        </small>}
      </div>
      <div className="flex item-center justify-end mt-7 gap-10px">
        <button
          type="button"
          className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal bg-icon"
          onClick={() => handleCancel()}
        >
          Hủy
        </button>
        <BtnLoading
          isLoading={isLoading}
          type="submit"
          className="btn-normal text-sm leading-18"
        >
          Lưu
        </BtnLoading>
      </div>
    </form>
  )
}
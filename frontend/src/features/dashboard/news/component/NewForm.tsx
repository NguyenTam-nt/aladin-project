import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { Input } from "@features/dashboard/components/Input";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { newService } from "@services/newService";
import { uploadService } from "@services/upload";
import type { newItem_type } from "@typeRules/new";
import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface Props {
  newItemProps?: newItem_type;
}
const NewForm = memo(({ newItemProps }: Props) => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useShowMessage();
  const { hideModal, setElementModal } = useModalContext();
  const { preViewImage, file, handleChange, handleDelete, resetImage } =
    useHandleImage(newItemProps?.linkMedia || "");

  const formik = useFormik<newItem_type>({
    initialValues: {
      linkMedia: newItemProps?.linkMedia || "",
      title: newItemProps?.title || "",
      content: newItemProps?.content || "",
      description: newItemProps?.description || "",
    },
    validationSchema: Yup.object({
      linkMedia: Yup.string().trim().required("Không được để trống ảnh."),
      title: Yup.string().trim().required("Không được để trống tiêu đề."),
      description: Yup.string()
        .trim()
        .required("Không được để trống mô tả tin tức."),
      content: Yup.string().trim().required("Không được để trống nội dung."),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let pathImage = "";
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const { list } = await uploadService.postImage(formData);
          setFieldValue("linkMedia", list[0].linkMedia);
          pathImage = list[0].linkMedia!;
        }
        const dataValue = {
          ...values,
          linkMedia: file ? pathImage : values.linkMedia,
        };
        const dataUpload = newItemProps?.id
          ? { id: newItemProps.id, ...dataValue }
          : dataValue;
        const result = await newService.postOrPutNew(
          dataUpload,
          newItemProps?.id
        );
        showSuccess("message.actions.success.update");
        setSubmitting(false);
        if (!newItemProps?.id) {
          handleResetDefault();
        }
      } catch (error) {
        showError("message.actions.error.delete_banner");
        setSubmitting(false);
      }
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange: handleChangeFomik,
    resetForm,
    setValues,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleDeletePreview = () => {
    if (newItemProps?.id) {
      setElementModal(
        <DiglogComfirmDelete
          message="recruit.message_delete"
          onClick={() => {
            handleDelete();
            setFieldValue("linkMedia", "");
            hideModal();
          }}
        />
      );
    } else {
      handleDelete();
      setFieldValue("linkMedia", "");
    }
  };
  const handleResetDefault = () => {
    resetForm();
    resetImage();
  };
  useEffect(() => {
    if (preViewImage != "") {
      setFieldValue("linkMedia", preViewImage);
    }
  }, [preViewImage]);

  useEffect(() => {
    if (newItemProps) {
      setValues(newItemProps);
    }
  }, [newItemProps]);
  return (
    <div>
      <TitleOfContentManage
        name={newItemProps?.id ? "news.update" : "news.create"}
        className="mb-8"
      />
      <div>
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="col-span-2 flex items-center gap-x-[24px]">
            <div>
              <TitleInput name="news.uploadImage" />
              <div className="w-[288px] h-[190px]">
                <InputUploadFile onChange={handleChange} />
              </div>
            </div>
            {!!preViewImage ? (
              <div className="w-[288px] flex flex-col">
                <div className="flex-1 w-full">
                  <TitleInput
                    isRequired={false}
                    forId=""
                    name="common.image_uploaded"
                  />
                  <div className=" w-full h-[190px]">
                    <ImagePreview
                      url={preViewImage}
                      onDelete={handleDeletePreview}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {errors.linkMedia && touched.linkMedia && (
            <small className="text-xs font-normal mt-1 text-text_EA222A">
              {errors.linkMedia}
            </small>
          )}
          <div className="col-span-2">
            <div className="mb-4">
              <TitleInput name="news.form.title" />
              <Input
                placeholder="news.form.inputTitle"
                name="title"
                value={values.title}
                onChange={handleChangeFomik}
              />
              {errors.title && touched.title && (
                <small className="text-xs font-normal mt-1 text-text_EA222A">
                  {errors.title}
                </small>
              )}
            </div>
            <div className="w-full">
              <TitleInput name="news.form.des" />
              <Input
                placeholder="news.form.inputDes"
                name="description"
                value={values.description}
                onChange={handleChangeFomik}
              />
              {errors.description && touched.description && (
                <small className="text-xs font-normal mt-1 text-text_EA222A">
                  {errors.description}
                </small>
              )}
            </div>
          </div>

          <div className=" col-span-2">
            <TitleInput name="news.form.content" />
            <div>
              <Editor
                content={
                  values.content == ""
                    ? values.content
                    : JSON.parse(values.content)
                }
                onChange={(value: any) => {
                  const data = JSON.stringify(value);
                  if (data === '""') {
                    setFieldValue("content", "");
                    return;
                  }
                  setFieldValue("content", data);
                }}
              />
              {errors.content && touched.content && (
                <small className="text-xs font-normal mt-1 text-text_EA222A">
                  {errors.content}
                </small>
              )}
            </div>
          </div>

          <div className=" col-span-2 flex justify-end">
            <GroupButtonAdmin
              onCancel={() =>
                navigate(`${prefixRootRoute.admin}/${pathsAdmin.news.prefix}`)
              }
              onSubmit={handleSubmit}
              isAdd={newItemProps?.id ? false : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewForm;

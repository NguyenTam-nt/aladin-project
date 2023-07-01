import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { recruitService } from "@services/recruitService";
import { uploadService } from "@services/upload";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ImagePreview } from "../../components/ImagePreview";
import { Input } from "../../components/Input";
import { InputUploadFile } from "../../components/InputUploadFIle";
import { useHandleImage } from "../../home/useHandleImage";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import type { Recruit_type } from "@typeRules/recruit";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";

interface Props {
  itemRecruit?: Recruit_type;
}
const RecruitmentForm = ({ itemRecruit }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useShowMessage();
  const { hideModal, setElementModal } = useModalContext();
  const { file, preViewImage, handleChange, handleDelete } = useHandleImage(
    itemRecruit ? itemRecruit?.linkMedia : ""
  );

  const formik = useFormik({
    initialValues: {
      linkMedia: preViewImage || "",
      title: itemRecruit ? itemRecruit.title : "",
      salary: itemRecruit ? itemRecruit.salary : 0,
      expirationDate: itemRecruit ? itemRecruit.expirationDate : "",
      address: itemRecruit ? itemRecruit.address : "",
      content: itemRecruit ? itemRecruit.content : "",
    },
    validationSchema: Yup.object({
      linkMedia: Yup.string()
        .trim()
        .required("Không được để trống ảnh tuyển dụng.")
        .max(255, "Không được quá 255 kí tự."),
      title: Yup.string().trim().required("Không được để trống tiền lương."),
      salary: Yup.string()
        .trim()
        .required("Không được để trống tiêu đề.")
        .matches(/^[1-9]\d*$/, "Không khớp với định dạng lương.")
        .max(255, "Không được quá 255 kí tự."),
      expirationDate: Yup.date()
        .required("Không được để trống thời gian kết thúc tuyển dụng.")
        .min(
          new Date(new Date(new Date()).setDate(new Date().getDate() - 1)),
          "Ngày không thể là thời gian trước đó."
        ),
      // Yup.string()
      //   .trim()
      //   .required("Không được để trống thời gian kết thúc tuyển dụng."),
      address: Yup.string()
        .trim()
        .required("Không được để trống địa chỉ.")
        .max(255, "Không được quá 255 kí tự."),
      content: Yup.string()
        .trim()
        .required("Không được để trống nội dung.")
        .max(2000, "adminPolicy.form.content_max"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let imagePath: string | null = null;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const { list } = await uploadService.postImage(formData);
          setValues({
            ...values,
            linkMedia: list[0].linkMedia!,
          });
          imagePath = list[0].linkMedia!;
        }
        const data: Recruit_type = {
          ...values,
          expirationDate: new Date(values.expirationDate).toISOString(),
          linkMedia: imagePath ? imagePath : values.linkMedia,
        };
        const upData = itemRecruit?.id ? { id: itemRecruit.id, ...data } : data;

        const postRecruit = await recruitService.postOrUpdateRecruit(
          upData,
          itemRecruit?.id
        );
        if (itemRecruit?.id || id) {
          showSuccess("message.actions.success.update");
        }
        navigate(-1);
        setSubmitting(false);
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
    handleReset,
    setValues,
    setFieldValue,
    handleSubmit,
  } = formik;

  const handleDeteImagePrev = () => {
    if (itemRecruit?.id) {
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
  useEffect(() => {
    if (preViewImage != "") {
      setValues({
        ...values,
        linkMedia: preViewImage,
      });
    }
  }, [preViewImage]);

  useEffect(() => {
    if (itemRecruit) {
      setValues({
        linkMedia: itemRecruit.linkMedia,
        title: itemRecruit.title,
        salary: itemRecruit.salary,
        expirationDate: itemRecruit.expirationDate,
        address: itemRecruit.address,
        content: itemRecruit.content,
      });
    }
  }, [itemRecruit]);
  return (
    <div>
      <TitleOfContentManage
        name={id ? "recruit.update" : "recruit.create"}
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
                      onDelete={handleDeteImagePrev}
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
            <TitleInput name="news.form.title" />
            <Input
              placeholder="recruit.form.title"
              value={values.title}
              name="title"
              onChange={handleChangeFomik}
            />
            {errors.title && touched.title && (
              <small className="text-xs font-normal mt-1 text-text_EA222A">
                {errors.title}
              </small>
            )}
          </div>

          <div>
            <TitleInput name="recruit.salary" />
            <Input
              name="salary"
              placeholder="recruit.form.salary"
              value={values.salary}
              onChange={handleChangeFomik}
            />
            {errors.salary && touched.salary && (
              <small className="text-xs font-normal mt-1 text-text_EA222A">
                {errors.salary}
              </small>
            )}
          </div>
          <div>
            <TitleInput name="recruit.timeEndRecruit" />
            <input
              name="expirationDate"
              onChange={handleChangeFomik}
              value={FomatDateYY_MM_DD(values.expirationDate)}
              type="date"
              placeholder=""
              className={
                "h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 "
              }
            />
            {errors.expirationDate && touched.expirationDate && (
              <small className="text-xs font-normal mt-1 text-text_EA222A">
                {errors.expirationDate}
              </small>
            )}
          </div>
          <div className="col-span-2">
            <TitleInput name="recruit.address" />
            <Input
              placeholder="recruit.form.address"
              value={values.address}
              name="address"
              onChange={handleChangeFomik}
            />
            {errors.address && touched.address && (
              <small className="text-xs font-normal mt-1 text-text_EA222A">
                {errors.address}
              </small>
            )}
          </div>

          <div className=" col-span-2">
            <TitleInput name="recruit.form.content" />
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
            </div>
            {errors.content && touched.content && (
              <small className="text-xs font-normal mt-1 text-text_EA222A">
                {errors.content}
              </small>
            )}
          </div>

          <div className=" col-span-2 flex justify-end">
            <GroupButtonAdmin
              onCancel={() => navigate(-1)}
              isAdd={id ? false : undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentForm;

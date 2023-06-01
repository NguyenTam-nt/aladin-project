import { ICDeleteImage } from "@assets/icons/ICDeleteImage";
import { ICSave } from "@assets/icons/ICSave";
import { Button } from "@components/Button";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import Editor from "@components/Editor";
import { Input } from "@components/Input";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import TitleInput from "@features/dashboard/components/TitleInput";
import { translateService } from "@services/translate";
import { ContentType, IContent } from "@typeRules/content";
import { useFormik } from "formik";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import * as Yup from "yup";
import { useHandleMultiImage } from "../../hooks/useHandleMultiImage";
import { uploadService } from "@services/uploadService";
import { convertContent } from "@commons/index";
import { TextError } from "@features/dashboard/components/TextError";

type Props = {
  type?: "ADD" | "EDIT";
  data?: IContent;
  onSubmit?: (data: IContent) => void;
  onDelete?: (id: number) => void;
  contentType?: ContentType;
};

export const TopicPostItem = memo(
  ({
    type = "EDIT",
    data,
    onSubmit,
    onDelete,
    contentType = ContentType.general,
  }: Props) => {
    const formik = useFormik({
      initialValues: {
        title: "",
        titleKo: "",
        content: "",
        contentKo: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().required("message.warn._required"),
        titleKo: Yup.string().required("message.warn._required"),
        content: Yup.string().required("message.warn._required"),
        contentKo: Yup.string().required("message.warn._required"),
      }),
      onSubmit: async (values) => {
        let images: string[] = [];
        if (files.length && contentType !== ContentType.general) {
          images = await handlePostImage(files);
        }
        const listNewsFile = images.map((item) => {
          return {
            link: item,
          };
        });

        const linkPaste = linkPasteImage.map(item => ({link: item}))
        if (isAdd) {
          onSubmit?.({
            ...values,
            files: [...listNewsFile, ...linkPaste]
          });
          formik.resetForm()
          handleDelete()
          return;
        }
        onSubmit?.({
          ...data,
          ...values,
          id: data?.id,
          files: [
            ...listNewsFile,
            ...linkPaste,
            ...data?.files ?? []
          ]
        });
      },
    });

    const isAdd = useMemo(() => {
      return type === "ADD";
    }, [type]);

    useEffect(() => {
      if (!isAdd && data) {
        formik.setFieldValue("title", data.title);
        formik.setFieldValue("titleKo", data.titleKo);
        formik.setFieldValue("content", data.content);
        formik.setFieldValue("contentKo", data.contentKo);
      }
    }, [isAdd, data]);

    const { preViewImage, handleChange, handlePastLink, files, linkPasteImage, handleDelete } =
      useHandleMultiImage(
        data?.files && data?.files.map((item) => item?.link ?? "")
      );
    const { t, isVn } = useContext(TranslateContext);
    const { setElementModal } = useContext(ModalContext);
    const handleShowModal = () => {
      setElementModal(
        <DialogConfirmDelete
          onClick={() => onDelete?.(Number(data?.id))}
          message={t("admin._notice._delete_history")}
        />
      );
    };

    const handleTranslate = useCallback(
      async (name: string, value: string) => {
        try {
          if (isVn) {
            const newContent = convertContent(value)
            const content = await translateService.post(newContent);
            formik.setFieldValue(`${name}Ko`, content);
          }
        } catch (error) {}
      },
      [isVn]
    );

    const handleBlur = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleTranslate(name, value);

        formik.handleBlur(event);
      },
      [handleTranslate]
    );

    const handleBlurEditor = useCallback(
      (content: string) => {
        if (isVn) {
          formik.setFieldValue("content", content);
          const newContent = convertContent(content)
          handleTranslate("content", newContent);
          return;
        }
        formik.setFieldValue("contentKo", content);
      },
      [isVn, handleTranslate]
    );

    const handlePostImage = useCallback(async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });
      return await uploadService.postImages(formData);
    }, []);

    return (
      <form onSubmit={formik.handleSubmit} className="mb-[24px] [&>div]:relative">
        <div className="relative">
          <TitleInput name="admin._about._general._form._title" forId={""} />
          <Input
            onBlur={handleBlur}
            name={isVn ? "title" : "titleKo"}
            value={isVn ? formik.values.title : formik.values.titleKo}
            onChange={formik.handleChange}
            placeholder="admin._about._general._form._title_placeholder"
          />
          {formik.errors.title && formik.touched.title && <TextError message={formik.errors.title} />}
        </div>

        <div className="mt-[16px]">
          <TitleInput name="admin._about._general._form._content" forId={""} />
          <Editor
            content={isVn ? formik.values.content ?? "" : formik.values.contentKo ?? ""}
            onBlur={handleBlurEditor}
            onChange={() => {}}
          />
           {formik.errors.content && isAdd && <TextError message={formik.errors.content} />}
        </div>
        {contentType !== ContentType.general ? (
          <div className="mt-[16px] flex flex-wrap gap-[24px]">
            <div className="w-[648px]  h-[168px]">
              <InputUploadFile
                multiple
                onChange={handleChange}
                onPaseLink={handlePastLink}
              />
            </div>
            {preViewImage.map((item, index) => {
              return (
                <div key={index} className=" h-[168px] w-[250px]">
                  <ImagePreview url={item} />
                </div>
              );
            })}
          </div>
        ) : null}
        <div className="mt-[24px] gap-x-[24px] flex items-center">
          {!isAdd ? (
            <Button
              onClick={handleShowModal}
              className="border border-text_C53434 text-text_C53434 max-w-[170px]"
              imageLeft={
                <span className="mr-2">
                  <ICDeleteImage color={Colors.text_C53434} />
                </span>
              }
              color="empty"
              text={"button._delete_paragral"}
            />
          ) : null}

          <Button
            type="submit"
            className="max-w-[170px]"
            imageLeft={
              <span className="mr-2">
                <ICSave />
              </span>
            }
            color="primary"
            text="button._save"
          />
        </div>
      </form>
    );
  }
);

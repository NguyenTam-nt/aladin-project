import { ICDeleteImage } from "@assets/icons/ICDeleteImage";
import { ICSave } from "@assets/icons/ICSave";
import { Button } from "@components/Button";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import Editor from "@components/Editor";
import { Input } from "@components/Input";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import TitleInput from "@features/dashboard/components/TitleInput";
import { translateService } from "@services/translate";
import type { IContent } from "@typeRules/content";
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

type Props = {
  type?: "ADD" | "EDIT";
  data?: IContent;
  onSubmit?: (data: IContent) => void;
  onDelete?: (id: number) => void;
};

export const TopicPostItem = memo(
  ({ type = "EDIT", data, onSubmit, onDelete }: Props) => {
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
      onSubmit: (values) => {
        if (isAdd) {
          onSubmit?.({
            ...values,
          });
          return;
        }
        onSubmit?.({
          ...values,
          id: data?.id,
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
            const content = await translateService.post(value);
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
          handleTranslate("content", content);
          return;
        }
        formik.setFieldValue("contentKo", content);
      },
      [isVn, handleTranslate]
    );

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="relative">
          <TitleInput name="admin._about._general._form._title" forId={""} />
          <Input
            onBlur={handleBlur}
            name={isVn ? "title" : "titleKo"}
            value={isVn ? formik.values.title : formik.values.titleKo}
            onChange={formik.handleChange}
            placeholder="admin._about._general._form._title_placeholder"
          />
        </div>

        <div className="mt-[16px]">
          <TitleInput name="admin._about._general._form._content" forId={""} />
          <Editor
            content={isVn ? formik.values.content : formik.values.contentKo}
            onBlur={handleBlurEditor}
            onChange={() => {}}
          />
        </div>
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

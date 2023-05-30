import { ICDeleteImage } from "@assets/icons/ICDeleteImage";
import { ICSave } from "@assets/icons/ICSave";
import { Button } from "@components/Button";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { Input } from "@components/Input";
import { InputMultiLine } from "@components/InputMultiLine";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import TitleInput from "@features/dashboard/components/TitleInput";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { uploadService } from "@services/uploadService";
import { historySevice } from "@services/historyService";
import type { IHistory } from "@typeRules/history";
import { PopUpContext } from "@contexts/PopupContext";
import { translateService } from "@services/translate";

type PropsTopicHistoryItem = {
  type?: "ADD" | "EDIT";
  data?: IHistory;
  onSubmit?: (data: IHistory) => void;
  onDeleteHistory?: (id: number) => void;
};

export const TopicHistoryItem = memo(
  ({
    type = "EDIT",
    data,
    onSubmit,
    onDeleteHistory,
  }: PropsTopicHistoryItem) => {
    const isAdd = useMemo(() => {
      return type === "ADD";
    }, [type]);
    const { showSuccess, showError } = useContext(PopUpContext);
    const formik = useFormik({
      initialValues: {
        year: "",
        image: "",
        description: "",
        descriptionKo: "",
      },
      validationSchema: Yup.object({
        year: Yup.string().required("message.warn._required"),
        description: Yup.string().required("message.warn._required"),
        descriptionKo: Yup.string().required("message.warn._required"),
      }),
      onSubmit: async (values) => {
        if (!isAdd) return;
        try {
          const formData = new FormData();
          let image = "";
          if (file) {
            formData.append("file", file);
            image = await uploadService.postImage(formData);
          }

          historySevice
            .post({
              ...values,
              image,
            })
            .then((data) => {
              onSubmit?.(data);
              showSuccess("message.success._success");
              formik.resetForm()
              handleDelete()
            }).catch(() => {
              showError("message.error._error");

            })
           
        } catch (error) {
        }
      },
    });
    const { t, isVn } = useContext(TranslateContext);

    const handleSubmitEdit = useCallback(
      (data: IHistory) => {
        historySevice
          .put(data)
          .then((data) => {
            onSubmit?.(data);
            showSuccess("message.success._success");
          })
          .catch(() => {
            showError("message.success._success");
          });
      },
      [onSubmit, showError, showSuccess]
    );

    const handleChangeFileEdit = useCallback(
      async (file: File) => {
        if (!isAdd) {
          const formData = new FormData();

          formData.append("file", file);
          const image = await uploadService.postImage(formData);
          handleSubmitEdit({
            ...data,
            image,
          });
        }
      },
      [data, handleSubmitEdit, isAdd]
    );

    const { preViewImage, handleChange, file, handleDelete } = useHandleImage(
      formik.values.image,
      handleChangeFileEdit
    );
    const { setElementModal } = useContext(ModalContext);

    const handleDeteleHistory = useCallback(() => {
      historySevice
        .delete(Number(data?.id))
        .then(() => {
          onDeleteHistory?.(Number(data?.id));
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.success._success");
        });
    }, [data?.id, onDeleteHistory, showError, showSuccess]);

    const handleShowModal = () => {
      setElementModal(
        <DialogConfirmDelete
          onClick={handleDeteleHistory}
          message={t("admin._notice._delete_history")}
        />
      );
    };

    useEffect(() => {
      if (!isAdd && data) {
        formik.setFieldValue("year", data.year);
        formik.setFieldValue("image", data.image);
        formik.setFieldValue("description", data.description);
        formik.setFieldValue("descriptionKo", data.descriptionKo);
      }
      
    }, [isAdd, data]);

    const handleTranslate = useCallback(
      async (name: keyof IHistory, value: string) => {
        try {
          const content = await translateService.post(value);
          formik.setFieldValue(`${name}Ko`, content);
          //@ts-ignore
          if (!isAdd && (value !== data?.[name] || content !== data?.[`${name}Ko`])) {
            handleSubmitEdit({
              ...data,
              [name]: value,
              [`${name}Ko`]: content,
            });
          }
        } catch (error) {}
      },
      [data, handleSubmitEdit, isAdd]
    );

    const handleBlur = useCallback(
      async (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        if (isVn && name === "description") {
          handleTranslate(name, value);
          formik.handleBlur(event);
          return;
        }
        if (!isAdd && Number(value) !==  Number(data?.year)) {
          handleSubmitEdit({
            ...data,
            [name]: value,
          });
        }

        formik.handleBlur(event);
      },
      [data, handleSubmitEdit, handleTranslate, isAdd, isVn]
    );

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-x-[24px] relative">
          <div className="w-[312px]">
            <InputYear
              value={formik.values.year}
              name="year"
              type="number"
              onChange={formik.handleChange}
              onBlur={handleBlur}
            />
            <InputUpFile onChange={handleChange} image={preViewImage} />
            {isAdd ? (
              <Button
                type="submit"
                className={clsx("mt-[12px]")}
                imageLeft={
                  <span className="mr-2">
                    <ICSave />
                  </span>
                }
                color="primary"
                text="button._save"
              />
            ) : null}
          </div>
          <DescriptionInput
            onChange={formik.handleChange}
            onBlur={handleBlur}
            name={isVn ? "description" : "descriptionKo"}
            value={
              isVn ? formik.values.description : formik.values.descriptionKo
            }
          />
          {!isAdd ? (
            <button
              onClick={handleShowModal}
              // className="absolute top-[50%] right-[-20px] 2xl:right-[-44px] translate-y-[-50%]"
            >
              <ICDeleteImage
                width={20}
                height={20}
                color={Colors.text_C53434}
              />
            </button>
          ) : null}
        </div>
      </form>
    );
  }
);

const InputYear = memo((props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="w-full">
      <TitleInput
        forId={"admin._about._general._form._year"}
        name="admin._about._general._form._year"
      />
      <Input
        id="admin._about._general._form._year"
        placeholder="admin._about._general._form._year_placeholder"
        {...props}
      />
    </div>
  );
});

const InputUpFile = memo(
  ({
    image,
    onChange,
  }: {
    image: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const refInput = useRef<HTMLInputElement>(null);

    const handleClickInput = useCallback(() => {
      refInput.current?.click();
    }, []);

    return (
      <div className="w-full mt-[24px]">
        <TitleInput forId={""} name="admin._about._general._form._upload" />
        <div className="h-[168px]">
          <div className={clsx("h-full", { hidden: !!image.trim() })}>
            <InputUploadFile ref={refInput} onChange={onChange} />
          </div>
          <button
            onClick={handleClickInput}
            className={clsx("h-full w-full", { hidden: !image.trim() })}
          >
            <ImagePreview url={image} />
          </button>
        </div>
      </div>
    );
  }
);

const DescriptionInput = memo(
  ({
    value,
    name,
    onChange,
    onBlur,
  }: {
    value: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  }) => {
    return (
      <div className="flex-1">
        <TitleInput
          forId={"admin._about._general._form._des"}
          name="admin._about._general._form._des"
        />
        <InputMultiLine
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          id="admin._about._general._form._des"
          placeholder="admin._about._general._form._des_placeholder"
        />
      </div>
    );
  }
);

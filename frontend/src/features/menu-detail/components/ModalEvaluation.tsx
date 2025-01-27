import { ICStar } from "@assets/icons/ICStar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { useModalContext } from "@contexts/hooks/modal";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { TextError } from "@features/dashboard/components/TextError";
import { commentService } from "@services/comment";
import type { ICommentChild } from "@typeRules/comment";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type Props = {
  idProduct: number;
};

export const ModalEvaluation = ({ idProduct }: Props) => {
  const { t } = useTranslation();
  const [stars, setStars] = useState(5);
  const { hideModal } = useModalContext();
  const { showError, showSuccess } = useShowMessage();

  const formik = useFormik<ICommentChild>({
    initialValues: {
      id: null,
      fullname: "",
      email: "",
      content: "",
      idProduct,
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .trim()
        .required("message.form.required")
        .max(50, "menu.modal.name_max"),
      email: Yup.string()
        .trim()
        .required("message.form.required")
        .email("message.form.email")
        .max(256, "menu.modal.email_max"),
      content: Yup.string()
        .trim()
        .required("message.form.required")
        .max(2000, "menu.modal.content_max"),
    }),
    onSubmit: (values) => {
      commentService
        .postUser({
          id: null,
          ...values,
          rate: stars,
        })
        .then(() => {
          showSuccess("menu.message_success");
        })
        .catch((error) => {
          if (error?.response?.data?.status !== 500) {
            showError("menu.message_error");
          }
          {
            showError("message.actions.error.delete_banner");
          }
        });
    },
  });

  const pushStar = useCallback((number: number) => {
    setStars(number);
  }, []);

  const popStar = useCallback(
    (number: number) => {
      if (stars > 1 && number !== 5) {
        setStars(5 - (5 - number));
      }
    },
    [stars]
  );

  const renderStar = useCallback(() => {
    let xhtml: any[] = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = stars !== 0 && stars >= i;
      xhtml.push(
        <button
          type="button"
          key={i}
          onClick={() => (isActive ? popStar(i) : pushStar(i))}
        >
          <ICStar
            width={windownSizeWidth > withResponsive._1024 ? 40 : 27}
            height={windownSizeWidth > withResponsive._1024 ? 38 : 25}
            color={isActive ? Colors.bg_F4A118 : Colors.bg_CBCBCB}
          />
        </button>
      );
    }

    return xhtml;
  }, [stars, pushStar, popStar]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[100%] lg:mx-0 lg:w-[872px]  bg-white py-[32px] lg:py-[64px] px-[16px] lg:px-[24px]"
    >
      <h2 className="text-center text-_16 lg:text-_24 font-bold text-GreyPrimary">
        {t("menu.modal.title")}
      </h2>
      <div className="flex justify-center items-center gap-x-[16px] mt-[27px] lg:mt-[37px]">
        {renderStar()}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] mt-[45px]">
        <div>
          <TitleInput forId="menu.modal.name" name="menu.modal.name" />
          <Input
            name="fullname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="menu.modal.name"
            placeholder="menu.modal.name_placeholder"
            maxLength={50}
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <TextError message={formik.errors.fullname} />
          )}
        </div>
        <div>
          <TitleInput forId="menu.modal.email" name="menu.modal.email" />
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="menu.modal.email"
            placeholder="menu.modal.email_placeholder"
            maxLength={256}
          />
          {formik.errors.email && formik.touched.email && (
            <TextError message={formik.errors.email} />
          )}
        </div>
        <div className=" lg:col-span-2">
          <TitleInput forId="menu.modal.evaluate" name="menu.modal.evaluate" />
          <Textarea
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="menu.modal.evaluate"
            value={formik.values.content}
            placeholder="menu.modal.evaluate_placeholder"
            maxLength={20000}
          />
          {formik.errors.content && formik.touched.content && (
            <TextError message={formik.errors.content} />
          )}
        </div>
        <div className="flex lg:col-span-2 items-center gap-x-[24px] justify-center">
          <Button
            onClick={hideModal}
            type="button"
            color="empty"
            text="button.cancel"
            className="border border-primary max-w-[154px]"
            classNameParent="min-w-[154px]"
          />
          <Button
            color="primary"
            type="submit"
            text="button.evaluate"
            className="border border-primary max-w-[154px]"
            classNameParent="min-w-[154px]"
          />
        </div>
      </div>
    </form>
  );
};

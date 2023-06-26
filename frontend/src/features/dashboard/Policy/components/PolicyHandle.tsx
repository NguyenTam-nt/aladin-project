import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { Input } from "@features/dashboard/components/Input";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { TextError } from "@features/dashboard/components/TextError";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import { policyService } from "@services/policy";
import type { INews } from "@typeRules/index";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

export const PolicyHandle = () => {
  const params = useParams();
  const navigation = useNavigate();
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess } = useShowMessage();
  const [policy, setPolicy] = useState<INews>();
  const isAdd = useMemo(() => {
    return !params.id;
  }, []);

  useEffect(() => {
    if (!isAdd) {
      policyService.getPolicyById(Number(params.id)).then((data) => {
        setPolicy(data);
        formik.setFieldValue("title", data.title);
        formik.setFieldValue("description", data.description);
        formik.setFieldValue("content", data.content);
      });
    }
  }, [isAdd]);

  const formik = useFormik<INews>({
    initialValues: {
      title: "",
      content: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("message.form.required").max(255, "Họ và tên tối đa 255 ký tự."),
      content: Yup.string().required("message.form.required"),
      description: Yup.string().required("message.form.required").max(2000, "Mô tả tối đa 2000 ký tự."),
    }),
    onSubmit: (data) => {
      showLoading();
      if (isAdd) {
        policyService
          .postPolicy({ ...data })
          .then(() => {
            showSuccess("adminPolicy.message_post");
            // goBack();
            formik.resetForm()
          })
          .catch(() => {
            showError("message.actions.error.delete_banner");
          });
      } else {
        policyService
          .updatePolicy({ ...policy, ...data })
          .then(() => {
            showSuccess("adminPolicy.message_update");
            // goBack();
          })
          .catch(() => {
            showError("message.actions.error.delete_banner");
          });
      }
    },
  });

  const handleChangeEditor = (data: string) => {
    formik.setFieldValue("content", data);
  };

  const goBack = () => {
    navigation(-1);
  };

  return (
    <div>
      <TitleTopic
        name={
          isAdd ? "adminPolicy.form.title_add" : "adminPolicy.form.title_edit"
        }
        isRequired={false}
      />
      <div className="grid grid-cols-1 gap-y-[24px]">
        <div>
          <TitleInput forId="title" name="adminPolicy.form.name" />
          <Input
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="adminPolicy.form.name_placeholder"
          />
          {formik.errors.title && formik.touched.title && (
            <TextError message={formik.errors.title} />
          )}
        </div>
        <div>
          <TitleInput forId="description" name="adminPolicy.form.des" />
          <Input
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="adminPolicy.form.des_placeholder"
          />
          {formik.errors.description && formik.touched.description && (
            <TextError message={formik.errors.description} />
          )}
        </div>
        <div>
          <TitleInput name="adminPolicy.form.content" />
          <Editor
            content={formik.values.content}
            onChange={handleChangeEditor}
          />
          {formik.errors.content && (
            <TextError message={formik.errors.content} />
          )}
        </div>
        <div className="flex justify-end">
          <GroupButtonAdmin isAdd={isAdd} onCancel={goBack} onSubmit={formik.handleSubmit} />
        </div>
      </div>
    </div>
  );
};

import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { Input } from "@features/dashboard/components/Input";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

export const PolicyHandle = () => {
  const params = useParams();
  const isAdd = useMemo(() => {
    return !params.id;
  }, []);
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
          <TitleInput name="adminPolicy.form.name" />
          <Input placeholder="adminPolicy.form.name_placeholder" />
        </div>
        <div>
          <TitleInput name="adminPolicy.form.des" />
          <Input placeholder="adminPolicy.form.des_placeholder" />
        </div>
        <div>
          <TitleInput name="adminPolicy.form.content" />
          <Editor />
        </div>
        <div className="flex justify-end">
          <GroupButtonAdmin />
        </div>
      </div>
    </div>
  );
};

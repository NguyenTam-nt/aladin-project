import TitleInput from "@components/TitleInput";
import React from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

export const GroupInputContent = () => {
  return (
    <div className="grid grid-cols-1 gap-y-[16px]">
      <div>
        <TitleInput isRequired={false} name={"adminHome.form.title"} />
        <Input placeholder="adminHome.form.title_placeholder" maxLength={40} />
      </div>
      <div>
        <TitleInput isRequired={false} name={"adminHome.form.content"} />
        <Textarea placeholder="adminHome.form.content_placeholder" maxLength={350} />
      </div>
    </div>
  );
};

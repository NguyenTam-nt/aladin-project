import TitleInput from "@components/TitleInput";
import React, { ChangeEvent, memo, useEffect } from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { useFormik } from "formik";
import { useGetTopic } from "../home/components/useGetTopic";
import { HomeTopicType, ITopicHome } from "@typeRules/home";
import { GroupButtonAdmin } from "./GroupButtonAdmin";
import * as Yup from "yup"
import { homeService } from "@services/home";
import { useShowMessage } from "./DiglogMessage";
import { TextError } from "./TextError";

type Props = {
  title: string
  content: string
  onChange: (event:ChangeEvent<any>) => void
  onBlur: (event:ChangeEvent<any>) => void
  titleError?: string
  contentError?: string
}

export const GroupInputContent = memo(({title, content, contentError, onChange, onBlur ,titleError}:Props) => {
 

  return (
    <>
      <div className="grid grid-cols-1 gap-y-[16px]">
        <div>
          <TitleInput isRequired={false} name={"adminHome.form.title"} />
          <Input value={title} name="title" onChange={onChange} onBlur={onBlur} placeholder="adminHome.form.title_placeholder" maxLength={40} />
          {<TextError message={titleError || ""} option={{max: 40}} />}
        </div>
        <div>
          <TitleInput isRequired={false} name={"adminHome.form.content"} />
          <Textarea name="content" value={content} onChange={onChange} onBlur={onBlur} placeholder="adminHome.form.content_placeholder" maxLength={350} />
        <TextError message={contentError || ""} option={{max: 350}} />
        </div>
      </div>
    </>
  );
})

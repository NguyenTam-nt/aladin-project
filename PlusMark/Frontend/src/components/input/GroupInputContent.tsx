import React, { ChangeEvent, memo, useEffect } from "react";
import TitleInput from "./TitleInput";
import { InputComponent } from "./InputComponent";
import { TextError } from "./TextError";
import { TextareaComponent } from "./TextareaComponent";


type Props = {
    title: string
    content: string
    onChange: (event: ChangeEvent<any>) => void
    onBlur: (event: ChangeEvent<any>) => void
    titleError?: string
    contentError?: string,
    nameTitle?: string,
    nameContent?: string
}

export const GroupInputContent = memo(({ title, content, contentError, onChange, onBlur, titleError, nameTitle, nameContent }: Props) => {

    console.log({ title });

    return (
        <>
            <div className="grid grid-cols-1 gap-y-[16px]">
                <div>
                    <TitleInput isRequired={true} name={"adminHome.form.title"} />
                    <InputComponent value={title} name={nameTitle} onChange={onChange} onBlur={onBlur} placeholder="adminHome.form.title_placeholder"  />
                    <TextError message={titleError ?? ""} option={{ max: 40 }} />
                </div>

                <div>
                    <TitleInput isRequired={true} name={"adminHome.form.content"} />
                    <TextareaComponent name={nameContent} value={content} onChange={onChange} onBlur={onBlur} placeholder="adminHome.form.content_placeholder"/>
                    <TextError message={contentError ?? ""} option={{ max: 350 }} />
                </div>
            </div>
        </>
    );
})

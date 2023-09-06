import React, { ChangeEvent, memo, useEffect } from "react";
import TitleInput from "./TitleInput";
import { InputComponent } from "./InputComponent";
import { TextError } from "./TextError";


type Props = {
    title: string
    valueInput: string
    onChange: (event: ChangeEvent<any>) => void
    onBlur: (event: ChangeEvent<any>) => void
    titleError?: string
    nameInput?: string,
    placeholder: string,
    rounded?: boolean
}

export const GroupInput = memo(({ valueInput, title, onChange, onBlur, titleError, nameInput, placeholder, rounded }: Props) => {

    return (
        <>
            <div className="grid grid-cols-1 gap-y-[16px]">
                <div>
                    <TitleInput isRequired={true} name={title} />
                    <InputComponent value={valueInput} name={nameInput} onChange={onChange} onBlur={onBlur} placeholder={placeholder} maxLength={40} className="" rounded={rounded} />
                    <TextError message={titleError ?? ""} option={{ max: 40 }} />
                </div>
            </div>
        </>
    );
})

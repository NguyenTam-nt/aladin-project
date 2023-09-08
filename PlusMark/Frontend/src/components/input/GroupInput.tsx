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
    rounded?: boolean,
    optionInut?: { [key: string]: any };
    maxLength?: number
}

export const GroupInput = memo(({ valueInput, title, onChange, onBlur, titleError, nameInput, placeholder, rounded, optionInut, maxLength }: Props) => {

    return (
        <>
            <div className="grid grid-cols-1 gap-y-[16px]">
                <div>
                    <TitleInput isRequired={true} name={title} />
                    <InputComponent value={valueInput} name={nameInput} onChange={onChange} onBlur={onBlur} placeholder={placeholder} maxLength={maxLength ?? 100} className="" rounded={rounded} />
                    <TextError message={titleError ?? ""} option={optionInut ?? { max: 100 }} />
                </div>
            </div>
        </>
    );
})

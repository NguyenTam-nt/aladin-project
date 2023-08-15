import React, { ChangeEvent, useEffect, useState } from "react";
interface Props {
  type?: string;
  isVND?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  value: string | number;
  name?: string;
  maxNumber?: number;
  className?: string;
  classWidth?: string;
  placehoderText?: string;
  onChangeInput?: (value: any) => void;
  onBlurInput?: (value: any) => void;
}
function InputTextElement(props: Props) {
  const {
    isReadOnly = false,
    isRequired = false,
    isVND = false,
    value,
    name,
    type = "text",
    className = "",
    classWidth = "w-full",
    placehoderText,
    maxNumber,
    onChangeInput,
    onBlurInput,
  } = props;

  const [inputValue, setInputValue] = useState<string | number>(value);
  const [valid, setValid] = useState<boolean>(false);
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value;
    const name = event.target.name;
    const type = event.target.type;
    if (type === "number") {
      value = Number(value);
    }
    setInputValue(value);
    setValid(false);
    if (onChangeInput) {
      onChangeInput({
        name,
        value,
      });
    }
  };
  const handleBlur = () => {
    if (inputValue === "" && isRequired) {
      setValid(true);
      return;
    }
    if (onBlurInput && inputValue !== "") {
      onBlurInput(inputValue);
      setInputValue("");
      setValid(false);
    }
  };

  useEffect(() => {
    setInputValue(value);
    if (value !== "") {
      setValid(false);
    }
  }, [value]);

  return (
    <>
      <div className={classWidth + " " + (maxNumber ? "relative" : undefined)}>
        <input
          maxLength={maxNumber && maxNumber}
          type={type}
          readOnly={isReadOnly}
          name={name}
          value={inputValue}
          className={
            "textInput w-full " +
            className +
            " " +
            (maxNumber && "pr-[80px]") +
            " " +
            (valid ? "border-main" : "")
          }
          placeholder={placehoderText && placehoderText}
          onChange={(event) => {
            handleChangeInput(event);
          }}
          onBlur={() => {
            handleBlur();
          }}
        />
        {maxNumber && (
          <div className="w-[70px] h-full absolute top-0 right-0 border-l border-l-borderGray bg-transparent flex items-center justify-center text-gray-300">
            {isVND ? "đ" : inputValue.toString().length + "/" + maxNumber}
          </div>
        )}
      </div>
      {isRequired && valid && (
        <p className="w-auto text-left text-main text-xs mt-1">
          Không được để trống
        </p>
      )}
    </>
  );
}

export default InputTextElement;

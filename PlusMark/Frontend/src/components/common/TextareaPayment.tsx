import { some } from '@utility/helper'

function TextareaPayment({
    name, value, setValue, onBlur, label, required, className, background, error, contentLength, maxLength
  }: some) {

  return (
    <div className={`flex flex-col mb-10 bg-gray-100 px-4 py-2 pt-3 rounded-md border-2 border-gray-200 ${className} ${background}`}>
      <label className="text-normal1 text-background-100 mb-1 absolute">
        {value == '' ? <>{label} {required && <span className="text-[#F31A1A]">*</span>}</>  : ''}
      </label>
      <textarea maxLength={maxLength}
        className={`w-full h-[150px] outline-none text-text placeholder:text-background-100  bg-gray-100 ${background}`}
        value={value}
        onChange={setValue}
        onBlur={onBlur}
        name={name}
      ></textarea>
      <div className="flex justify-between items-center">
        <small className="text-[14px] text-[#F31A1A]">
          {error}
        </small>
        <span className="text-background-100 ">{contentLength}/{maxLength}</span>
      </div>
    </div>
  )
}

export default TextareaPayment
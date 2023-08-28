import { VietNamFlag } from '@assets/icons'
import { some } from '@utility/helper'

function InputPayment({
    name, value, setValue, onBlur, label, required, className, background, error, autoFocus, phone
  }: some) {

  return (
    <label className={`w-full h-full rounded-lg px-3 py-2 flex flex-col relative  ${className} ${background}`}>
        <p className="text-normal1  text-gray-300  absolute">
            {value == '' ? <>{label} {required}</>  : ''}
        </p>
        <input autoFocus={autoFocus} name={name} className={`h-full w-full text-text text-normal1 ${background}`} 
          value={value} onChange={setValue} onBlur={onBlur} />
        {error && <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
          {error}
        </small>}
    </label>
  )
}

export default InputPayment
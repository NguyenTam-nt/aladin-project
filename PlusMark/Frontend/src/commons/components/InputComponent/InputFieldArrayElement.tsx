import { TrashCanIcon } from "@assets/icons";
import { FieldArray, FieldArrayRenderProps } from "formik";
import { Fragment } from "react";

interface Props {
  values: any,
  onChange: (value: any) => void
  name: string,
  placeholder: any
  errors?: any
  touched?: any
}

interface Address {
  address: string,
  linkGgMap: string
}
export default function InputFieldArrayElement(props: Props) {
  const { values, onChange, name, placeholder, errors, touched } = props

  const handleOnBlur = (arrayHelpers: FieldArrayRenderProps, item: string, values: any) => {
    values = values.filter((item: string) => !item.length)
    if (item.length && values.length < 1) {
      arrayHelpers.push('');
    }
  }

  const handleOnBlurObj = (arrayHelpers: FieldArrayRenderProps, item: Address, values: any) => {
    const newValues = values.filter((value: Address) => {
      const valArr = Object.values(value).filter(i => !i.length)
      if (Object.keys(item).length != valArr.length) {
        return valArr
      }
    })
    if (values.length == newValues.length) {
      arrayHelpers.push({
        address: '',
        linkGgMap: ''
      })
    }
  }

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <>
          {values[name].map((value: Address, index: number) => (
            <Fragment key={index}>
              {typeof value == 'object' ? (
                <div className="flex mt-[10px] gap-3">
                  <div className="flex flex-col gap-[10px] w-4/5">
                    {Object.keys(value).map((item, key) => (
                      <Fragment key={key}>
                        <input
                          name={`${name}[${index}].${item}`}
                          className="py-3 px-5 mr-3 textInput"
                          placeholder={placeholder[item]}
                          value={values[name][index][item]}
                          onChange={onChange}
                          onBlur={() => handleOnBlurObj(arrayHelpers, value, values[name])}
                        />
                        {errors?.[index]?.[item] && touched?.[index]?.[item] && <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                          {errors?.[index]?.[item]}
                        </small>}
                      </Fragment>
                    ))}
                  </div>
                  {index < values[name].length - 1 && <div
                    className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <TrashCanIcon fill="#8E8E8E" width={14} />
                  </div>}
                </div>
              ) : (
                <div className="flex items-center my-10px">
                  <input
                    name={`${name}[${index}]`}
                    className="py-3 px-5 w-4/5 mr-3 textInput"
                    placeholder={placeholder}
                    value={values[name][index]}
                    onChange={onChange}
                    onBlur={() => handleOnBlur(arrayHelpers, value, values[name])}
                  />
                  {index < values[name].length - 1 && <div
                    className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <TrashCanIcon fill="#8E8E8E" width={14} />
                  </div>}
                </div>
              )}
            </Fragment>
          ))}
        </>
      )}
    />
  )
}
interface Props {
  icon: JSX.Element,
  name: string
  placeholder: string,
  values: any,
  onChange: (value: any) => void
}
export default function InputSocial(props: Props) {
  const { icon, name, placeholder, values, onChange } = props
  return (
    <div className="flex items-center gap-[27px]">
      {icon}
      <input
        name={name}
        value={values[name]}
        placeholder={placeholder}
        onChange={onChange}
        className="py-3 px-5 w-2/3 textInput"
      />
    </div>
  );
}
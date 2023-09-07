import { TichCheckbox } from "@assets/icons";
interface Props {
  lable?: string;
  name: string;
  sizeBox?: string;
  isCheck?: boolean;
  onHandleChange?: () => void;
}
function InputChecboxElement(props: Props) {
  const {
    lable,
    name,
    isCheck = false,
    sizeBox = "w-10 h-10 rounded-md",
    onHandleChange,
  } = props;
  return (
    <div>
      <label
        // htmlFor={lable + name}
        className="text-smal checkbox-Active flex items-center cursor-pointer"
      >
        <input
          // id={lable + name}
          name={name}
          checked={isCheck}
          onChange={(event) => onHandleChange && onHandleChange()}
          className="hidden"
          type="checkbox"
        />
        <div
          className={
            "flex items-center justify-center border border-gray-300 bg-white mr-[18px] " +
            sizeBox
          }
        >
          <TichCheckbox />
        </div>
        {lable}
      </label>
    </div>
  );
}

export default InputChecboxElement;

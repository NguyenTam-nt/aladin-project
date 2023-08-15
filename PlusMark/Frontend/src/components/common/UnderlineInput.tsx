import { some } from "@utility/helper";
import { InputHTMLAttributes } from "react";

const UnderlineInput = ({error, ...props}: some) => {
  return (
    <>
      <input
        {...props}
        className={`h-8 w-full border-b py-2 text-wap-regular1 ${props.className}`}
        style={{
          borderColor: "white",
          color: "white",
          backgroundColor: "transparent",
          outline: "none",
        }}
      />
      <span className={` text-wap-regular1 block text-white italic -mt-1`}>{error}</span>
    </>
  );
};

export default UnderlineInput;

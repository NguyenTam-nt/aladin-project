import { ButtonHTMLAttributes, MutableRefObject, useRef } from "react";

const ShadowButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div
      className="w-fit rounded-md mt-3 ml-1"
      style={{
        borderWidth: "1px",
        borderColor: props.style?.backgroundColor,
      }}
    >
      <button
        {...props}
        style={{ ...props.style, transform: "translate(-4px, -4px)" }}
        className={`${props.className} btn`}
      />
    </div>
  );
};

export default ShadowButton;

import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className="w-full h-10 border rounded px-3" />;
};

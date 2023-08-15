import { SelectHTMLAttributes } from "react";

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => {
  return <select {...props} className="w-full h-10 border rounded px-3" />;
};

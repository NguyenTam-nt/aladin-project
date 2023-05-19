import clsx from "clsx";
import React from "react"

interface  ITagNews {
  color ?:string  ,
  title ?: string
}
const TagNews = (props : ITagNews) => {

    const { color ,  title  } = props
  return (
    <p
      className={clsx(
        "text-_12 text-center font-bold text-text_white leading-[20px] px-[16px] inline-block ",
        color || "bg-green-600"
      )}
    >
     {title || "Tag green"}
    </p>
  );
};
export default TagNews
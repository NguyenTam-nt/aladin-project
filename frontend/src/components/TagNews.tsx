import { typeColorTag } from "@features/news/components/NewsBanner";
import clsx from "clsx";
import React, { memo } from "react"

interface  ITagNews {
  color ?:string  ,
  title ?: string
}
const TagNews = memo((props : ITagNews) => {

    const { color ,  title  } = props
  return (
    <p
      className={clsx(
        `text-_12 text-center font-bold text-text_white leading-[20px] px-[16px] inline-block ${
          color || typeColorTag[Math.floor(Math.random() *typeColorTag.length)]
        } `
      )}
    >
      {title || "Tag green"}
    </p>
  );
})
export default TagNews
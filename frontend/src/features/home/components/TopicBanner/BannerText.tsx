import { ICArowRight } from "@assets/icons";
import { Button } from "@components/Button";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  title?: string
  content?: string
  link?: string
}

export const BannerText = ({title, content, link}:Props) => {
  const { t } = useTranslation();

  const handleNavigate = () => {
    const aTag = document.createElement("a")
      aTag.href = link + ""
      aTag.target = "blank"
      aTag.click()
      aTag.remove()
  }

  return (
    <div className=" absolute left-0 top-[116px] lg:top-[50%] w-full lg:translate-y-[-50%] z-[4] flex justify-center">
      <div className="w-rp text-text_white">
        <h2 className="title-64 animate__animated animate__fadeIn"
          style={{
            ["--animate-count" as string]: 1
          }}
        >{title}</h2>
        <p className="text-_14 lg:text-_24 animate__animated animate__slideInRight">{content}</p>
        <Button
          className="min-w-[127px] lg:min-w-[159px] h-[48px] lg:h-[56px] mt-[24px] animate__animated animate__fadeInUp"
          color="primary"
          onClick={handleNavigate}
          image={
            <span className="ml-2">
              <ICArowRight />
            </span>
          }
          text={"button.see_more"}
        />
      </div>
    </div>
  );
};

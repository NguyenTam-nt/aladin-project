import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import React, { memo } from "react";
import { TopicHistoryItem } from "./TopicHistoryItem";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import { ICPlus } from "@assets/icons/ICPlus";

const data = [
  {
    year: "2015",
    des: "lorem ipsum dolor sit amet lorem",
    image:
      "https://image.placeholder.co/insecure/w:750/aHR0cHM6Ly9jZG4uc3BhY2VyLnByb3BlcnRpZXMvN2JiNzkzZjQtZjczMS00MTk0LThlNjItZDdiNmE0ZWM1Mzk4",
  },
  {
    year: "2016",
    des: "lorem ipsum dolor sit amet lorem",
    image:
      "https://image.placeholder.co/insecure/w:750/aHR0cHM6Ly9jZG4uc3BhY2VyLnByb3BlcnRpZXMvN2JiNzkzZjQtZjczMS00MTk0LThlNjItZDdiNmE0ZWM1Mzk4",
  },
  {
    year: "2017",
    des: "lorem ipsum dolor sit amet lorem",
    image:
      "https://image.placeholder.co/insecure/w:750/aHR0cHM6Ly9jZG4uc3BhY2VyLnByb3BlcnRpZXMvN2JiNzkzZjQtZjczMS00MTk0LThlNjItZDdiNmE0ZWM1Mzk4",
  },
  {
    year: "2019",
    des: "lorem ipsum dolor sit amet lorem",
    image:
      "https://image.placeholder.co/insecure/w:750/aHR0cHM6Ly9jZG4uc3BhY2VyLnByb3BlcnRpZXMvN2JiNzkzZjQtZjczMS00MTk0LThlNjItZDdiNmE0ZWM1Mzk4",
  },
];

export const TopicHistory = () => {
  // const handleDelete = (index: number) => {};
  // const handleAdd = () => {};
  const handleEdit = () => {};

  return (
    <>
      <div className="flex items-center">
        <SubHeaderTopic title="admin._about._general._topic._history" />
        <Button
          // onClick={handleShowModal}
          imageLeft={
            <span className="mr-[12px]">
              <ICPlus color={Colors.secondary} />
            </span>
          }
          className="max-w-[170px] border border-secondary"
          text="button._create_post"
          color="empty"
        />
      </div>
      <div className="grid grid-cols-1 gap-y-[24px]">
        <TopicHistoryItem onSubmit={handleEdit} type="ADD" />
        <TopicHistoryList data={data} />
      </div>
    </>
  );
};

type PropsTopicHistoryList = {
  data: {
    year: string;
    des: string;
    image: string;
  }[];
};

const TopicHistoryList = memo(({ data }: PropsTopicHistoryList) => {
  return (
    <>
      {data.map((item, index) => {
        return <TopicHistoryItem data={item} key={index} />;
      })}
    </>
  );
});

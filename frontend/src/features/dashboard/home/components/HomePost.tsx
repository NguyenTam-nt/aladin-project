import React from "react";
import { TitleTopic } from "./TitleTopic";
import { useTranslation } from "react-i18next";
import { TopicByType } from "./TopicByType";
import { HomeTopicType, ITopicHome, ITopicType } from "@typeRules/home";
import { useGetTopic } from "./useGetTopic";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { homeService } from "@services/home";

export const HomePost = () => {
  const { listBanner, setListBanner } = useGetTopic(HomeTopicType.post);
  const { t } = useTranslation();
  const { showLoading } = useHandleLoading();

  const { showError, showSuccess, showWarning } = useShowMessage();

  const handleSubmit = (data: ITopicHome) => {
    showLoading();
    const newList = listBanner?.listBanner ?? [];
    const index = newList.findIndex((item) => item?.id === data?.id);

    index >= 0 ? newList.splice(index, 1, data) : newList.unshift(data);

    homeService
      .updateHomeTopic({
        type: HomeTopicType.post,
        listBanner: [...newList],
      })
      .then((data: ITopicType) => {
        setListBanner(data);
        showSuccess("message.actions.success.post");
      })
      .catch(() => {
        showError("message.actions.error.post");
      });
  };

  const handleDelete = (id: number) => {
    if (listBanner?.listBanner && listBanner?.listBanner.length > 1) {
      homeService
        .deleteHomeTopic(id)
        .then(() => {
          const newList = listBanner?.listBanner ?? [];
          const index = newList.findIndex((item) => item?.id === id);
          if (index >= 0) {
            newList.splice(index, 1);
            setListBanner({
              type: HomeTopicType.post,
              listBanner: [...newList],
            });
            showSuccess("message.actions.success.delete");
          }
        })
        .catch(() => {
          showError("message.actions.error.delete");
        });
    } else {
      showWarning("message.actions.warning.min_post");
    }
  };

  return (
    <div className="mt-[40px]">
      <div className="flex items-baseline">
        <TitleTopic name="adminHome.post.title" />
        <span className="text-_14 text-text_A1A0A3 italic ml-2">
          {t("adminHome.post.maxPost")}
        </span>
      </div>
      {listBanner?.listBanner.map((data, index) => {
        return (
          <TopicByType
            onDelete={handleDelete}
            onSubmit={handleSubmit}
            data={data}
            key={data.id}
            type={HomeTopicType.post}
          />
        );
      })}
      {listBanner?.listBanner.length &&
      listBanner?.listBanner.length >= 3 ? null : (
        <TopicByType onSubmit={handleSubmit} type={HomeTopicType.post} />
      )}
    </div>
  );
};

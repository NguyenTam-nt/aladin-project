import React, { memo } from "react";
import { TitleTopic } from "../TitleTopic";
import { useTranslation } from "react-i18next";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import {
  prefixRootRoute,
  windownSizeWidth,
  withResponsive,
} from "@constants/index";
import { Link } from "react-router-dom";
import { paths } from "@constants/routerPublic";
import type { ICategoryItem } from "@typeRules/category";

type Props = {
  title: string;
  listItem: ICategoryItem[];
  idParent: number
};

export const GroupTile = ({ title, listItem = [], idParent }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center pb-[12px] md:pb-[16px] border-b border-text_A1A0A3">
      <TitleTopic title={title} />
      {windownSizeWidth > withResponsive._768 ? (
        <div className="flex text-_16 mt-[16px] md:mt-0 font-semibold lg:text-_20 lg:font-bold gap-x-[32px] uppercase text-text_secondary">
          {listItem.map((item, index) => {
            return <Link className="uppercase font-bold" to={`${paths.memu.prefix}?category=${idParent}-${item?.id}`} key={index}>{item.name}</Link>;
          })}
          <Link
            to={`${paths.memu.prefix}?category=${idParent}`}
            className="text-primary uppercase"
          >
            {t("button.see_all")}
          </Link>
        </div>
      ) : (
        <GroupLinkMobile idParent={idParent} listItem={listItem} />
      )}
    </div>
  );
};

const GroupLinkMobile = memo(({ listItem, idParent }: { listItem: ICategoryItem[], idParent: number }) => {
  const { t } = useTranslation();
  return (
    <SwiperComponent
      freeMode={true}
      // slidesPerView={4}
      spaceBetween={12}
      style={{
        width: windownSizeWidth,
        marginTop: 16,
      }}
    >
      {listItem.map((item, index) => {
        return (
          <SwiperSlide>
           <Link className="uppercase font-semibold text-_16" to={`${paths.memu.prefix}?category=${idParent}-${item?.id}`} key={index}>{item.name}</Link>
          </SwiperSlide>
        );
      })}
      <SwiperSlide>
        <Link to={`${paths.memu.prefix}`} className="text-primary uppercase">
          {t("button.see_all")}
        </Link>
      </SwiperSlide>
    </SwiperComponent>
  );
});

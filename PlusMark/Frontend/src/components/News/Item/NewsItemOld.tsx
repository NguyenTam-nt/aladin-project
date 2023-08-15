import { Link } from "react-router-dom";
import clsx from "clsx";
import { News } from "@pages/Newspage/Banner";
// import { News } from "../../types";
// import { useAppSelector } from "../../hooks/hook";

type Props = {
  type?: boolean;
  news: News;
};

export default function NewsItemOld({ type, news }: Props) {
  // const params = useParams();

//   const translate = useAppSelector((state) => state.translateSlice);

  return (
    <Link
      to={`/news/${news.id}`}
      className={clsx(
        "flex pb-[12px] 2xl:pb-[38px] flex-row border-b-[1px] border-solid mb-[38px] ",
        { "border-white-color": type, "border-border_primary": !type }
      )}
    >
      <div className="w-full flex justify-center lg:block min-w-[150px] max-w-[150px] h-auto  sm:h-auto sm:min-w-[303px] sm:max-w-[303px] lg:min-w-[50%] lg:max-w-[50%] xl:min-w-[303px] xl:max-w-[303px] max-h-[100%] rounded-[10px] overflow-hidden mr-[24px]">
        <img
          src={news.avatarUrl}
          alt="news1"
          className="w-full h-full max-h-[184px] rounded-[10px] object-cover"
        />
      </div>
      <div className="flex flex-col justify-start lssm:mt-3 mt-0">
        {/* <p className=" lssm:mb-[4px] lssm:mt-0  lssm:text-[10px] sm:my-[12px] 2xl:my-[15px]  2xl:text-px15 md:text-px14 sc>768:text-px15">{getDate(news.createdDate+"")} - Anfico</p> */}

        <h3
          className={clsx(
            "lssm:text-px16 sm:text-px18 mb-1 line-clamp-2 xl:text-px20  sc>768:text-px18 font-bold xl:mb-[18px] 2xl:mb-[23px]",
            { "text-main": !type, "text-white": type }
          )}
        >
          {/* {translate.isEnglish
              ? news.titleVi
            : news.titleEn
           } */}
           {news.titleVi}
        </h3>
        <p className={clsx("lssm:text-px14 line-clamp-2 2xl:text-px16 ", { "text-[#8E8E8E]": !type, "text-white": type })}>
          {/* {translate.isEnglish
              ? news.descriptionVi
            : news.descriptionEn
          } */}
          {news.descriptionVi}
        </p>
      </div>
    </Link>
  );
}

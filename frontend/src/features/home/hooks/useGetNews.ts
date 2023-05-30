import { newsService } from "@services/newsService";
import type { INews } from "@typeRules/news";
import { useEffect, useState } from "react";

export const useGetNews = (NoticeId = '') => {
    const [notices, setNotices] = useState<INews[]>([]);

    useEffect(() => {
      newsService
        .gewNewCategory({ page: 0, size: 24, sort: "id,desc" }, "", NoticeId + "")
        .then((data) => {
          setNotices(data.data);
        });
    }, [NoticeId]);

    return {
        news: notices
    }
}
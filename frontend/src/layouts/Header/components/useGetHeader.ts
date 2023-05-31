import { paths } from "@constants/router";
import { headerService } from "@services/header";
import { newsService } from "@services/newsService";
import type { IHeader } from "@typeRules/footer";
import { useEffect, useState } from "react";

export const useGetHeader = () => {
  const [headers, setHeaders] = useState<IHeader[]>(
   () => {
    try {
      return  JSON.parse(localStorage.getItem("header") ?? "") ?? []
    } catch (error) {
        return []
    }
   }
  );

  useEffect(() => {
    headerService.getByIndex().then(async (data) => {
      const newData = data.filter(item => item.status)
      const index = newData.findIndex((item) => item.link === paths.news.prefix);

      if (index >= 0) {
        const categories = await newsService.getParent({
          page: 0,
          size: 12,
          sort: "id,desc",
        });

        newData[index].items = categories.data.map((item) => {
          return {
            name: item.name,
            nameKo: item.nameKo,
            link: item.id + "",
            status: item.status
          };
        });
      }
      localStorage.setItem('header', JSON.stringify(newData))
      setHeaders([...newData]);
    });
  }, []);

  return {headers}
};

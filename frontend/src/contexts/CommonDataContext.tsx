import { ReactNode, createContext, useEffect, useState } from "react";
import type { IFooter, IFooterInfo, IHeader } from "@typeRules/footer";
import { headerService } from "@services/header";
import { footerService } from "@services/footer";
import { IRouter, paths, rootRouter } from "@constants/router";
import { newsService } from "@services/newsService";

interface AuthState {
  headers: IHeader[];
  footers: IFooter[];
  links: IFooterInfo[];
  loading: boolean;
}

export const CommonDataContext = createContext<AuthState>({
  headers: [],
  footers: [],
  links: [],
  loading: false,
});

type Props = {
  children: ReactNode;
};

export default function CommonDataProvide({ children }: Props) {
  const [loading, setLoadding] = useState(false);
  const [headers, setHeaders] = useState<IHeader[]>([]);
  const [footers, setFooters] = useState<IFooter[]>([]);
  const [links, setFootersInfo] = useState<IFooterInfo[]>([]);

  useEffect(() => {
    // (async() => {
    setLoadding(true);
    headerService
      .getByIndex()
      .then(async (data) => {
        const newData: IHeader[] = data.map((item) => {
          return {
            ...item,
            element: rootRouter.find((_item) => _item.path === item.link)
              ?.element,
            path: item.link,
            items: item.items?.map((child) => {
              return {
                ...child,
                path: child.link,
                element: rootRouter
                  .find((_item) => _item.path === item.link)
                  ?.subNavs?.find((i) => i.path === child.link)?.element,
              };
            }),
          };
        });

        const index = newData.findIndex(
          (item) => item.link === paths.news.prefix
        );

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
              path: item.id + "",
            };
          });
        }

        setHeaders([...newData]);
      })
      .finally(() => {
        setLoadding(false);
      });

    footerService.get().then((data) => {
      setFooters(data);
    });

    footerService.getFooterInfo().then((data) => {
      setFootersInfo(data.data);
    });

    // })()
  }, []);

  return (
    <CommonDataContext.Provider
      value={{
        headers,
        footers,
        links,
        loading,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  );
}

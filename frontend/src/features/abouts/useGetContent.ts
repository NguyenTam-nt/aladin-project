import { contentService } from "@services/content";
import type { ContentType, IContent } from "@typeRules/content";
import { useEffect, useState } from "react";

export const useGetContent = (type: ContentType) => {
  const [data, setData] = useState<IContent[]>([]);

  useEffect(() => {
    contentService.getByType(type).then((data) => {
      setData(data.data);
    });
  }, [type]);

  return {
    data,
  };
};

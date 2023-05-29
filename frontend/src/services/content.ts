import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { IContent } from "@typeRules/content";

const api = getApi("content-sessions");

export const contentService = {
  get: () => {},
  post: (data: IContent): Promise<IContent> => {
    return HttpService.axiosClient.post(api, data);
  },
  put: (data: IContent): Promise<IContent> => {
    return HttpService.axiosClient.post(`${api}/${data.id}`, data);
  },
  delete: (id: number): Promise<void> => {
    return HttpService.axiosClient.delete(`${api}/${id}`);
  },
};

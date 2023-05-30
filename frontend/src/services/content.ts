import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { ContentType, IContent } from "@typeRules/content";
import type { IResponseData } from "@typeRules/responsive";

const api = getApi("content-sessions");

export const contentService = {
  getByType: (type:ContentType):Promise<IResponseData<IContent>> => {

      return HttpService.axiosClient.get(`${api}/category`, {params: {category: type, id: "id,desc"}})
  },
  post: (data: IContent): Promise<IContent> => {
    return HttpService.axiosClient.post(api, data);
  },
  put: (data: IContent): Promise<IContent> => {
    return HttpService.axiosClient.put(`${api}/${data.id}`, data);
  },
  delete: (id: number): Promise<void> => {
    return HttpService.axiosClient.delete(`${api}/${id}`);
  },
};

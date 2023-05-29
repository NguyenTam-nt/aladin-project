import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { IPost, PostType } from "@typeRules/post";
import type { IResponseData } from "@typeRules/responsive";

const api = getApi("posts");

export const postService = {
  post: (data: IPost): Promise<IPost> => {
    return HttpService.axiosClient.post(api, data);
  },
  getByType: (type:PostType):Promise<IResponseData<IPost>> => {
    return HttpService.axiosClient.get(`${api}/type`, {params: {sort: "id,desc", type}});
  },
  delete: (id:number):Promise<IResponseData<void>> => {
    return HttpService.axiosClient.delete(`${api}/${id}`);
  },
  put: (data:IPost):Promise<IPost> => {
    return HttpService.axiosClient.put(`${api}/${data.id}`, data);
  }
};

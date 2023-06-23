import HttpService from "@configs/api";
import {
  getMicroService,
  getMicroServiceAdmin,
  microServices,
} from "./getMicroService";
import { apis } from "../constants/list-api";
import type { IParams, IResponseData } from "@typeRules/index";
import type { IComment, ICommentChild } from "@typeRules/comment";

const api = getMicroService(`${apis.comment}`, microServices.restaurant);
const apiAdmin = getMicroServiceAdmin(
  `${apis.comment}`,
  microServices.restaurant
);
export const commentService = {
  get: (params: IParams): Promise<IResponseData<IComment>> => {
    return HttpService.axiosClient.get(`${apiAdmin}`, {
      params: { ...params, page: Number(params.page) },
    });
  },
  getById: (id: number): Promise<IComment> => {
    return HttpService.axiosClient.get(`${api}/${id}`);
  },
  update: (data: ICommentChild): Promise<IComment> => {
    return HttpService.axiosClient.put(`${apiAdmin}/${data.id}`, data);
  },
  postUser: (data: IComment): Promise<IComment> => {
    return HttpService.axiosClient.post(api, data);
  },
  post: (data: IComment): Promise<IComment> => {
    return HttpService.axiosClient.post(apiAdmin, data);
  },
  delete: (id: number) => {
    return HttpService.axiosClient.delete(`${apiAdmin}/${id}`);
  },
  patch: (id: number): Promise<IComment> => {
    return HttpService.axiosClient.patch(`${api}/${id}`);
  }
};
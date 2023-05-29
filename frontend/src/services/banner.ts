import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { BannerType, IBanner } from "@typeRules/banner";
import type { IResponseData } from "@typeRules/responsive";

const apiBanner = getApi("banners");
export const bannerService = {
  getBanners: (): Promise<IResponseData<IBanner>> => {
    return HttpService.axiosClient.get(apiBanner);
  },
  getByType: (type: BannerType): Promise<IResponseData<IBanner>> => {
    return HttpService.axiosClient.get(`${apiBanner}/type`, {
      params: { type },
    });
  },
  putBanner: (banner: IBanner): Promise<IBanner> => {
    return HttpService.axiosClient.put(`${apiBanner}/${banner.id}`, banner);
  },
  delete: (id: number) => {
    return HttpService.axiosClient.delete(`${apiBanner}/${id}`);
  },
  post: (data: IBanner): Promise<IBanner> => {
    return HttpService.axiosClient.post(`${apiBanner}`, data);
  },
};

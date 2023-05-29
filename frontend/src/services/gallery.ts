import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { IVideo } from "@typeRules/gallery";
import type { IGallery, IGalleryPost } from "@typeRules/gallery";
import type { IParams } from "@typeRules/pagination";
import type { IResponseData } from "@typeRules/responsive";

const pathGalleryType = getApi("galleries/type?type=");
const pathGallery= getApi("galleries");
const pathGalleryDelete = getApi("galleries/allid?ids=");

export const galleryService = {
  getImage: (params?: IParams): Promise<IResponseData<IVideo>> => {
    return HttpService.axiosClient.get(pathGalleryType+"IMAGE", { params });
  },
  getVideo: (params?: IParams): Promise<IResponseData<IVideo>> => {
    return HttpService.axiosClient.get(pathGalleryType + "VIDEO", { params });
  },
  post: (data: IGalleryPost): Promise<IGalleryPost> => {
    return HttpService.axiosClient.post(pathGallery, data);
  },
  deleteVideo: (data: number): Promise<any> => {
    return HttpService.axiosClient.delete(pathGalleryDelete + data);
  },
};

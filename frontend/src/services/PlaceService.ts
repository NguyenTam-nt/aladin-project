import HttpService from "@configs/api";
import { getMicroService, microServices } from "./getMicroService";
import type { PlaceType } from "@typeRules/place";

const suffix = "infrastructures"

export type PlaceResponseType = {
  totalElement: number
  totalElementPage: number
  list: PlaceType[]
}

const PlaceService = {
  get: async (): Promise<PlaceResponseType> => {
    const url = getMicroService(suffix, microServices.restaurent)
    return HttpService.axiosClient.get(url);
  },
  getById: async (id: number) => {
    const url = getMicroService( suffix + "/" + id, microServices.restaurent)
    return HttpService.axiosClient.get(url);
  },  
  put : async (id: number, data: any) => {
    const url = getMicroService(suffix + "/" + id, microServices.restaurent)
    return HttpService.axiosClient.put(url, data);
  },
  post : async (data: any) => {
    const url = getMicroService(suffix, microServices.restaurent)
    return HttpService.axiosClient.post(url, data);
  },
  delete : async (id: number) => {
    const url = getMicroService(suffix, microServices.restaurent)
    return HttpService.axiosClient.delete(url + "/" + id);
  },
}


export default PlaceService;
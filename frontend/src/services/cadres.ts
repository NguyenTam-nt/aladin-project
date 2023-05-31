import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { ICadres, ICadresPost, ICategotiesCadres } from "@typeRules/cadres";
import type { IParams } from "@typeRules/pagination";
import type { IResponseData } from "@typeRules/responsive";

const pathCadres = getApi("cadres");
const pathCadresDelete = getApi("cadres/allid?ids=");
const pathCadresCategory = getApi("cadres-categories");

export const cadresService = {
  get: (params: IParams , query = ""): Promise<IResponseData<ICadres>> => {
    return HttpService.axiosClient.get(pathCadres,  {params: {...params, keyword: query}});
  },
  getById: ( id : string, params?: IParams): Promise<IResponseData<ICadres>> => {
    return HttpService.axiosClient.get(pathCadres, {params: {...params, keyword: "", categoriesId : id}});
  },
  getCadresById: ( id : string): Promise<ICadres> => {
    return HttpService.axiosClient.get(pathCadres + `/${id}`);
  },
  post: (data: ICadresPost): Promise<ICadresPost> => {
    return HttpService.axiosClient.post(pathCadres, data);
  },
  delete: (data: string): Promise<any> => {
    return HttpService.axiosClient.delete(pathCadresDelete + data);
  },
  getCadresCategories : () : Promise<IResponseData<ICategotiesCadres>> => {
    return HttpService.axiosClient.get(pathCadresCategory );
  }
};

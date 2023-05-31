import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { ISubject, ISubjectPost } from "@typeRules/subject";
import type { IParams } from "@typeRules/pagination";
import type { IResponseData } from "@typeRules/responsive";

const pathSubject = getApi("subjects");
const pathSubjectDelete = getApi("subjects/allid?ids=");

export const subjectService = {
  get: (params: IParams , query = ""): Promise<IResponseData<ISubject>> => {
    return HttpService.axiosClient.get(pathSubject,  {params: {...params, keyword: query}});
  },
  getCadresById: ( id : string): Promise<ISubject> => {
    return HttpService.axiosClient.get(pathSubject + `/${id}`);
  },
  post: (data: ISubjectPost): Promise<ISubjectPost> => {
    return HttpService.axiosClient.post(pathSubject, data);
  },
  delete: (data: string): Promise<any> => {
    return HttpService.axiosClient.delete(pathSubjectDelete + data);
  },
};

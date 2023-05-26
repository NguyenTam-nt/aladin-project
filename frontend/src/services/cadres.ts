
import type { ICadres}  from "../typeRules/cadres"
import HttpService from "../configs/api"
const pathBanner = "/cadres"


const CadresAPI = {
  getAll: (): Promise<ICadres[]> => {

    
    return HttpService.axiosClient.get(pathBanner);
    
  },
  putCadres: (data: ICadres): Promise<ICadres> => {
    return HttpService.axiosClient.put(pathBanner, data);
  },
  postCadres: (data: ICadres): Promise<ICadres> => {
    return HttpService.axiosClient.post(pathBanner, data);
  },
};

export default CadresAPI;

import api from "./api";
import { TranslateType } from "commons/contannt";
import { pathService } from "./pathService";

const pathName = '/translate';
const pathObj = pathService.translateObj;

const TranslateService = {
    translateToKorea: async (content: any) : Promise<any> => {
        const result = await api.post(`${pathName}?type=1`, content);
        return result
    },
    translateToVietNam: async (content: any): Promise<any> => {
        const result = await api.post(`${pathName}?type=2`, content);
        return result
    },
    tranSlateKr: async (data:any) : Promise<any> => {
        return await api.post(`${pathObj}?type=1`, data);
    },
    tranSlateVn: async (data:any) : Promise<any> => {
        return await api.post(`${pathObj}?type=2`, data);
    }
}

export default TranslateService;
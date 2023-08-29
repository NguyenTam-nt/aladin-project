import api from "./api";
import { TranslateType } from "commons/contannt";

const pathName = '/translate';

const TranslateService = {
    translateToKorea: async (content: any) : Promise<string> => {
        const result = await api.post(`${pathName}?type=2`, content);
        return result.data
    },
    translateToVietNam: async (content: any): Promise<string> => {
        const result = await api.post(`${pathName}?type=1`, content);
        return result.data
    },
}

export default TranslateService;
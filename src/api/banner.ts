import { APIs } from "./config";
import { handleError } from "./handleError";
import request from "./request";
import { IResponseApi, Image } from "./types";

export interface IBanner {
    id: number,
    name: string,
    images: Image[]
}

export const getBannerByNameApi = async (name: string): Promise<
    IResponseApi<IBanner>
> => {
    try {
        const result = await request().get(`${APIs.GET_BANNER_BY_NAME}?name=${name}`);
        const data = await result.data;
        return {
            success: true,
            data: data,
        };
    } catch (e) {
        return handleError(e);
    }
};
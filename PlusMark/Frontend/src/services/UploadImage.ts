import api from "./api";

const pathMutiple = '/images';
const pathsingle = '/image';
const UploadImage = {
    uploadImage: async(data:any): Promise<any> => {
       return await api.post(pathsingle, data)
    },
    uploadImages: async(data:any): Promise<string[]>=> {
        const result =  await api.post(pathMutiple, data)
        return result.data
    },
    uploadVideo: async(data:any): Promise<string>=> {
        const result =  await api.post('/video', data)
        return result.data
    },
    uploadListImages: async(data:any): Promise<any>=> {
        return await api.post(`${pathMutiple}?delay=1`, data )
    },
    uploadVideos: async(data:any): Promise<string>=> {
        return await api.post('/video', data)
    }
}

export default UploadImage
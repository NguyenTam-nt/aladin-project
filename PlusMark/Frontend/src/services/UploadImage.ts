import api from "./api";

const pathMutiple = '/images';
const pathsingle = '/image';
const UploadImage = {
    uploadImage: async(data:any): Promise<any> => {
        const result =  await api.post(pathsingle, data)
        return result
    },
    uploadImages: async(data:any): Promise<string[]>=> {
        const result =  await api.post(pathMutiple, data)
        return result.data
    },
    uploadVideo: async(data:any): Promise<string>=> {
        const result =  await api.post('/video', data)
        return result.data
    }
}

export default UploadImage
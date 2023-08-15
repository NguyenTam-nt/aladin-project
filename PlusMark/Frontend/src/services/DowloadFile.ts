import queryString from "query-string"
import api from "./api"

const path = '/excelpayment'

const DowloadFile = {
    dowloadExcel : async(param: any):Promise<any> => {
        return await api.get(`${path}?${queryString.stringify(param,{skipNull: true})}`)
    }
}

export default DowloadFile
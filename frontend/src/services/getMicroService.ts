
export const microServices = {
    home: "home", // trang chủ
    account: "account", // user
    background: "background", // banner
    feel: "feel", // cảm nhận khách hàng
    infor: "information", // news
    media: "media", // file
    restaurent: "restaurent", // restaurent
    recruit: "recruitment" // tuyển dụng
} 

export const getMicroService = (api:string, service = 'home') => {
    return `/services/${service}/api/${api}`;
}

export const getMicroServiceAdmin = (api:string, service = 'home') => {
    return `/services/${service}/api/admin/${api}`;
}
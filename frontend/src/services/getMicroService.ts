
export const microServices = {
    home: "home", // trang chủ
    account: "account", // user
    background: "background", // banner
    feel: "feel", // cảm nhận khách hàng
    infor: "information", // news
    media: "media", // file
    feedback: "feedback", // contact
    restaurant: "restaurant", // restaurant
    recruit: "recruitment" // tuyển dụng
} 

export const getMicroService = (api:string, service = 'home') => {
    return `/services/${service}/api/${api}`;
}

export const getMicroServiceAdmin = (api:string, service = 'home') => {
    return `/services/${service}/api/admin/${api}`;
}

export const getMicroServiceSearchAdmin = (api:string, service = 'home') => {
    return `/services/${service}/api/admin/_search/${api}`;
}


export const getMicroSearchService = (api:string, service = 'home') => {
    return `/services/${service}/api/_search/${api}`;
}
export const prefixRootRoute = {
    public: "/",
    admin: "/quan-ly",
    slug: "id"
}

export const windownSizeWidth = window.innerWidth
export const windownSizeHeight = window.innerHeight

export const withResponsive = {
    _320: 320,
    _420: 420,
    _560: 560,
    _640: 640,
    _768: 768,
    _992: 992,
    _1024: 1024,
    _1280: 1280,
    _1536: 1536,
    _1690: 1690,
    _1920: 1920
}

export const fileBytes = {
    "_1": 1048576,
    "_2": 2097152,
    "_10": 10485760,
    "_20": 20971520,
}

export const SIZE_DATA = 12

export const VOUCHER_DATE_FORMAT = "hh:mm DD-MM--YYYY"

export const dataSortProduct = [
    {
        name: "Mới nhất",
        slug: "moi-nhat",
        action: "id,desc"
    },
    {
        name: "Cũ nhất",
        slug: "cu-nhat",
        action: "id,asc"
    },
    {
        name: "Từ cao đến thấp",
        slug: "tu-cao-den-thap",
        action: "price,desc"
    },
    {
        name: "Từ thấp đến cao",
        slug: "tu-thap-den-cao",
        action: "price,asc"
    }
  ];
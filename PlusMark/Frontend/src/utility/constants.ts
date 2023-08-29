export const BASE_URL = "/api";
export const ROUTES = {
  homepage: "/",
  intro: {
    news: {
      index: "news",
      detail: "news/:id",
    },
    index: "/about-us",
    contact: "contact",
    policy: "policy/:id",
  },
  search: {
    index: "/search",
    filter: "/filter"
  },
  product: {
    index: "/product",
    detail: (productId: any = ":productId") => `/product/${productId}`,
  },
  cart: {
    index: "/cart",
    payment: "/cart/payment",
  },
  payment: {
    index: "/payment",
  },
  admin: {
    index: "admin",
    advice: {
      index: "advice",
    },
    news: {
      index: "news",
      add: "news/add",
      update: "news/update/:id",
    },
    policy: {
      index: "policy",
      add: "policy/add",
      edit: "policy/edit/:id",
    },
    order: {
      index: "order",
    },
    products: {
      index: "product",
      add: "product/add",
      edit: "product/edit/:id",
    },
    cartegory: {
      index: "categores",
      add: "categores/add",
      edit: "categores/edit/:id",
      tradeMarkAdd: "trade-mark/add",
      tradeMarkEdit: "trade-mark/edit/:id",
    },
    voucher: {
      index: "voucher",
      add: "voucher/add",
      view: "voucher/edit/:id",
    },
    advise: {
      index: "advise",
    },
    introduce: {
      index: "introduce",
    },
    infomation: {
      index: "banner",
      home: "infoHome",
      contact: "contact",
      footer: "content-footer",
      popup: "contact-popup",
    },
    acounts: {
      index: "accounts",
    },
  },
};

export const BANNERS = {
  HOMEPAGE: "HOMEPAGE",
  RECENTLY_HOMEPAGE: "RECENTLY_HOMEPAGE",
  HOTSOLD_HOMEPAGE: "HOTSOLD_HOMEPAGE",
  SEARCH: "SEARCH",
  NEWS: "NEWS",
  PRODUCT: "PRODUCT",
  ABOUT_US: "ABOUT_US"
}

export const SUPPORT_ONLINE = {
  PHONE: "Điện thoại",
  FACEBOOK: "Facebook",
  ZALO: "Zalo"
}

export const PAYMENT_METHOD = {
  "ATM": "Chuyển khoản",
  "PERSON": "COD"
}


export const SIZE_PRODUCT_LOADMORE = 10

export const ALLOW_IMAGE_FILE_TYPE = ["image/jpeg", "image/jpg", "image/png"];

export const MAX_IMAGE_BANNER_SIZE = 2147483648; // 1024 * 1024 * 1024 * 2 bytes // 20MB

export const ROLES = {
  system: "system",
  admin: "admin",
  user: "user"
}

export const ROLE_SYSTEM_SELECT = {
  value: "system",
  label: "System"
}

export const ROLE_ADMIN_SELECT = {
  value: "admin",
  label: "Admin"
}

export const ROLE_USER_SELECT = {
  value: "user",
  label: "Khách hàng"
}



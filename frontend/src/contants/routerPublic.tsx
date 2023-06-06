
export interface IRouter {
    path: string;
    name: string;
    element: any;
    isHiden?: boolean;
  }

  const DemoElement = () => {
    return <>Demo element</>
  }
  
  export const paths = {
    home: {
      prefix: "/",
    },
    about: {
        prefix: "/gioi-thieu",
    },
    sale: {
        prefix: "/khuyen-mai",
    },
    order: {
        prefix: "/dat-ban",
    },
    memu: {
        prefix: "/thuc-don",
    },
    news: {
        prefix: "/tin-tuc",
    },
    contact: {
        prefix: "/lien-he",
    },

  };
  

export const routersPublic:IRouter[] = [
    {
        path: paths.home.prefix,
        element: DemoElement,
        name: "",
        isHiden: true,
    },
    {
        path: paths.about.prefix,
        element: DemoElement,
        name: "navigation.header.about",
    },
    {
        path: paths.sale.prefix,
        element: DemoElement,
        name: "navigation.header.sale",
    },
    {
        path: paths.order.prefix,
        element: DemoElement,
        name: "navigation.header.order",
    },
    {
        path: paths.memu.prefix,
        element: DemoElement,
        name: "navigation.header.memu",
    },
    {
        path: paths.news.prefix,
        element: DemoElement,
        name: "navigation.header.news",
    },
    {
        path: paths.contact.prefix,
        element: DemoElement,
        name: "navigation.header.contact",
    }
]
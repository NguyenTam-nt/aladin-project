import {defaultColors} from './dimentions';

export * from './dimentions';
export * from './checkDevice';

export const APIs = {};

export enum categoryKitchenNames {
  kitchen = 'kitchen',
  bar = 'bar',
}

export const headersCategory = [
  {
    name: 'Bếp',
    slug: categoryKitchenNames.kitchen,
  },
  {
    name: 'Bar',
    slug: categoryKitchenNames.bar,
  },
];

export enum categoryReportNames {
  general = 'general',
  detail = 'detail',
}

export const headerTabsReport = [
  {
    name: 'Tổng quan',
    slug: categoryReportNames.general,
  },
  {
    name: 'Chi tiết',
    slug: categoryReportNames.detail,
  },
];

export enum ROLE_LIST {
  user = 'ROLE_USER',
  admin = 'ROLE_ADMIN',
  staff = 'ROLE_STAFF',
  guest = 'ROLE_GUEST',
  chef = 'ROLE_CHEF',
}

export const activeTintColor = defaultColors.c_0000;
export const inactiveTintColor = defaultColors.c_fff;
export const activeBackgroundColor = defaultColors._F1BA42;
export const inactiveBackgroundColor = 'transparent';

export const hotpotId = 248;
export const hotpotId4 = 250
export const hotpotId2 = 1507
export const hotpotId1 = 1506

export const categoriesHotpot = [
  {
    id: hotpotId4,
    name: 'Lẩu 4 ngăn',
    isHome: true,
    isMenu: 'BAR',
    type: 'CHILD',
    idParent: hotpotId,
  },
  {
    id: hotpotId2,
    name: 'Lẩu 2 ngăn',
    isHome: true,
    linkMedia: null,
    isMenu: 'KITCHEN',
    type: 'CHILD',
    idParent: hotpotId,
  },
  {
    id: hotpotId1,
    name: 'Nồi đơn',
    isHome: true,
    linkMedia: null,
    isMenu: 'KITCHEN',
    type: 'CHILD',
    idParent: hotpotId,
  },
];

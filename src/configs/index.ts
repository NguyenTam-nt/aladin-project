export * from './dimentions';
export * from './checkDevice';

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

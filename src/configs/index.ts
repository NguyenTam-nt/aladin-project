export * from './dimentions';
export * from './checkDevice';


export enum categoryKitchenNames {
    kitchen = 'kitchen',
    bar = 'bar',
  };
  
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
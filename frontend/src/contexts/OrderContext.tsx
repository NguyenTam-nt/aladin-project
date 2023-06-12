import React, { ReactNode, createContext, useState } from "react";

interface IOrderState {
  listOrder: any[];
}

export const OrderContext = createContext<IOrderState>({
  listOrder: [],
});

type Props = {
  children: ReactNode;
};

export const OrderProvider = ({ children }: Props) => {
  const [listOrder, setListOrder] = useState<any[]>([]);
  return (
    <OrderContext.Provider
      value={{
        listOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

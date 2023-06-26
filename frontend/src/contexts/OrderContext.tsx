import type { IProduct } from "@typeRules/product";
import React, { ReactNode, createContext, useState } from "react";
import { useModalContext } from "./hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";

interface IOrderState {
  listOrder: IProduct[];
  handlePlusCart: (product: IProduct, count: number) => void;
  handleMinusCart: (id: number, count: number) => void;
  handleDeleteCart: (id: number) => void;
}

export const OrderContext = createContext<IOrderState>({
  listOrder: [],
  handlePlusCart: () => {},
  handleMinusCart: () => {},
  handleDeleteCart: () => {},
});

type Props = {
  children: ReactNode;
};

export const OrderProvider = ({ children }: Props) => {
  const { setElementModal, hideModal } = useModalContext();

  const [listOrder, setListOrder] = useState<IProduct[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem("cart") || "") || [];
    } catch (error) {
      return [];
    }
  });

  const handlePlusCart = (product: IProduct, count: number) => {
    const newProducts = [...listOrder];
    const index = newProducts.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      newProducts[index].quantity =
        Number(newProducts[index].quantity || 0) + count;
      setListOrder([...newProducts]);
      sessionStorage.setItem("cart", JSON.stringify(newProducts));
      return;
    }
    newProducts.unshift({ ...product, quantity: count });
    setListOrder([...newProducts]);
    sessionStorage.setItem("cart", JSON.stringify(newProducts));
  };

  const handleMinusCart = (id: number, count: number) => {
    const newProducts = [...listOrder];
    const index = newProducts.findIndex((item) => item.id === id);
    if (index !== -1) {
      const quantity = Number(newProducts[index].quantity || 0) - count;
      if (quantity > 0) {
        newProducts[index].quantity =
          Number(newProducts[index].quantity || 0) - count;
        setListOrder([...newProducts]);
        sessionStorage.setItem("cart", JSON.stringify(newProducts));
      } else {
        setElementModal(
          <DiglogComfirmDelete
            message="Bạn chắc chắn muốn xóa món ăn này khỏi giỏ hàng?"
            onClick={() => {
              handleDeleteCart(id)
              hideModal()
            }}
          />
        );
      }
    }
  };

  const handleDeleteCart = (id: number) => {
    const newProducts = [...listOrder];
    const index = newProducts.findIndex((item) => item.id === id);
    if (index !== -1) {
      newProducts.splice(index, 1);
      setListOrder([...newProducts]);
      sessionStorage.setItem("cart", JSON.stringify(newProducts));
    }
  };

  return (
    <OrderContext.Provider
      value={{
        listOrder,
        handleDeleteCart,
        handleMinusCart,
        handlePlusCart,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

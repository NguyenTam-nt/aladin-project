import { OrderContext } from "@contexts/OrderContext";
import { useContext } from "react";

export const useCartContext = () => {
  const { listOrder, handleDeleteCart, handleMinusCart, handlePlusCart } =
    useContext(OrderContext);

  return { listOrder, handleDeleteCart, handleMinusCart, handlePlusCart };
};

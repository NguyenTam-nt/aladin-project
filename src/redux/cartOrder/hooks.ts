import { useSelector } from 'react-redux';
import { RootState } from '..';
import { useMemo } from 'react';

export const useListItemInCart = () => {
  const listItemInCart   = useSelector(
    (appState: RootState) => appState.cartOrderSlice.itemInCart,
  );
  return listItemInCart;
};

export const useListItemProductInCart = () => {
  const itemCartOrder   = useSelector(
    (appState: RootState) => appState.cartOrderSlice.itemCartOrder,
  );
  return itemCartOrder;
};

export const useIdBill = () => {
  const idBill = useSelector(
    (appState: RootState) => appState.cartOrderSlice.idBill,
  );
  return idBill;
};

export const useQuatityValueRedux = (id?: number) => {
  const listItemInCart = useSelector(
    (appState: RootState) => appState.cartOrderSlice.itemInCart,
  );

  const newValue = useMemo<number | undefined>(() => {
    if (id) {
      const checkItem = listItemInCart.find(item => item.id === id);
      if (checkItem) {
        return checkItem.quantity;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }, [listItemInCart]);

  return newValue;
};



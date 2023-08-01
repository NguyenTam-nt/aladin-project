import {useSelector} from 'react-redux';
import {RootState} from '..';
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {IITemCart, addItemToCart} from './slice';

export const useListItemInCart = () => {
  const listItemInCart = useSelector(
    (appState: RootState) => appState.cartOrderSlice.itemInCart,
  );
  return listItemInCart;
};

export const useHandleAddCart = () => {
  const dispatch = useDispatch();
  return useCallback((data: IITemCart) => {
    dispatch(addItemToCart(data));
  }, []);
}
export const useIdBill = () => {
  const idBill = useSelector(
    (appState: RootState) => appState.cartOrderSlice.idBill,
  );
  return idBill;
};

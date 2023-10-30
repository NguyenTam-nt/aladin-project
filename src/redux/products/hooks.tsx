import {useDispatch, useSelector} from 'react-redux';
import {IProducts, addItemToProducts} from './slice';
import {useCallback} from 'react';
import {RootState} from '..';

export const useHandleAddItemWatchedProducts = () => {
  const dispatch = useDispatch();
  return useCallback((data: IProducts) => {
    dispatch(addItemToProducts(data));
  }, []);
};

export const useListWatchedProducts = () => {
  const listWatchedProducts = useSelector(
    (appState: RootState) => appState.productsSlice,
  );
  return listWatchedProducts;
};

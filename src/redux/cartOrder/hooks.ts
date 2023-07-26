import { useSelector } from 'react-redux';
import { RootState } from '..';



export const useListItemInCart = () => {
  const listItemInCart   = useSelector(
    (appState: RootState) => appState.cartOrderSlice.itemInCart,
  );
  return listItemInCart;
};

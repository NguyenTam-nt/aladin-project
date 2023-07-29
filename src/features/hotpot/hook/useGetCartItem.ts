import {hotpotId4, hotpotId2, hotpotId1} from '@configs';
import {useCallback, useMemo} from 'react';
import {useHandleAddCart, useListItemInCart} from 'src/redux/cartOrder/hooks';
import {IITemCart} from 'src/redux/cartOrder/slice';

export const useGetCartItem = (currentId: number) => {
  const listCategory = useListItemInCart();
  const handleAddCart = useHandleAddCart();

  const isFourBar = useMemo(() => {
    return currentId === hotpotId4;
  }, [currentId]);

  const isTwoBar = useMemo(() => {
    return currentId === hotpotId2;
  }, [currentId]);

  const isOneBar = useMemo(() => {
    return currentId === hotpotId1;
  }, [currentId]);

  const listMenuCategories = useMemo(() => {
    return listCategory.filter(item => item.data?.idCategory === currentId);
  }, [listCategory]);

  const listCategoriesByCategory = useMemo(() => {
    let finalListCategories: IITemCart[] = [];

    listMenuCategories.forEach(item => {
      if (isFourBar && finalListCategories.length >= 4) {
        return;
      }
      if (isTwoBar && finalListCategories.length >= 2) {
        return;
      }
      if (isOneBar && finalListCategories.length >= 1) {
        return;
      }

      for (let i = 0; i < item.quantity; i++) {
        finalListCategories.push(item);
      }
    });

    return finalListCategories;
  }, [currentId, isFourBar, isTwoBar, isOneBar, listMenuCategories]);

  const isPushCategory = useMemo(() => {
    const countQuanlity = listMenuCategories.reduce((currentCount, item) => {
      return currentCount + item.quantity;
    }, 0);
    if (isFourBar && countQuanlity >= 4) {
      return false;
    }
    if (isTwoBar && countQuanlity >= 2) {
      return false;
    }
    if (isOneBar && countQuanlity >= 1) {
      return false;
    }
    return true;
  }, [listMenuCategories]);

  const clearMenuCategory = useCallback(() => {
    listMenuCategories.forEach(item => {
      handleAddCart({
        ...item,
        quantity: 0,
      });
    });
  }, [listMenuCategories]);

  return {
    listCategoriesByCategory,
    isPushCategory,
    clearMenuCategory,
    isFourBar,
    isTwoBar,
    isOneBar
  };
};

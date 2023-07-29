import { hotpotId4, hotpotId2, hotpotId1 } from '@configs'
import {useMemo} from 'react';
import {useListItemInCart} from 'src/redux/cartOrder/hooks';

export const useGetCartItem = (currentId: number) => {
  const listCategory = useListItemInCart();

  const isFourBar = useMemo(() => {
    return currentId === hotpotId4
  }, [currentId])

  const isTwoBar = useMemo(() => {
    return currentId === hotpotId2
  }, [currentId])

  const isOneBar = useMemo(() => {
    return currentId === hotpotId1
  }, [currentId])


  const listCategoriesByCategory = useMemo(() => {
    let finalListCategories: any[] = []
    const newListData =  listCategory.filter(item => item.data?.idCategory === currentId);

    newListData.forEach((item) => {
        if(isFourBar && finalListCategories.length >= 4) return
        if(isTwoBar && finalListCategories.length >= 2) return
        if(isOneBar && finalListCategories.length >= 1) return

        for (let i = 0; i < item.quantity; i++) {
            finalListCategories.push(item)
        }
    })

    return finalListCategories
  }, [currentId, listCategory]);

  const lengthMenu = useMemo(() => {
    return listCategory.reduce((currentCount, item) => {
      return currentCount + item.quantity;
    }, 0);
  }, [listCategory]);

  return {
    listCategory,
    listCategoriesByCategory,

  }
};

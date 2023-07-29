import { useCallback, useEffect } from 'react';
import { IItemProductKitchen, IMenuItem, getProductKitchenApi } from 'src/api/products';
import { useHandleResponsePagination } from 'src/commons/useHandleResponsePagination';


export const useKitChenProduct = (
  id?: number,
  menu?: string,
  sort?: string,
  state?: string,
) => {
  const handleRequest = useCallback(
    (pageToken: number, pageSize: number) => {
      return getProductKitchenApi(id, pageToken, pageSize, menu, sort, state);
    },
    [id, menu, sort, state],
  );

  const dataProducts = useHandleResponsePagination<IItemProductKitchen>(handleRequest);
  const onRefresh = useCallback(() => {
    dataProducts.pullToRefresh();
  }, []);

  useEffect(() => {

      dataProducts.refresh();

  }, [id, menu, sort, state]);

  const keyExtractor = useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  return {
    keyExtractor,
    dataProducts,
    onRefresh,
  };
};

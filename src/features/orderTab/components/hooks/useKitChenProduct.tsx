import { useCallback, useEffect } from 'react';
import { IItemProductKitchen, IMenuItem, getProductKitchenApi, getSearchProductKitchenApi } from 'src/api/products';
import { useHandleResponsePagination } from 'src/commons/useHandleResponsePagination';


export const useKitChenProduct = (
  id?: number,
  menu?: string,
  sort?: string,
  state?: string,
  query?: string,
) => {
  const handleRequest = useCallback(
    (pageToken: number, pageSize: number) => {
      return query
        ? getSearchProductKitchenApi(
            id,
            pageToken,
            pageSize,
            menu,
            sort,
            state,
            query,
          )
        : getProductKitchenApi(id, pageToken, pageSize, menu, sort, state);
    },
    [id, menu, sort, state, query],
  );
  const dataProducts =
    useHandleResponsePagination<IItemProductKitchen>(handleRequest);
  const onRefresh = useCallback(() => {
    dataProducts.pullToRefresh();
  }, [handleRequest]);

  useEffect(() => {
    dataProducts.refresh();
  }, [id, menu, sort, state, query]);

  const keyExtractor = useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  return {
    keyExtractor,
    dataProducts,
    onRefresh,
  };
};

import { useCallback, useEffect } from 'react';
import { IMenuItem, getProductByCategory, getProductsApi } from 'src/api/products';
import { useHandleResponsePagination } from 'src/commons/useHandleResponsePagination';


export const useProductFlatList = (id : number) => {



  const handleRequest = useCallback(
    (pageToken: number, pageSize: number) => {


      return getProductsApi(id, pageToken, pageSize);

    },
    [id],
  );

  const dataProducts = useHandleResponsePagination<IMenuItem>(handleRequest);

  const onRefresh = useCallback(() => {
    dataProducts.pullToRefresh();
  }, []);

  useEffect(() => {
    if (id) {
      dataProducts.refresh();
    }
  }, [id]);

  const keyExtractor = useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  return {
    keyExtractor,
    dataProducts,
    onRefresh,
  };
};

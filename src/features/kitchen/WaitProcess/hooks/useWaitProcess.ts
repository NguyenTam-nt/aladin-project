import {useCallback, useEffect, useMemo, useState} from 'react';
import {useModal} from '../../../../hooks/useModal';
import {useGetCategotyType} from '../../useGetCategotyType';
import {getOrerKitchen, updateOrerKitchenOnlyState} from 'src/api/products';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {IOrderItem, IOrderKitchen, OrderType} from 'src/typeRules/product';

export enum TypeModalWaitProcess {
  cancelbill = 'CANCELBILL',
  refusebill = 'REFUSEDBILL',
}

export enum TypeFilter {
  area = 'area',
  dist = 'dist',
}

export const dataFilter = [
  {
    label: 'Sắp xếp theo bàn',
    value: TypeFilter.area,
  },
  {
    label: 'Sắp xếp theo món ăn',
    value: TypeFilter.dist,
  },
];

export const useWaitProcess = () => {
  const modalConfirmCancel = useModal();
  const modalRefuse = useModal();
  const [currentDataSelect, setCurrentDataSelect] = useState<IOrderItem>();
  const {currentType} = useGetCategotyType();
  const [fileterItem, setFilterItem] = useState(dataFilter[0]);
  const getOrderKitchenMethod = useCallback(
    async (page: number, size: number) => {
      return getOrerKitchen({page, size, menu: currentType}, fileterItem.value);
    },
    [currentType, fileterItem],
  );

  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore, setData} =
    useHandleResponsePagination<IOrderKitchen>(getOrderKitchenMethod);

  const handleShowModalAction = useCallback(
    (type: TypeModalWaitProcess, item: IOrderItem) => {
      switch (type) {
        case TypeModalWaitProcess.cancelbill:
          setCurrentDataSelect(item);
          modalConfirmCancel.handleShow();
          break;
        case TypeModalWaitProcess.refusebill:
          modalRefuse.handleShow();
          break;
        default:
          break;
      }
    },
    [],
  );

  const handlePressCompelete = useCallback((item: IOrderItem, reason = "", state:OrderType, isAll = false) => {
    updateOrerKitchenOnlyState(
      state,
      item.idInvoice,
      item.id,
      reason
    ).then(result => {
      const index = data.findIndex(item => item.idInvoice === currentDataSelect?.idInvoice)
     const newData = [...data]
     newData.splice(index, 1, result.data)
     setData(newData)
      // MesseUl
    });
  }, [data]);


  const isTable = useMemo(() => {
    return fileterItem.value === TypeFilter.area;
  }, [fileterItem]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    modalConfirmCancel,
    modalRefuse,
    handleShowModalAction,
    currentType,
    data,
    isRefreshing,
    pullToRefresh,
    refresh,
    handleLoadMore,
    fileterItem,
    setFilterItem,
    isTable,
    handlePressCompelete,
    currentDataSelect
  };
};

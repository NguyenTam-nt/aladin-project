import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useModal} from '../../../../hooks/useModal';
import {useGetCategotyType} from '../../useGetCategotyType';
import {
  getOrerKitchen,
  updateOrerKitchenAllState,
  updateOrerKitchenOnlyState,
} from 'src/api/products';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {IOrderItem, IOrderKitchen, OrderType} from 'src/typeRules/product';
import {MessageUtils} from 'src/commons/messageUtils';

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
  const refAll = useRef<boolean>(false);
  const getOrderKitchenMethod = useCallback(
    async (page: number, size: number) => {
      return getOrerKitchen({page, size, menu: currentType}, fileterItem.value);
    },
    [currentType, fileterItem],
  );

  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore, setData} =
    useHandleResponsePagination<IOrderKitchen>(getOrderKitchenMethod);

  const handleShowModalAction = useCallback(
    (type: TypeModalWaitProcess, item: IOrderItem, isAll = false) => {
      setCurrentDataSelect(item);
      refAll.current = isAll;
      switch (type) {
        case TypeModalWaitProcess.cancelbill:
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

  const isTable = useMemo(() => {
    return fileterItem.value === TypeFilter.area;
  }, [fileterItem]);

  const hanldeDataAfterUpdate = useCallback((result:IOrderItem[], item:IOrderItem) => {
    if (isTable) {
      const index = data.findIndex(
        _item => _item.idInvoice === item?.idInvoice,
      );
      if (index !== -1) {
        const newData = [...data];
        newData[index].list = result
        setData(newData);   
      }
    } else {
      const indexProduct = data.findIndex(
        _item => _item.idProduct === item.idProduct,
      );
      if (indexProduct !== -1) {
        const newData = [...data];
        const indexChild = data[indexProduct].list.findIndex(
          _item => _item.id === item.id,
        );
        if (indexChild !== -1) {
          const elementResult = result.find(
            (_item: IOrderItem) => _item.id === item.id,
          );
          if (elementResult) {
            newData[indexProduct].list[indexChild] = elementResult;
          } else {
            newData[indexProduct].list.splice(indexChild, 1);
          }
        }
        setData([...newData]);
      }
    }
    MessageUtils.showSuccessMessageWithTimeout('Cập nhật trạng thái thành công');
  }, [data, isTable])

  const handleConpleteAll = useCallback(
    (item: IOrderItem, reason = '', state: OrderType) => {
      updateOrerKitchenAllState(state, item.idInvoice, item.id, reason)
        .then(result => {
          hanldeDataAfterUpdate(result.data, item)
        })
        .catch(error => {
          console.log({error});
        })
        .finally(() => {
          handleClear();
        }); 
    },
    [hanldeDataAfterUpdate],
  );



  const handlePressCompeleteOnly = useCallback(
    (item: IOrderItem, reason = '', state: OrderType) => {
      updateOrerKitchenOnlyState(state, item.idInvoice, item.id, reason)
        .then(result => {
          hanldeDataAfterUpdate(result.data, item)
        })
        .catch(error => {
          console.log({error});
        })
        .finally(() => {
          handleClear();
        });
    },
    [],
  );

  const handlePressCompelete = useCallback(
    (item: IOrderItem, reason = '', state: OrderType, isAll = false) => {
      if (isAll || refAll.current) {
        handleConpleteAll(item, reason, state);
        return;
      }
      handlePressCompeleteOnly(item, reason, state);
    },
    [data, handleConpleteAll],
  );

  const handleClear = useCallback(() => {
    refAll.current = false;
    setCurrentDataSelect(undefined);
    modalConfirmCancel.handleHidden();
    modalRefuse.handleHidden();
  }, []);

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
    currentDataSelect,
  };
};

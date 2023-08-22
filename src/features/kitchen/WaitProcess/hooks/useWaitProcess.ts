import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useModal} from '../../../../hooks/useModal';
import {useGetCategotyType} from '../../useGetCategotyType';
import {
  getOrerKitchen,
  updateOrerKitchenAllState,
  updateOrerKitchenOnlyState,
} from 'src/api/products';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import {
  IOrderItem,
  IOrderKitchen,
  IOrderSocket,
  OrderType,
} from 'src/typeRules/product';
import {MessageUtils} from 'src/commons/messageUtils';
import {useAreaId} from 'src/redux/infoDrawer/hooks';
import { INotice } from '@typeRules';
import { useConnectSocketJS } from 'src/hooks/useConnectSockJS'

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
  const [notices, setNotices] = useState<INotice[]>([]);

  const [fileterItem, setFilterItem] = useState(dataFilter[0]);
  const refAll = useRef<boolean>(false);
  const getOrderKitchenMethod = useCallback(
    async (page: number, size: number) => {
      return getOrerKitchen({page, size, menu: currentType}, fileterItem.value);
    },
    [currentType, fileterItem],
  );

  const IdArea = useAreaId();

  const isTable = useMemo(() => {
    return fileterItem.value === TypeFilter.area;
  }, [fileterItem]);

  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore, setData} =
    useHandleResponsePagination<IOrderKitchen>(getOrderKitchenMethod);

  const {dataSocket, setDataSocket} = useConnectSocketJS<IOrderSocket[]>(IdArea ? `/topic/kitchen/${IdArea}` : "")
  const {dataSocket:dataNotification, setDataSocket:setDataSocketNotification} = useConnectSocketJS<INotice>(IdArea ? `/topic/kitchen/noti/${IdArea}` : "")

  const hanldeDataAfterUpdate = useCallback(
    (result: IOrderItem[], item: IOrderItem) => {
      console.log({result})
      // if(item.state === OrderType.cancel || item.state === OrderType.complete) {
      if (isTable) {
        const index = data.findIndex(
          _item => _item.idInvoice === item?.idInvoice,
        );
        if (index !== -1) {
          const newData = [...data];
          newData[index].list = result;
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

      // }
      MessageUtils.showSuccessMessageWithTimeout(
        'Cập nhật trạng thái thành công',
      );
    },
    [data, isTable],
  );

  const handleDataSocker = useCallback((result: IOrderSocket[]) => {
    if (result) {
      const listData = result.find(
        item => item.menu === currentType,
      );

      console.log({listData: listData?.kitchen?.[0].list, currentType})

      const newDataConvert: IOrderSocket = {
        menu: listData?.menu ?? currentType,
        kitchen:
          listData?.kitchen.map((item) => {
            return {
              ...item,
              list: item.list,
            };
          }) || [],
      };

      const newData = [...data];
      if (isTable) {
        newDataConvert?.kitchen.forEach(item => {
          const index = newData.findIndex(
            _item => _item.idInvoice === item.idInvoice,
          );
          if (index === -1) {
            newData.unshift(item);
          } else {
            newData.splice(index, 1, item);
          }
        });
      } else {
        const result1: IOrderItem[] = newDataConvert.kitchen.reduce(
          (currentList, item) => {
            return [...currentList, ...item.list];
          },
          [] as IOrderItem[],
        );

        const outputArray: IOrderKitchen[] = [];
        const groupedMap: Map<number, IOrderItem[]> = new Map();

        for (const obj of result1) {
          const key = obj.idProduct;
          if (groupedMap.has(key)) {
            // @ts-ignore
            groupedMap.get(key).push(obj);
          } else {
            groupedMap.set(key, [obj]);
          }
        }

        groupedMap.forEach((value, key) => {
          const num = value.reduce((count, item) => {
            return count + item.numProduct;
          }, 0);
          outputArray.push({
            list: value as IOrderItem[],
            idProduct: key,
            nameProduct: value.length ? value[0].name : '',
            num,
          });
        });

        outputArray.forEach(item => {
          const index = newData.findIndex(
            _item => _item.idProduct === item.idProduct,
          );
          if (index === -1) {
            newData.unshift(item);
          } else {
            item.list.forEach(i => {
              const _index = newData[index].list.findIndex(
                _i => _i.id === i.id,
              );
              if (_index === -1) {
                newData[index].list.unshift(i);
              } else {
                newData[index].list.splice(_index, 1, i);
              }
            });
          }
        });
      }
      setData([...newData]);
    }
  }, [currentType, data, isTable]);

  useEffect(() => {
    if(dataSocket) {
      console.log("socket ----------------------------------------------------------------", dataSocket)
      handleDataSocker(dataSocket)
      setDataSocket(undefined)
    }
  }, [dataSocket, handleDataSocker])

  useEffect(() => {
    if(dataNotification) {
      console.log("dataNotification-------",dataNotification )
      setNotices(oldData => {
        const newData = [dataNotification, ...oldData];
        return newData.slice(0, 3);
      });
      setDataSocketNotification(undefined)
    }
  }, [dataNotification])

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

  const handleConpleteAll = useCallback(
    (item: IOrderItem, reason = '', state: OrderType) => {
      updateOrerKitchenAllState(state, item.idInvoice, item.id, reason)
        .then(result => {
          console.log({data: result.data});
          if (data) {
            // hanldeDataAfterUpdate(result.data.list ?? [], item);
            MessageUtils.showSuccessMessageWithTimeout(
              'Cập nhật trạng thái thành công',
            );
            return;
          }
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
        })
        .catch(error => {
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
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
          console.log({data: result, item});
          if (data) {
            // hanldeDataAfterUpdate(result.data, item);
            MessageUtils.showSuccessMessageWithTimeout(
              'Cập nhật trạng thái thành công',
            );
            return;
          }
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
        })
        .catch(error => {
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
          console.log({error});
        })
        .finally(() => {
          handleClear();
        });
    },
    [hanldeDataAfterUpdate],
  );

  const handlePressCompelete = useCallback(
    (item: IOrderItem, reason = '', state: OrderType, isAll = false) => {
      if (isAll || refAll.current) {
        handleConpleteAll(item, reason, state);
        return;
      }
      handlePressCompeleteOnly(item, reason, state);
    },
    [data, handleConpleteAll, handlePressCompeleteOnly],
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

  const handleDeleteNotice = useCallback(
    (index: number) => {
      const listNotices = [...notices];
      listNotices.splice(index, 1);
      setNotices([...listNotices]);
    },
    [notices],
  );


  const newData = useMemo(() => {
    return data.filter(item => item.list.length)
  }, [data]) 

  return {
    modalConfirmCancel,
    modalRefuse,
    handleShowModalAction,
    currentType,
    data: newData,
    isRefreshing,
    pullToRefresh,
    refresh,
    handleLoadMore,
    fileterItem,
    setFilterItem,
    isTable,
    handlePressCompelete,
    currentDataSelect,
    handleDeleteNotice,
    notices,
  };
};

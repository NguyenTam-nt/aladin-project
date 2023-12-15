import {useIsFocused} from '@react-navigation/native';
import {INotice} from '@typeRules';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  getOrerKitchen,
  updateOrerKitchenAllState,
  updateOrerKitchenOnlyState,
} from 'src/api/products';
import {MessageUtils} from 'src/commons/messageUtils';
import {useHandleResponsePagination} from 'src/commons/useHandleResponsePagination';
import NotificationSound from 'src/components/Toast/SoundNotification';
import {useAppStateVisible} from 'src/hooks/useAppStateVisible';
import {useConnectSocketJS} from 'src/hooks/useConnectSockJS';
import {useAreaId} from 'src/redux/infoDrawer/hooks';
import {
  IOrderItem,
  IOrderKitchen,
  IOrderSocket,
  OrderType,
} from 'src/typeRules/product';
import {useModal} from '../../../../hooks/useModal';
import {useGetCategotyType} from '../../useGetCategotyType';
import {result} from 'lodash';

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
  const {playNotificationSound} = NotificationSound();
  const isFocus = useIsFocused();
  const {appStateVisible} = useAppStateVisible();
  const [dataItem, setDataItem] = useState<IOrderKitchen[]>([]);
  const newData = useRef<IOrderKitchen[] | null>(null);
  const [fileterItem, setFilterItem] = useState(dataFilter[0]);
  const refAll = useRef<boolean>(false);
  const getOrderKitchenMethod = useCallback(
    async (page: number, size: number) => {
      return getOrerKitchen(
        {page, size, menu: currentType, sort: 'id,asc'},
        TypeFilter.area,
      );
    },
    [currentType],
  );

  const IdArea = useAreaId();

  const isTable = useMemo(() => {
    return fileterItem.value === TypeFilter.area;
  }, [fileterItem]);

  const {data, isRefreshing, pullToRefresh, refresh, handleLoadMore, setData} =
    useHandleResponsePagination<IOrderKitchen>(getOrderKitchenMethod, 999);



    useEffect(() => {
      getOrerKitchen(
        { page : 0, size : 999, menu: currentType, sort: 'id,asc'},
        TypeFilter.area,
      ).then((data) => {
        if (isTable) {
          if (data.data) {
          setDataItem([...data.data.filter(item => item.list.length)]);
          return;
          }
        }
        if (data.data){
        const newData = convertDataHandler([...data.data.filter(item => item.list.length)]);
        setDataItem([...newData]);
        }

      } );

    } , [currentType]);

  const {dataSocket, setDataSocket} = useConnectSocketJS<IOrderSocket[]>(
    IdArea ? `/topic/kitchen/${IdArea}` : '',
  );
  const {
    dataSocket: dataNotification,
    setDataSocket: setDataSocketNotification,
  } = useConnectSocketJS<INotice>(
    IdArea ? `/topic/kitchen/noti/${IdArea}` : '',
  );

  const handleDataSocker = useCallback(
    (result: IOrderSocket[]) => {
      if (result) {
        const listData = result.find(item => item.menu === currentType);
        const newDataConvert: IOrderSocket = {
          menu: listData?.menu ?? currentType,
          kitchen:
            listData?.kitchen.map(item => {
              return {
                ...item,
                list: item.list,
              };
            }) || [],
        };

        const newData = [...data];
        newDataConvert?.kitchen.forEach(item => {
          const index = newData.findIndex(
            _item => _item.idInvoice === item.idInvoice,
          );
          if (index === -1) {
            newData.push(item);
          } else {
            newData.splice(index, 1, item);
          }
        });
        setData([...newData]);
      }
    },
    [currentType, data, isTable],
  );

  useEffect(() => {
    if (dataSocket) {
      playNotificationSound();
      handleDataSocker(dataSocket);
      setDataSocket(undefined);
    }
  }, [dataSocket, handleDataSocker]);

  useEffect(() => {
    if (dataNotification) {
      setNotices(oldData => {
        const newData = [dataNotification, ...oldData];
        return newData.slice(0, 3);
      });
      setDataSocketNotification(undefined);
    }
  }, [dataNotification]);

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
      removeItemById(item.idInvoice, item.id, true);

      updateOrerKitchenAllState(state, item.idInvoice, item.id, reason)
        .then(result => {
          if (data) {
            MessageUtils.showSuccessMessageWithTimeout(
              'Cập nhật trạng thái thành công',
            );

            return;
          }
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
        })
        .catch(error => {
          if (newData.current) {
            setDataItem([...newData.current]);
          }
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
        })
        .finally(() => {
          handleClear();
        });
    },
    [dataItem, data, isTable],
  );

  const handlePressCompeleteOnly = useCallback(
    (item: IOrderItem, reason = '', state: OrderType) => {
      if (state === OrderType.process_cancel && !reason) {
        removeItemById(item.idInvoice, item.id, true);
      } else if (state === OrderType.process_cancel && reason) {
        removeItemById(item.idInvoice, item.id, true, true);
      } else {
        removeItemById(item.idInvoice, item.id);
      }
      MessageUtils.showSuccessMessageWithTimeout(
        'Cập nhật trạng thái thành công',
      );
      handleClear();
      updateOrerKitchenOnlyState(state, item.idInvoice, item.id, reason)
        .then(result => {
          if (data) {
            MessageUtils.showSuccessMessageWithTimeout(
              'Cập nhật trạng thái thành công',
            );

              if (state === OrderType.process) {
              setTimeout(() => {
                if (newData.current) {
                setDataItem([...newData.current]);
                }
              } , 300);
            }

            return;
          }
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
        })
        .catch(error => {
          if (newData.current) {
          setDataItem([...newData.current]);
          }
          MessageUtils.showErrorMessageWithTimeout('Đã có lỗi xảy ra');
        })
        .finally(() => {
          handleClear();
        });
    },
    [data, dataItem, isTable],
  );

  const removeItemById = useCallback(
    (
      idInvoiceToRemove: number,
      idDist: number,
      removeAll?: boolean,
      isProcess?: boolean,
    ) => {
      setDataItem(prevDataItem => {
        return prevDataItem
          .map(item => {
            if (isTable) {
              if (item.idInvoice === idInvoiceToRemove) {
                if (removeAll) {
                  if (isProcess) {
                    const subItem = item.list?.find(
                      subItem =>
                        subItem?.idInvoice === idInvoiceToRemove &&
                        subItem?.id === idDist,
                    );
                    if (subItem?.numProduct) {
                      const indexToadd = item.list?.findIndex(
                        subItemToadd =>
                          subItemToadd?.idInvoice === idInvoiceToRemove &&
                          subItemToadd?.idProduct === subItem?.idProduct &&
                          subItemToadd.state === OrderType.process,
                      );
                      if (indexToadd !== -1) {
                      item.list[indexToadd].numProduct =
                        item.list[indexToadd].numProduct + subItem.numProduct;
                      }
                    }
                  }

                  item.list = item.list?.filter(
                    subItem => subItem?.id !== idDist,
                  );
                } else {
                  const subItem = item.list?.find(
                    subItem => subItem?.id === idDist,
                  );
                  if (subItem) {
                    subItem.numProduct = Math.max(subItem.numProduct - 1, 0);
                    if (subItem.numProduct === 0) {
                      item.list = item.list?.filter(
                        subItem => subItem?.id !== idDist,
                      );
                    }
                  }
                }
                if (item.list?.length === 0) {
                  return undefined;
                }
              }
            } else {
              const subItem = item.list?.find(
                subItem =>
                  subItem?.idInvoice === idInvoiceToRemove &&
                  subItem?.id === idDist,
              );
              if (subItem) {
                if (removeAll) {
                  if (isProcess) {
                    const indexToadd = item.list?.findIndex(
                      subItemToadd =>
                        subItemToadd?.idInvoice === idInvoiceToRemove &&
                        subItemToadd?.idProduct === subItem?.idProduct &&
                        subItemToadd.state === OrderType.process,
                    );
                    if (indexToadd !== -1) {
                      item.list[indexToadd].numProduct =
                        item.list[indexToadd].numProduct + subItem.numProduct;
                    }
                  }
                  item.list = item.list?.filter(
                    subItem => subItem?.id !== idDist,
                  );
                } else {
                  subItem.numProduct = Math.max(subItem.numProduct - 1, 0);
                  if (subItem.numProduct === 0) {
                    item.list = item.list?.filter(
                      subItem => subItem?.id !== idDist,
                    );
                  }
                }
              }
              if (item.list?.length === 0) {
                return undefined;
              }
            }
            return item;
          })
          .filter(item => item !== undefined);
      });
    },
    [dataItem, isTable],
  );

  const handlePressCompelete = useCallback(
    (item: IOrderItem, reason = '', state: OrderType, isAll = false) => {
      if (isAll || refAll.current) {
        handleConpleteAll(item, reason, state);

        return;
      }
      handlePressCompeleteOnly(item, reason, state);
    },
    [data, dataItem, handleConpleteAll, handlePressCompeleteOnly, isTable],
  );

  const handleClear = useCallback(() => {
    refAll.current = false;
    setCurrentDataSelect(undefined);
    modalConfirmCancel.handleHidden();
    modalRefuse.handleHidden();
  }, []);

  useEffect(() => {
    if (isFocus && appStateVisible === 'active') {
      refresh();
    }
  }, [refresh, isFocus, appStateVisible]);

  const handleDeleteNotice = useCallback(
    (index: number) => {
      const listNotices = [...notices];
      listNotices.splice(index, 1);
      setNotices([...listNotices]);
    },
    [notices],
  );

  const convertDataHandler = (data: IOrderKitchen[]) => {
    const newDataConvert = [...data];
    const result1: IOrderItem[] = newDataConvert.reduce((currentList, item) => {
      return [...currentList, ...item.list];
    }, [] as IOrderItem[]);

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

    return [...outputArray];
  };

  const newData1 = useMemo(() => {
    if (isTable) {
      return [...data];
    }
    const newData = convertDataHandler(data);

    return [...newData];
  }, [isTable, data]);

  useEffect(() => {
    if (isTable) {
      setDataItem([...newData1.filter(item => item.list.length)]);
    } else {
      const newDataCheck = convertDataHandler([
        ...newData1.filter(item => item.list.length),
      ]);
      setDataItem([...newDataCheck]);
    }
  }, [isTable]);

  useEffect(() => {
    setDataItem([]);
  }, [currentType]);

  useEffect(() => {
    newData.current = newData1.filter(item => item.list.length);
  }, [newData1]);

  useEffect(() => {
    let intervalId: any;
    if (isFocus) {
      intervalId = setInterval(() => {
        if (newData.current) {
          setDataItem([...newData.current]);
        }
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocus]);

  return {
    modalConfirmCancel,
    modalRefuse,
    handleShowModalAction,
    currentType,
    data: dataItem,
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

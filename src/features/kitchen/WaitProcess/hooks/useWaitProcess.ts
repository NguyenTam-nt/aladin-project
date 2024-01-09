import { useIsFocused } from '@react-navigation/native';
import { INotice } from '@typeRules';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
getOrerKitchen,
updateOrerKitchenAllState,
updateOrerKitchenOnlyState,
} from 'src/api/products';
import { MessageUtils } from 'src/commons/messageUtils';
import NotificationSound from 'src/components/Toast/SoundNotification';
import { useAppStateVisible } from 'src/hooks/useAppStateVisible';
import { useConnectSocketJS } from 'src/hooks/useConnectSockJS';
import { useAreaId } from 'src/redux/infoDrawer/hooks';
import {
IOrderItem,
IOrderKitchen,
IOrderSocket,
OrderType,
} from 'src/typeRules/product';
import { useModal } from '../../../../hooks/useModal';
import { useGetCategotyType } from '../../useGetCategotyType';
import { categoryKitchenNames } from '@configs';
import _ from 'lodash';

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
  const newData = useRef<IOrderKitchen[]>([]);
  const [filterItem, setFilterItem] = useState(dataFilter[0]);
  const refAll = useRef<boolean>(false);
  const TableRef = useRef<boolean>(true);
  const currentTypeRef = useRef<categoryKitchenNames>(categoryKitchenNames.kitchen);
  const newSocketRef = useRef<boolean>(true);

  const IdArea = useAreaId();

  const isTable = useMemo(() => {
    TableRef.current = filterItem.value === TypeFilter.area;
    return filterItem.value === TypeFilter.area;
  }, [filterItem]);

  useEffect(() => {
    currentTypeRef.current = currentType;
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
        newSocketRef.current = true;
        // const listData = result.find(item => item.menu === currentType);
        // const newDataConvert: IOrderSocket = {
        //   menu: listData?.menu ?? currentType,
        //   kitchen:
        //     listData?.kitchen.map(item => {
        //       return {
        //         ...item,
        //         list: item.list,
        //       };
        //     }) || [],
        // };
        // const newDataUpdate = [...newData.current];
        // newDataConvert?.kitchen.forEach(item => {
        //   const index = newDataUpdate.findIndex(
        //     _item => _item.idInvoice === item.idInvoice,
        //   );
        //   if (index === -1) {
        //     newDataUpdate.push(item);
        //   } else {
        //     newDataUpdate.splice(index, 1, item);
        //   }
        // });
        // newData.current = [...newDataUpdate];
      }
    },
    [currentType, isTable],
  );

  useEffect(() => {
    if (dataSocket) {
      // playNotificationSound();
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
      updateOrerKitchenAllState(state, item.idInvoice, item.id, reason ,item.numProduct)
        .then(result => {
          if (result.success) {
            MessageUtils.showSuccessMessageWithTimeout(
              'Cập nhật trạng thái thành công',
            );

            return;
          }
          callApi();
          MessageUtils.showErrorMessageWithTimeout(result.message ?? 'Đã có lỗi xảy ra');
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
    [isTable],
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
          if (result.success) {
            MessageUtils.showSuccessMessageWithTimeout(
              'Cập nhật trạng thái thành công',
            );

            return;
          }
          callApi();
          MessageUtils.showErrorMessageWithTimeout(result.message ?? 'Đã có lỗi xảy ra');
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
    [isTable],
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

                  item.list = [...item.list?.filter(
                    subItem => subItem?.id !== idDist,
                  )];
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
    [isTable],
  );




  const handleClear = useCallback(() => {
    refAll.current = false;
    setCurrentDataSelect(undefined);
    modalConfirmCancel.handleHidden();
    modalRefuse.handleHidden();
  }, []);

  const callApi = (isClear? : boolean ) => {
    getOrerKitchen(
      { page: 0, size: 9999, menu: currentTypeRef.current, sort: 'id,asc' },
      TableRef.current ? TypeFilter.area : TypeFilter.dist,
    ).then(data => {
      if ( data.data) {
        setDataItem(data.data.filter(item => item.list.length));

        return;
      }
      // setDataItem(prevDataItem => {
      //   const updatedData = prevDataItem.map(item => {
      //     const newDataItem = data.data.find(newItem => (
      //       TableRef.current ? newItem.idInvoice === item.idInvoice : newItem.idProduct === item.idProduct
      //     ));
      //     console.log('Different keys:', _.isEqualWith(item, newDataItem));

      //     // Nếu có dữ liệu mới và có sự thay đổi, cập nhật
      //     if (newDataItem && !_.isEqualWith(item, newDataItem)) {
      //       return newDataItem;
      //     }
      //     // Ngược lại, giữ nguyên mục cũ
      //     return item;
      //   });

      //   // Thêm các mục mới có list.length
      //   const newItems = data.data.filter(newItem => newItem.list.length && !prevDataItem.some(item =>
      //     TableRef.current ? item.idInvoice === newItem.idInvoice : item.idProduct === newItem.idProduct
      //   ));

      //   return [...updatedData, ...newItems];
      // });
    });
  };




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
      value?.sort((a, b) => {
        const dateA = new Date(a.createdDate).getTime();
        const dateB = new Date(b.createdDate).getTime();

        return dateA - dateB;
      });

      outputArray.push({
        list: value as IOrderItem[],
        idProduct: key,
        nameProduct: value.length ? value[0].name : '',
        num,
      });
    });

    const dataTableCheck = [...(dataItem || [])];

    if (dataTableCheck[0]?.idProduct) {
      outputArray.sort((a, b) => {
        const indexA = dataTableCheck.findIndex(
          item => item.idProduct === a.idProduct,
        );
        const indexB = dataTableCheck.findIndex(
          item => item.idProduct === b.idProduct,
        );
        if (indexA === -1) {
          return 1;
        }
        if (indexB === -1) {
          return -1;
        }
        return indexA - indexB;
      });
    }

    return outputArray;
  };

  // useEffect(() => {
  //   setDataItem([]);
  //   callApi();
  // }, [isTable]);

  const handlePressCompelete = useCallback(
    (item: IOrderItem, reason = '', state: OrderType, isAll = false) => {

      if (isAll || refAll.current) {
        handleConpleteAll(item, reason, state);
        return;
      }
      handlePressCompeleteOnly(item, reason, state);
    },
    [ handleConpleteAll, handlePressCompeleteOnly, isTable],
  );

  useEffect(() => {
    let intervalId: any;

    const fetchData = async () => {
      try {
        if (isFocus && newSocketRef.current) {
            newSocketRef.current = false;
           callApi();
        }
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };


    if (isFocus) {
      intervalId = setInterval(fetchData, 8000);
    }

    return () => {

      clearInterval(intervalId);
    };

  }, [isFocus, currentType, isTable]);

  useEffect(() => {
    let intervalId: any;

    if (isFocus) {
      intervalId = setInterval(() => {
        newSocketRef.current = true;
      }, 60000);
    }

    return () => {

      clearInterval(intervalId);
    };
  } , [isFocus]);

  useEffect(() => {
    if (isFocus && appStateVisible === 'active') {
    setDataItem([]);
      callApi();
    }
  }, [isFocus, appStateVisible, currentType ,isTable]);

  // useEffect(() => {
  //   let intervalId: any;

  //   const fetchData = async () => {
  //     try {
  //       if (isFocus && appStateVisible === 'active') {
  //         await callApi();
  //       }
  //     } catch (error) {

  //     }
  //   };




  //   if (isFocus && appStateVisible === 'active') {
  //       setDataItem([]);
  //       callApi(true);
  //     intervalId = setInterval(fetchData, 8000);
  //   }

  //   return () => {
  //     console.log('cleaerrrr');
  //     clearInterval(intervalId);
  //   };

  // }, [isFocus, currentType, isTable, appStateVisible]);




  return {
    modalConfirmCancel,
    modalRefuse,
    handleShowModalAction,
    currentType,
    data: dataItem,
    isRefreshing: false,
    pullToRefresh: callApi,
    refresh: callApi,
    fileterItem : filterItem,
    setFilterItem,
    isTable,
    handlePressCompelete,
    currentDataSelect,
    handleDeleteNotice,
    notices,
  };
};

import React, { memo, useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NoticeItem } from './NoticeItem';
import { DIMENSION } from '@constants';
import { useAreaId } from 'src/redux/infoDrawer/hooks';
import { useIdBill } from 'src/redux/cartOrder/hooks';
import { useIsFocused } from '@react-navigation/native';
import { SOCK_CLIENNT_URL } from 'src/api/config';
import SockJS from 'sockjs-client';
import { heightHeader, isTabletDevice } from '@configs';
export interface IDataNoti {
  state: boolean
  idInfrastructure: number
  idInvoice:  number
  reason: string
  key? : number
}

var Stomp = require('stompjs/lib/stomp.js').Stomp;
export const NoticeCancelItem = memo(() => {
  const IdArea = useAreaId();
  const billId = useIdBill();
  const [data, setData] = useState<IDataNoti[]>([]);
  const isFocused = useIsFocused();
  const currentIndex = useRef<number>(1);
  const ref = useRef<any>(null);

  const pushItem = (itemPush: IDataNoti) => {
    currentIndex.current += 1;
    // let newData = [...data];
    // newData = [...data, {...itemPush, key: currentIndex.current}].slice(-3);
    setData(data => [...data, {...itemPush, key: currentIndex.current}].slice(-3));
    setTimeout(() => {
      ref?.current?.scrollToEnd({animated: true});
    }, 300);
  };

  const removeItem = useCallback(
    (item: IDataNoti) => {
      const newData = [...data];
      const findIndex = newData.indexOf(item);
      newData.splice(findIndex, 1);
      setData(newData);
      setTimeout(() => {
        ref?.current?.scrollToEnd({animated: true});
      }, 300);
    },
    [data],
  );

  React.useEffect(() => {
    let stompClient1: any;
    if (IdArea && billId && isFocused) {
      const sockClient = new SockJS(SOCK_CLIENNT_URL);
      let stompClient = Stomp.over(sockClient);
      if (!stompClient.connected) {
        stompClient.connect(
          {},
          function () {
            setTimeout(() => {
              stompClient1 = stompClient.subscribe(
                `/topic/order/noti/${IdArea}/${billId}`,
                function (messageOutput: any) {
                  const dataSocket = JSON.parse(messageOutput.body);
                  pushItem(dataSocket);
                },
              );
            });
          },
          500,
        );
      }
    }
    return () => {
      if (stompClient1) {
        stompClient1.unsubscribe();
      }
    };
  }, [IdArea, billId, isFocused]);

  return (
      <NoticeItem data={data} ref={ref} removeItem={removeItem} />
  );
});

const styles = StyleSheet.create({
  groupNotice: {
    position: 'absolute',
    top: 0,
    right: 0,

  },
});

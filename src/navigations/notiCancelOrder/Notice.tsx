import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import NotificationSound from 'src/components/Toast/SoundNotification';
import { useConnectSocketJS } from 'src/hooks/useConnectSockJS';
import { useIdBill } from 'src/redux/cartOrder/hooks';
import { useAreaId } from 'src/redux/infoDrawer/hooks';
import { NoticeItem } from './NoticeItem';
import { MessageUtils } from 'src/commons/messageUtils';
export interface IDataNoti {
  state: boolean
  idInfrastructure: number
  idInvoice:  number
  reason: string
  key? : number
}

export const NoticeCancelItem = memo(() => {
  const {playNotificationSound  } = NotificationSound();
  const IdArea = useAreaId();
  const billId = useIdBill();
  const {dataSocket, setDataSocket} = useConnectSocketJS<IDataNoti>(
    IdArea && billId ? `/topic/order/noti/${IdArea}/${billId}` : '',
  );
  const [data, setData] = useState<IDataNoti[]>([]);
  const currentIndex = useRef<number>(1);

  const pushItem = (itemPush: IDataNoti) => {
    currentIndex.current += 1;
    setData(data => [...data, {...itemPush, key: currentIndex.current}]);
  };

  const removeItem = useCallback(
    (item: IDataNoti) => {
      setData(data => data.filter(data => data.key !== item.key));
    },
    [data],
  );

  useEffect(() => {
    if (dataSocket) {
      playNotificationSound();
      console.log('Notification' , dataSocket);
      MessageUtils.showWarningMessage('Từ chối huỷ : ' + dataSocket?.reason);
      // pushItem(dataSocket);
      setDataSocket(undefined);
    }
  }, [dataSocket ,MessageUtils]);

  return (
      <NoticeItem data={data} removeItem={removeItem} />
  );
});



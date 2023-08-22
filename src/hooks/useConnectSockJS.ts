import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { SOCK_CLIENNT_URL } from 'src/api/config'
import useIsInternetReachable from './useIsInternetReachable'
import { useAppStateVisible } from './useAppStateVisible'
import { useIsFocused } from '@react-navigation/native'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Stomp = require('stompjs/lib/stomp.js').Stomp;

export function useConnectSocketJS<T>(id: string) {
  const [dataSocket, setDataSocket] = useState<T>();
  const isInternetReachable = useIsInternetReachable()
  const {appStateVisible} = useAppStateVisible()
  const isFocus = useIsFocused()
  useEffect(() => {
    let stompClienTime: any;
    const connectWebSocket = () => {
      if (isInternetReachable) {
        const sockClient = new SockJS(SOCK_CLIENNT_URL);
        const stompClient = Stomp.over(sockClient);
        stompClient.heartbeat.outgoing = 5000;
        stompClient.heartbeat.incoming = 5000;
        stompClient.reconnect_delay = 5000;
        if (id) {
          if (!stompClient.connected) {
            stompClient.connect({}, function (frame: any) {
              setTimeout(() => {
                stompClienTime = stompClient.subscribe(id, function (messageOutput: any) {
                  const data1 = JSON.parse(messageOutput.body);
                  setDataSocket(data1);
                  // const autio = new Audio('aa');
                });
              }, 500);
            },
            stompFailureCallback
            );
          }
        }
      }
    }

    var stompFailureCallback = function (error: any) {
      console.log('STOMP error: ' + error);
      setTimeout(connectWebSocket, 5000);
      console.log('STOMP: Reconecting in 5 seconds');
    };

    if (id && isFocus && appStateVisible === 'active') {
      connectWebSocket();
    }

    return () => {
      if (stompClienTime) {
        stompClienTime.unsubscribe();
      }
    };
  }, [id, isInternetReachable, appStateVisible]);

  return { dataSocket, setDataSocket };
}


// useEffect(() => {
//   let stompClient1: any = null;
//   let stompClient: any = null;
//   const connectWebSocket = () => {
//     const sockClient = new SockJS(SOCK_CLIENNT_URL);
//     stompClient = Stomp.over(sockClient);
//     stompClient.heartbeat.outgoing = 5000;
//     stompClient.heartbeat.incoming = 5000;
//     stompClient.reconnect_delay = 5000;
//     stompClient.debug = function (message : any) {
//       console.log('check  message', message); // show tất cả tin nhắn debug từ Stomp
//     };
//     stompClient.connect(
//       {},
//       function () {
//         setTimeout(() => {
//           stompClient1 = stompClient .subscribe(
//             `/topic/order/${IdArea}/${billId}`,
//             function (messageOutput: any) {
//               const data = JSON.parse(
//                 messageOutput.body,
//               ) as IResponseProductUpdate;
//               dispatch(setItemProductInCart(data.list));
//             },
//           );
//         }, 500,);
//       },
//       stompFailureCallback,
//     );
//   };
//   var stompFailureCallback = function (error: any) {
//     console.log('STOMP error: ' + error);
//     // getItemInCart();
//     setTimeout(connectWebSocket, 5000);
//     console.log('STOMP: Reconecting in 5 seconds');
//   };
//   if (IdArea && isFocus && billId && appStateVisible === 'active') {
//     connectWebSocket();
//   }
//   return () => {
//     if (stompClient1) {
//       stompClient1.unsubscribe();
//     }
//   };
// }, [IdArea, billId ,isFocus, appStateVisible]);

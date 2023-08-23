import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { SOCK_CLIENNT_URL } from 'src/api/config';
import useIsInternetReachable from './useIsInternetReachable';
import { useAppStateVisible } from './useAppStateVisible';
import { useIsFocused } from '@react-navigation/native';


const Stomp = require('stompjs/lib/stomp.js').Stomp;

export function useConnectSocketJS<T>(id: string) {
  const [dataSocket, setDataSocket] = useState<T>();
  const isInternetReachable = useIsInternetReachable();
  const {appStateVisible} = useAppStateVisible();
  const isFocus = useIsFocused();
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

                });
              }, 500);
            },
            stompFailureCallback
            );
          }
        }
      }
    };

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
  }, [id, isInternetReachable, appStateVisible ,isFocus]);

  return { dataSocket, setDataSocket };
}
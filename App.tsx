
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { isTabletDevice } from '@configs';
import React, { useEffect, useLayoutEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { MainStack } from './src/navigations/MainStack';
import { persistor } from './src/redux';
import Toast from 'react-native-toast-message';
import ToastMessage from 'src/components/Toast';

function App() {


  //  useLayoutEffect(() => {
  //   if (isTabletDevice) {
  //     Orientation.lockToLandscape();
  //   } else {
  //     Orientation.lockToPortrait();
  //   }
  // }, []);

  const toastConfig = {
    tomatoToast: ({ props }: any) => <ToastMessage status={props.status} title={props.uuid} />,
  };

  return (
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <MainStack />
        <Toast config={toastConfig} position="bottom"  />
      </SafeAreaProvider>
    </PersistGate>
  );
}
export default App;

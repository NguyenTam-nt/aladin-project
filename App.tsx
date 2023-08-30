
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
import { View  ,StyleSheet} from 'react-native';

function App() {

  const toastConfig = {
    tomatoToast: ({ props }: any) => <ToastMessage status={props.status} title={props.uuid} />,
  };

  return (
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <MainStack />
        <View style={isTabletDevice ? styles.container : undefined}>
          <Toast config={toastConfig} position="bottom" />
        </View>
      </SafeAreaProvider>
    </PersistGate>
  );
}

const styles = StyleSheet.create({
  container : {
    position: 'absolute',
    left: isTabletDevice ? 255 : 0,
    bottom: 0,
  },
});
export default App;

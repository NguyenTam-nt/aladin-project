
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { isTabletDevice } from '@configs';
import React, { useLayoutEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { MainStack } from './src/navigations/MainStack';
import { persistor } from './src/redux';

function App() {
   useLayoutEffect(() => {
    if (isTabletDevice) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, []);

  return (
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <MainStack />
      </SafeAreaProvider>
    </PersistGate>
  );
}
export default App;

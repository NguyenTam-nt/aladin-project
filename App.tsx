
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { MainStack } from './src/navigations/MainStack';
import { persistor } from './src/redux';

function App() {
  return (
    <PersistGate  persistor={persistor}>
        <SafeAreaProvider>
          <MainStack />
        </SafeAreaProvider>
    </PersistGate>
  );
}
export default App;

/* eslint-disable react/react-in-jsx-scope */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainStack} from './src/navigations/MainStack';
import {enableScreens} from 'react-native-screens';

function App(): JSX.Element {
  enableScreens();
  return (
    <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainStack />
        </SafeAreaProvider>
    </PersistGate>
  );
}
export default App;

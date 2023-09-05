/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux';
import Toast from 'react-native-toast-message';
import ToastMessage from 'src/components/Toast';
import {View, StyleSheet} from 'react-native';
import './src/configs/i18n';
// import {useTranslation} from 'react-i18next';
import MainStack from 'src/navigations/MainStack'
import Orientation from 'react-native-orientation-locker'

function App() {
  const toastConfig = {
    tomatoToast: ({props}: any) => (
      <ToastMessage status={props.status} title={props.uuid} />
    ),
  };

  // const {t, i18n} = useTranslation();
  // const [currentLanguage, setLanguage] = useState('vi');

  // const changeLanguage = (value: string) => {
  //   i18n
  //     .changeLanguage(value)
  //     .then(() => setLanguage(value))
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
          <MainStack />
        <View style={styles.container}>
          <Toast config={toastConfig} position="bottom" />
        </View>
      </SafeAreaProvider>
    </PersistGate>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});
export default App;

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
import {View, StyleSheet, Platform, NativeModules} from 'react-native';
import './src/configs/i18n';
import * as RNLocalize from 'react-native-localize';
import MainStack from 'src/navigations/MainStack';
import Orientation from 'react-native-orientation-locker';
import {languageKey} from 'src/constants/defines';
import {useTranslation} from 'react-i18next';
import {useHandleChangeLanguage} from 'src/redux/multilanguage/hooks';
import {language} from 'src/redux/multilanguage/slice';

function App() {
  const {i18n} = useTranslation();
  const handleChangeLanguage = useHandleChangeLanguage();
  const toastConfig = {
    tomatoToast: ({props}: any) => (
      <ToastMessage status={props.status} title={props.uuid} />
    ),
  };

  const defaultLanguage = languageKey.vi;

  const getDeviceLanguage = (locale?: string) => {
    const deviceLanguage: string =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : locale || NativeModules.I18nManager.localeIdentifier;

    if (typeof deviceLanguage !== 'string') {
      return defaultLanguage;
    }
    if (deviceLanguage.includes(languageKey.vi)) {
      return languageKey.vi;
    }
    if (deviceLanguage.includes(languageKey.ko)) {
      return languageKey.ko;
    }

    return defaultLanguage;
  };
  // const {t, i18n} = useTranslation();
  // const [currentLanguage, setLanguage] = useState('vi');

  // const changeLanguage = (value: string) => {
  //   i18n
  //     .changeLanguage(value)
  //     .then(() => setLanguage(value))
  //     .catch(err => console.log(err));
  // };

  // React.useEffect(() => {
  //   const locale2 = getDeviceLanguage(
  //     RNLocalize.getLocales()[0].languageCode,
  //   )
  //   // console.log({locale2});
  //   // setLanguage(locale2)
  //   i18n.changeLanguage(locale2);
  //  }, []);

  useEffect(() => {
    Orientation.lockToPortrait();
    const locale2 = getDeviceLanguage(RNLocalize.getLocales()[0].languageCode);
    i18n.changeLanguage(locale2);
  }, []);

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

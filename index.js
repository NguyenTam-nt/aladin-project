/**
 * @format
 */
import React, {useEffect, useLayoutEffect, useMemo} from 'react';
import {isTabletDevice} from '@configs';
import Orientation from 'react-native-orientation-locker';
import {AppRegistry, Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import {Provider} from 'react-redux';
import store from './src/redux';
import {DIMENSION} from '@constants';
export const GiangMy = () => {
  useMemo(() => {
    const updateScreenDimensions = () => {
      DIMENSION.width = Dimensions.get('window').width;
      DIMENSION.height = Dimensions.get('window').height;
      // Update other properties as needed
    };
    if (isTabletDevice) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    Dimensions.addEventListener('change', updateScreenDimensions);
    return () => {
      Dimensions.removeEventListener('change', updateScreenDimensions);
    };
  }, []);

  // Rest of your component code

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => GiangMy);

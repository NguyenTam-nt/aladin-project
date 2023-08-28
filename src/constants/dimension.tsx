import { Dimensions, Platform, StatusBar } from 'react-native';
import deviceInfoModule from 'react-native-device-info';

export const DIMENSION = {
  width:  Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  scale: Dimensions.get('window').scale,
  avoidStatusBarDistance: Platform.select({
    ios: deviceInfoModule.hasNotch() ? 44 : 20,
    default: (StatusBar.currentHeight || 24) + 8,
  }),
  topPadding: Platform.select({
    ios: 0,
    android: (StatusBar.currentHeight || 24) + 0,
    default: (StatusBar.currentHeight || 24) + 8,
  }),
  bottomPadding: Platform.select({
    ios: deviceInfoModule.hasNotch() ? 34 : 20,
    android: 10,
    default: 10,
  }),
  flatlistPaddingBottom: 64,
};



import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const deviceInfoParams = {
  identity: '',
  os_name: Platform.OS.toString().toUpperCase(),
  os_version: DeviceInfo.getVersion(),
};

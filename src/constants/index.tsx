export * from './dimension';

import { Platform, Dimensions } from 'react-native'

const isAndroid = Platform.OS === 'android'
const isIOS = Platform.OS === 'ios'

const deviceHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height
const bottomNavBarHeight = deviceHeight - windowHeight
const hasBottomNav = bottomNavBarHeight > 0

export { isAndroid, isIOS, hasBottomNav }

export const Days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
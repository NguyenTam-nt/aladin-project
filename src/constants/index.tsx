export * from './dimension';

import { Platform, Dimensions } from 'react-native'

const isAndroid = Platform.OS === 'android'
const isIOS = Platform.OS === 'ios'

const deviceHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height
const bottomNavBarHeight = deviceHeight - windowHeight
const hasBottomNav = bottomNavBarHeight > 0

export { isAndroid, isIOS, hasBottomNav }

import {useNetInfo} from "@react-native-community/netinfo"

const useIsInternetReachable = () => {
  const netInfo = useNetInfo()
  return netInfo.isInternetReachable
}

export const useIsInternetConnected = () => {
  const netInfo = useNetInfo()
  return netInfo.isConnected
}


export default useIsInternetReachable

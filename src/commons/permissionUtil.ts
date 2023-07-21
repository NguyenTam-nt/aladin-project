import type { Rationale } from 'react-native'
import {
  RESULTS,
  check,
  request,
  checkNotifications,
  requestNotifications,
  AndroidPermission,
  IOSPermission,
  PermissionStatus,
} from 'react-native-permissions'

import { Alert, Linking } from "react-native"
import { requestCameraPermissions, requestPhotoLibraryPermissions, requestStorgePermissions } from "./cameraUtils"

export const permisstionText = {
  image: "danh sách hình ảnh",
  video: "danh sách video",
  camera: "camera",
  files: "tệp"
}


export interface IPayloadRequestPermission {
  permission: AndroidPermission | IOSPermission
  need_request?: boolean
}

export type IReturnRequestPermission = Promise<PermissionStatus>

export const requestPermission = async (
  permission: AndroidPermission | IOSPermission,
  rationale?: Rationale
) => {
  const result = await request(permission, rationale)
  if (result === RESULTS.GRANTED) return result
  return RESULTS.BLOCKED
}

/**
 * func rewrite check+request permission
 */
export const checkPermission: (
  payload: IPayloadRequestPermission
) => IReturnRequestPermission = async ({ permission, need_request }) => {
  const result = await check(permission)
  switch (result) {
    case RESULTS.DENIED:
      if (!need_request) return RESULTS.BLOCKED
      return requestPermission(permission)

    default:
      return result
  }
}

export const requestNotificationPermission = async () => {
  const { status } = await requestNotifications(['alert', 'sound', 'badge', 'criticalAlert'])
  return status
}

export const checkNotificationPermission: () => IReturnRequestPermission = async () => {
  const { status } = await checkNotifications()
  switch (status) {
    case RESULTS.DENIED: {
      return requestNotificationPermission()
    }
    default:
      return status
  }
}



 export  const handleSelectResourses = {
    handleSelectImage: (onSuccess: () => void) => {
      requestPhotoLibraryPermissions(onSuccess, () => onNotAllowedAccessPhotosLibrary(permisstionText.image))
    },
    handleSelectCamera: (onSuccess: () => void) => {
      requestCameraPermissions(onSuccess, () => onNotAllowedAccessPhotosLibrary(permisstionText.camera))
    },
    handleSelectFiles: (onSuccess: () => void) => {
      requestStorgePermissions(onSuccess, () => onNotAllowedAccessPhotosLibrary(permisstionText.files))
    }
 }
    
  export  const showRequestPermissionDialog = (message: string) => {
    Alert.alert('Cảnh báo', message, [
      {
        text: 'Huỷ',
        style: 'cancel',
      },
      {
        text: 'Cho phép',
        style: 'default',
        onPress: () => {
          Linking.openSettings()
        },
      },
    ])
  }
    
  export const onNotAllowedAccessPhotosLibrary = (message: string) => {
    showRequestPermissionDialog(
      `Ứng dụng không được phép truy cập ${message}. Vui lòng cấp quyền ứng dụng và thử lại.`,
    )
  }


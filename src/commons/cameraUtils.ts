// import { Platform } from 'react-native'
// import {
//   check,
//   PERMISSIONS,
//   Rationale,
//   RESULTS,
// } from 'react-native-permissions'
// import { IReturnRequestPermission, requestPermission } from './permissionUtil'

// export const permisstionCamera = Platform.select({
//   ios: PERMISSIONS.IOS.CAMERA,
//   android: PERMISSIONS.ANDROID.CAMERA,
// }) as any




// /** func check quyền camera
//  * nếu denied thì hiển thị popup mặc định hỏi quyền
//  * còn lại trả về đúng result
//  */
// export const checkAndRequestCameraPermission: (
//   rationale?: Rationale,
// ) => IReturnRequestPermission = async rationale => {
//   const result = await check(permisstionCamera)
//   switch (result) {
//     case RESULTS.DENIED: {
//       return requestPermission(permisstionCamera, rationale)
//     }

//     default:
//       return result
//   }
// }

// /** func check quyền library photo
//  * nếu denied thì hiển thị popup mặc định hỏi quyền
//  * còn lại trả về đúng result
//  */
// export const permisstionLibrary = Platform.select({
//   ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
//   android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
// }) as any

// export const permisstionStorge = Platform.select({
//   ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//   android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
// }) as any

// export const checkAndRequestLibraryPermission: (
//   rationale?: Rationale,
// ) => IReturnRequestPermission = async rationale => {
//   const result = await check(permisstionLibrary)
//   switch (result) {
//     case RESULTS.DENIED: {
//       return requestPermission(permisstionLibrary, rationale)
//     }

//     default:
//       return result
//   }
// }

// export const checkAndRequestStorgePermission: (
//   rationale?: Rationale,
// ) => IReturnRequestPermission = async rationale => {
//   const result = await check(permisstionStorge)
//   switch (result) {
//     case RESULTS.DENIED: {
//       return requestPermission(permisstionStorge, rationale)
//     }

//     default:
//       return result
//   }
// }

// export const requestCameraPermissions = (
//   onGranted: () => void,
//   onBlockedPermission: () => void,
// ) => {
//   checkAndRequestCameraPermission()
//     .then(response => {
//       switch (response) {
//         case 'granted':
//         case 'limited':
//           onGranted()
//           break
//         case 'blocked':
//           onBlockedPermission()
//           break
//         default:
//           break
//       }
//     })
//     .catch(() => {
//       onBlockedPermission()
//     })
// }

// export const requestPhotoLibraryPermissions = (
//   onGranted: () => void,
//   onBlockedPermission: () => void,
// ) => {
//   checkAndRequestLibraryPermission()
//     .then(response => {
//       console.log('checkAndRequestLibraryPermission ', response)
//       switch (response) {
//         case 'granted':
//         case 'limited':
//           onGranted()
//           break
//         case 'blocked':
//           onBlockedPermission()
//           break
//         default:
//           break
//       }
//     })
//     .catch(() => {
//       onBlockedPermission()
//     })
// }

// export const requestStorgePermissions = (
//   onGranted: () => void,
//   onBlockedPermission: () => void,
// ) => {
//   checkAndRequestStorgePermission()
//     .then(response => {
//       console.log('checkAndRequestStorgePermission ', response)
//       switch (response) {
//         case 'granted':
//         case 'limited':
//           onGranted()
//           break
//         case 'blocked':
//           onBlockedPermission()
//           break
//         default:
//           break
//       }
//     })
//     .catch(() => {
//       onBlockedPermission()
//     })
// }

// export const permisstionSpeech_Recognition = Platform.select({
//   ios: PERMISSIONS.IOS.SPEECH_RECOGNITION,
//   android: PERMISSIONS.ANDROID.RECORD_AUDIO,
// }) as any

// export const checkAndRequestSpeechRecognitionPermission: (
//   rationale?: Rationale,
// ) => IReturnRequestPermission = async rationale => {
//   const result = await check(permisstionSpeech_Recognition)
//   switch (result) {
//     case RESULTS.DENIED: {
//       return requestPermission(permisstionSpeech_Recognition, rationale)
//     }
//     default:
//       return result
//   }
// }

// export const requestSpeechRecognitionPermissions = (
//   onGranted: () => void,
//   onBlockedPermission: () => void,
// ) => {
//   checkAndRequestSpeechRecognitionPermission()
//     .then(response => {
//       switch (response) {
//         case 'granted':
//         case 'limited':
//           onGranted()
//           break
//         case 'blocked':
//           onBlockedPermission()
//           break
//         default:
//           break
//       }
//     })
//     .catch(() => {
//       onBlockedPermission()
//     })
// }



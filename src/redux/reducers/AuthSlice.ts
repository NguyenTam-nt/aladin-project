import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '..';

export const initUserInfo: any = {
  name: '',
  phone: '',
  email: '',
  faceImageUrl: '',
  sub: -1,
};

const initialState: any = {
  skipIntroduction: false,
  isSuggest: false,
  language: '',
  isShowLanguage: false,
  credentials: '',
  refreshToken: undefined,
  haveSuggestAuth: false,
  isCredentialsPin: false,
  OTP: 'sms',
  userInfo: initUserInfo,
  isSplash: false,
  isNotification: true,
  userChannel: undefined,
  paddingVideo: -1,
  showBlurView: true,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
});

// export const {
//   setHaveSuggestAuth,
//   setCredentials,
//   setUserInfo,
//   setSplash,
//   setSettingNotification,
//   setUserChannel,
//   setPaddingVideo,
//   setRefreshToken,
//   showBlurView,
// } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authReducer;
export default authSlice.reducer;

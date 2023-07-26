import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '..';

export interface IAuthorize {
  name: string
}

export interface IUserInfo {
  id: string
  phone: string
  fullname: string
  imageUrl: string
  authorities: IAuthorize[]
}

export const initUserInfo: IUserInfo = {
  id: '',
  phone: '',
  fullname: '',
  imageUrl: '',
  authorities: [],
};

interface AppInfoType {
  token: string
  refreshToken: string
  userInfo: IUserInfo
}

const initialState: AppInfoType = {
  token: '',
  refreshToken: '',
  userInfo: initUserInfo,
};

export const appInfoSlice = createSlice({
  name: 'appInfoReducer',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string >) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string >) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {setToken, setUserInfo, setRefreshToken} = appInfoSlice.actions;

export const selectAppInfo = (state: RootState) => state.appInfoReducer;
export default appInfoSlice.reducer;

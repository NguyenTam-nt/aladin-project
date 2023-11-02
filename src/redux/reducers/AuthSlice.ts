import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '..';

export interface IAuthorize {
  name: string;
}

export interface IUserInfo {
  id: number;
  userId: string;
  login: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  role: string;
  email: string;
  createdAt: string;
  address: string;
}

export const initUserInfo: IUserInfo = {
  id: 0,
  userId: '',
  login: '',
  fullName: '',
  phoneNumber: '',
  password: '',
  role: '',
  email: '',
  createdAt: '',
  address: '',
};

interface AppInfoType {
  token: string;
  refreshToken: string;
  userInfo: IUserInfo;
  isGetTable: number | undefined;
}

const initialState: AppInfoType = {
  token: '',
  refreshToken: '',
  userInfo: initUserInfo,
  isGetTable: undefined,
};

export const appInfoSlice = createSlice({
  name: 'appInfoReducer',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setGetTable: (state, action: PayloadAction<number | undefined>) => {
      state.isGetTable = action.payload;
    },
  },
});

export const {setToken, setUserInfo, setRefreshToken, setGetTable} =
  appInfoSlice.actions;

export const selectAppInfo = (state: RootState) => state.appInfoReducer;
export default appInfoSlice.reducer;

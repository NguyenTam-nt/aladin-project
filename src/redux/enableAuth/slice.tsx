import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IEnavleAuthState {
  enableAuth: boolean;
}

const initialState: IEnavleAuthState = {
  enableAuth: false,
};

export const enableAuthSlice = createSlice({
  name: 'enableAuthSlice',
  initialState,
  reducers: {
    setEnableAuth: (state, action: PayloadAction<boolean>) => {
      state.enableAuth = action.payload;
    },
  },
});
export const {setEnableAuth} = enableAuthSlice.actions;
export default enableAuthSlice.reducer;

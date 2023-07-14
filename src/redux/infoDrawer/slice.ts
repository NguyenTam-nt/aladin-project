import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPopupState {
  showDrawerFloor: boolean
}

const initialState: IPopupState = {
  showDrawerFloor: false,
};

export const infoDrawerSlice = createSlice({
  name: 'infoDrawerSlice',
  initialState,
  reducers: {
    setShowDrawerFloor: (state, action: PayloadAction<boolean>) => {
        if (state.showDrawerFloor !== action.payload) {
      state.showDrawerFloor = action.payload;
        }
    },
  },
});
export const {setShowDrawerFloor} = infoDrawerSlice.actions;
export default infoDrawerSlice.reducer;

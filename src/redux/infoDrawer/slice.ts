import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPopupState {
  showDrawerFloor: boolean
  showAction : boolean
}

const initialState: IPopupState = {
  showDrawerFloor: false,
  showAction : false,
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
    setShowActionCart: (state, action: PayloadAction<boolean>) => {
      if (state.showAction !== action.payload) {
    state.showAction = action.payload;
      }
  },
  },
});
export const {setShowDrawerFloor ,setShowActionCart} = infoDrawerSlice.actions;
export default infoDrawerSlice.reducer;

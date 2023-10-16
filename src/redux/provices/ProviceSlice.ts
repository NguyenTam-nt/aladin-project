import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import PROVICE from '../../assets/provice/province_date.json';
export interface IProviceState {
  Id: string;
  Name: string;
}

const initialState: {provices: IProviceState} = {
  provices: {
    Id: PROVICE[0].Id,
    Name: PROVICE[0].Name,
  },
};

export const infoProvice = createSlice({
  name: 'infoProvice',
  initialState,
  reducers: {
    setInfoProvice: (state, action: PayloadAction<IProviceState>) => {
      state.provices = action.payload;
    },
  },
});

export const {setInfoProvice} = infoProvice.actions;
export default infoProvice.reducer;

// export const selectAppInfo = (state: RootState) => state.appInfoReducer;
